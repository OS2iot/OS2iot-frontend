import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { environment } from "@environments/environment";
import { TranslateService } from "@ngx-translate/core";
import { satelliteCenterLatitudeDenmark, satelliteCenterLongitudeDenmark } from "@shared/constants/map-constants";
import * as leaflet from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet.fullscreen";
import "leaflet.markercluster";
import moment from "moment";
import "proj4leaflet";
import { MapCoordinates, MarkerInfo } from "./map-coordinates.model";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  private streetViewName = "OpenStreetMap";
  private datafordelerName;
  private heightCurvesName;
  private ortofotowmts: leaflet.TileLayer;
  private streetMap: leaflet.TileLayer;
  private heightsMapWms: leaflet.TileLayer.WMS;
  private map: leaflet.Map;
  public mapId;
  private marker: leaflet.Marker;
  private markers: any;
  @Input() isFromApplication? = false;
  @Input() applicationId?: number;
  @Input() isFromCreation? = false;
  @Input() coordinates?: MapCoordinates;
  @Input() coordinateList: [MapCoordinates];
  @Output() updateCoordinates = new EventEmitter();
  private zoomLevel = 13;
  private redMarker = "/assets/images/red-marker.png";
  private greenMarker = "/assets/images/green-marker.png";
  private greyMarker = "/assets/images/grey-marker.png";
  private stableDevice = "/assets/images/stable-device-pin-r.png";
  private alertDevice = "/assets/images/alert-device-pin.svg";
  private stableGateway = "/assets/images/stable-gateway-pin.svg";
  private alertGateway = "/assets/images/alert-gateway-pin.svg";

  private dafusername = environment.dafusername;
  private dafpw = environment.dafpassword;
  private clusterMaxRadius = 80;
  //Datafordeler uses 25832 format for coordinates.
  private datafordelerCrs = new leaflet.Proj.CRS("EPSG:25832", "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs", {
    resolutions: [1638.4, 819.2, 409.6, 204.8, 102.4, 51.2, 25.6, 12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2],
    origin: [120000, 6500000],
  });
  private maxZoomToEnableLayerChange = 17;
  private previousCenter: leaflet.LatLngExpression | null = null;
  private previousZoom: number | null = null;
  private provider: OpenStreetMapProvider;
  private searchControl: leaflet.Control;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.get(["HEIGHTCURVES", "SATELLITEDENMARK"]).subscribe(translations => {
      this.datafordelerName = translations["SATELLITEDENMARK"];
      this.heightCurvesName = translations["HEIGHTCURVES"];
    });
    this.mapId = Math.random().toString();
    if (this.coordinates?.useGeolocation) {
      this.setGeolocation();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes?.coordinates?.currentValue?.latitude !== changes?.coordinates?.previousValue?.latitude ||
      changes?.coordinates?.currentValue?.longitude !== changes?.coordinates?.previousValue?.longitude
    ) {
      this.updateMarker();
    }
    if (changes?.coordinateList?.currentValue !== changes?.coordinateList?.previousValue) {
      this.changeMarkers();
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.placeMarkers();

    this.setupChangeLayerListener();

    if (!this.isFromCreation) {
      return;
    }

    this.provider = new OpenStreetMapProvider();

    this.searchControl = GeoSearchControl({
      provider: this.provider,
      showMarker: false,
    });
    this.map.addControl(this.searchControl);

    this.map.on("dblclick", event => this.dblclick(event));
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.off();
      this.map.remove();
    }
  }

  private setupChangeLayerListener() {
    this.map.on("baselayerchange", (e: leaflet.LayersControlEvent) => {
      const layerName = e.name;

      // Save current center and zoom before changing the layer
      this.previousCenter = this.map.getCenter();
      this.previousZoom = this.map.getZoom();

      if (layerName === this.streetViewName) {
        this.map.options.crs = leaflet.CRS.EPSG3857; //Default CRS.
        this.map.options.maxZoom = 18; // Max zoom for leaflet map.
      } else {
        this.map.options.crs = this.datafordelerCrs; // Set back to custom CRS if needed
        this.map.options.maxZoom = 13; // Max zoom for datafordeler map.
      }

      //Cluster groups has to be "updated" when change of layer.
      if (this.markers) {
        this.makeClusterGroup();
      }

      // Re-center the map to the previous center and adjust zoom level after changing the base layer
      if (this.previousCenter && this.previousZoom) {
        let newZoom: number;

        //Zoom is different compared between leaflet and datafordeler map. Therefore, by testing, +-5 is close to the same.
        if (layerName === this.streetViewName) {
          newZoom = Math.min(this.previousZoom + 5, this.map.options.maxZoom);
        } else {
          newZoom = Math.min(this.previousZoom - 5, this.map.options.maxZoom);
          //If zoom is below 7, then center the map to denmark in satellite.
          if (this.previousZoom < 7) {
            const latlng: leaflet.LatLng = new leaflet.LatLng(
              satelliteCenterLatitudeDenmark,
              satelliteCenterLongitudeDenmark
            );
            this.map.setView(latlng, 2);
            return;
          }
        }

        // Set the map's view to the previous center and adjusted zoom level.
        this.map.setView(this.previousCenter, newZoom);
      }
    });
  }

  private changeMarkers() {
    if (this.markers) {
      this.markers.clearLayers();
    }
    if (this.coordinateList) this.placeMarkers();
  }

  private makeClusterGroup() {
    this.markers.clearLayers();
    const clusterGroup = leaflet.markerClusterGroup({
      maxClusterRadius: this.clusterMaxRadius,
    });

    this.coordinateList.forEach(coord => {
      clusterGroup.addLayer(this.addMarker(coord.latitude, coord.longitude, coord.draggable, coord.markerInfo));
    });

    this.markers = clusterGroup.addTo(this.map);
    this.fitToBounds(clusterGroup.getLayers());
  }

  private setGeolocation() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(res => {
        this.coordinates.longitude = res.coords.longitude;
        this.coordinates.latitude = res.coords.latitude;
        this.updateMarker();
        this.setCoordinatesOutput();
      });
    }
  }

  private updateMarker() {
    this.marker?.setLatLng([this.coordinates.latitude, this.coordinates.longitude]);
    this.map?.setView(this.marker.getLatLng(), this.zoomLevel);
  }

  private placeMarkers() {
    if (!this.map) {
      return;
    }
    if (this.coordinateList) {
      const clusterGroup = leaflet.markerClusterGroup({
        maxClusterRadius: this.clusterMaxRadius,
      });
      const gatewayLayerGroup = [];

      this.coordinateList.forEach(coord => {
        if (this.isFromApplication) {
          if (!coord.markerInfo.isDevice) {
            gatewayLayerGroup.push(this.addMarker(coord.latitude, coord.longitude, coord.draggable, coord.markerInfo));
            this.markers = leaflet.layerGroup(gatewayLayerGroup).addTo(this.map);
          } else {
            clusterGroup.addLayer(this.addMarker(coord.latitude, coord.longitude, coord.draggable, coord.markerInfo));
          }
        } else {
          clusterGroup.addLayer(this.addMarker(coord.latitude, coord.longitude, coord.draggable, coord.markerInfo));
        }
      });

      this.markers = clusterGroup.addTo(this.map);
      this.fitToBounds(clusterGroup.getLayers());
    } else {
      this.marker = this.addMarker(
        this.coordinates.latitude,
        this.coordinates.longitude,
        this.coordinates.draggable,
        this.coordinates.markerInfo
      );
      this.map.addLayer(this.marker);
    }
  }

  private fitToBounds(markers: any[]) {
    //If it's the map from application details, then the gateways should not be included in the fit.
    //Only way to know if it's NOT a gateway, is if the marker is the grey marker.
    const group = !this.isFromApplication
      ? leaflet.featureGroup(markers)
      : leaflet.featureGroup(markers.filter(m => m.options.icon.options.iconUrl === this.greyMarker));

    this.map.fitBounds(group.getBounds(), { padding: [30, 30] });
  }

  private addMarker(latitude: number, longitude: number, draggable = true, markerInfo: MarkerInfo = null) {
    const markerIcon = this.getMarkerIcon(markerInfo?.active, markerInfo?.isDevice);
    const marker = leaflet.marker([latitude, longitude], { draggable, icon: markerIcon });
    marker.on("dragend", event => this.dragend(event));
    if (markerInfo && !markerInfo.isDevice) {
      const isActive = markerInfo.active ? "Aktiv" : "Inaktiv";
      marker.bindPopup(
        // TODO: should be standardised when more components use this feature.
        '<a _ngcontent-gij-c367=""' +
          'routerlinkactive="active" class="application-link"' +
          'ng-reflect-router-link-active="active"' +
          'ng-reflect-router-link="gateway-detail,' +
          markerInfo.id +
          '" href="/gateways/gateway-detail/' +
          markerInfo.id +
          '">' +
          markerInfo.name +
          "</a>" +
          "<p>" +
          isActive +
          "</p>" +
          "<p>" +
          "Organisation: " +
          markerInfo.internalOrganizationName +
          "</p>"
      );
    } else if (markerInfo) {
      const lastActiveString = markerInfo.lastActive
        ? moment(markerInfo.lastActive).fromNow()
        : this.translate.instant("ACTIVITY.NEVER");
      marker.bindPopup(
        // TODO: should be standardised when more components use this feature.
        '<a _ngcontent-gij-c367=""' +
          'routerlinkactive="active" class="application-link"' +
          'ng-reflect-router-link-active="active"' +
          'ng-reflect-router-link="details,' +
          markerInfo.id +
          '" href="/applications/' +
          this.applicationId +
          "/iot-device/" +
          markerInfo.id +
          "/details" +
          '">' +
          markerInfo.name +
          "</a>" +
          "<p>" +
          "Netværksteknologi: " +
          this.translate.instant(markerInfo.networkTechnology) +
          "</p>" +
          "<p>" +
          "Sidst aktiv: " +
          lastActiveString +
          "</p>"
      );
    }
    return marker;
  }
  private getMarkerIcon(active = true, isDevice = false, isGateway = false): any {
    let uri;
    switch (true) {
      case isDevice && active:
        uri = this.stableDevice;
        break;
      case isDevice && !active:
        uri = this.alertDevice;
        break;
      case isGateway && active:
        uri = this.stableGateway;
        break;
      case isGateway && !active:
        uri = this.alertGateway;
        break;
      default:
        uri = active ? this.greenMarker : this.redMarker;
        break;
    }

    return leaflet.icon({
      iconUrl: uri,
      iconSize: [34, 50],
      iconAnchor: [19, 50],
      popupAnchor: [0, -35],
    });
  }

  private dragend(event: any) {
    this.coordinates.latitude = Number(event.target._latlng.lat.toFixed(9));
    this.coordinates.longitude = Number(event.target._latlng.lng.toFixed(9));
    this.setCoordinatesOutput();
  }

  private dblclick(event: any) {
    this.coordinates.latitude = Number(event.latlng.lat.toFixed(9));
    this.coordinates.longitude = Number(event.latlng.lng.toFixed(9));
    this.setCoordinatesOutput();
    this.marker?.setLatLng([this.coordinates.latitude, this.coordinates.longitude]);
  }

  private setCoordinatesOutput() {
    this.updateCoordinates.emit({ latitude: this.coordinates.latitude, longitude: this.coordinates.longitude });
  }

  private initMap(): void {
    const container = document.getElementById(this.mapId);
    if (container) {
      this.map = leaflet.map(this.mapId, {
        center: [
          this.coordinateList ? this.coordinateList[0]?.latitude : this.coordinates?.latitude,
          this.coordinateList ? this.coordinateList[0]?.longitude : this.coordinates?.longitude,
        ],
        zoom: this.zoomLevel,
        maxZoom: 18,
        doubleClickZoom: false,
        crs: leaflet.CRS.EPSG3857,
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: "topleft",
          content: '<div class="fas fa-expand"></div>',
        },
      });

      this.streetMap = leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(this.map);

      this.ortofotowmts = leaflet.tileLayer(
        `https://services.datafordeler.dk/GeoDanmarkOrto/orto_foraar_wmts/1.0.0/WMTS?username=${this.dafusername}&password=${this.dafpw}&request=GetTile&version=1.0.0&service=WMTS&Layer=orto_foraar_wmts&style=default&format=image/jpeg&TileMatrixSet=KortforsyningTilingDK&TileMatrix={z}&TileRow={y}&TileCol={x}`,
        {
          attribution: '&copy; <a href="https://datafordeler.dk/vejledning/brugervilkaar/">Datafordeler</a>',
          noWrap: true,
        }
      );

      this.heightsMapWms = leaflet.tileLayer.wms(
        `https://services.datafordeler.dk/DHMNedboer/dhm/1.0.0/WMS?username=${this.dafusername}&password=${this.dafpw}`,
        {
          transparent: "TRUE",
          styles: "gul",
          format: "image/png",
          layers: "dhm_kurve_0_5_m",
          version: "1.3.0",
          attribution: '&copy; <a href="https://datafordeler.dk/vejledning/brugervilkaar/">Datafordeler</a>',
          noWrap: true,
          crs: this.datafordelerCrs,
        } as any //has to be any since transparent has to be "TRUE" but the type expects a boolean
      );

      // Define layer groups for layer control
      const baseLayers: leaflet.Control.LayersObject = {
        [this.streetViewName]: this.streetMap,
        [this.datafordelerName ?? "Satellit Danmark"]: this.ortofotowmts,
      };

      const overlays: leaflet.Control.LayersObject = {
        [this.heightCurvesName ?? "Højdekurver (0,5 m)"]: this.heightsMapWms,
      };

      const layerControl = leaflet.control.layers(baseLayers, overlays).addTo(this.map);

      //If it's a map with more than 1 marker, then the map change from street view to satelite will fail if zoom is above 16 for some reason.. Therefore, remove the possibility for it to happen.
      this.map.on("zoomend", () => {
        if (this.coordinateList) {
          const currentZoom = this.map.getZoom();

          //The layerControl type doesnt have any way to check if map is set. Therefore we have to make it "any".
          //If layerControl._map is NOT set, then the picker on the map is not shown.
          const tempControl = layerControl as any;

          if (currentZoom >= this.maxZoomToEnableLayerChange) {
            layerControl.remove();
          } else if (!tempControl._map) {
            //This seems to be the best way to remove and add the layer control, with fewest adds to layers.
            layerControl.addTo(this.map);
          }
        }
      });
    }
  }
}
