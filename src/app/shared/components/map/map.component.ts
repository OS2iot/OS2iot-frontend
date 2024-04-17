import {
    AfterViewInit,
    Component,
    Input,
    OnChanges,
    OnInit,
    Output,
    EventEmitter,
    SimpleChanges,
    OnDestroy,
} from "@angular/core";
import * as L from "leaflet";
import "leaflet.fullscreen";
import { Subscription } from "rxjs";
import { MapCoordinates, MarkerInfo } from "./map-coordinates.model";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import { TranslateService } from "@ngx-translate/core";
import moment from "moment";
import "leaflet.markercluster";
import "proj4leaflet";
import proj4 from "proj4";
import { environment } from "@environments/environment";

proj4.defs("EPSG:25832", "+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
proj4.defs(
    "EPSG:3857",
    "+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs"
);
@Component({
    selector: "app-map",
    templateUrl: "./map.component.html",
    styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    private map;
    public mapId;
    private marker;
    private markers: any;
    @Input() isFromApplication? = false;
    @Input() isFromCreation? = false;
    @Input() coordinates?: MapCoordinates;
    @Input() coordinateList: [MapCoordinates];
    @Output() updateCoordinates = new EventEmitter();
    private zoomLevel = 13;
    private redMarker = "/assets/images/red-marker.png";
    private greenMarker = "/assets/images/green-marker.png";
    private greyMarker = "/assets/images/grey-marker.png";
    private dafusername = environment.dafusername;
    private dafpw = environment.dafpassword;
    private clusterMaxRadius = 80;
    //Datafordeler uses 25832 format for coordinates.
    private crs = new L.Proj.CRS("EPSG:25832", "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs", {
        resolutions: [1638.4, 819.2, 409.6, 204.8, 102.4, 51.2, 25.6, 12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2],
        origin: [120000, 6500000],
    });
    private maxZoomToEnableLayerChange = 17;
    private previousCenter: L.LatLngExpression | null = null;
    private previousZoom: number | null = null;
    private provider: OpenStreetMapProvider;
    private searchControl: L.Control;
    constructor(private translate: TranslateService) {}

    ngOnInit(): void {
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

        this.changeLayerListener();

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

    private changeLayerListener() {
        this.map.on("baselayerchange", (e: L.LayersControlEvent) => {
            const layerName = e.name;

            // Save current center and zoom before changing the layer
            this.previousCenter = this.map.getCenter();
            this.previousZoom = this.map.getZoom();

            if (layerName === "Street view") {
                this.map.options.crs = L.CRS.EPSG3857; //Default CRS.
                this.map.options.maxZoom = 18;
            } else {
                this.map.options.crs = this.crs; // Set back to custom CRS if needed
                this.map.options.maxZoom = 15; // Max zoom for datafordeler map.
            }

            //Cluster groups has to be "updated" when change of layer.
            if (this.markers) {
                this.makeClusterGroup();
            }

            // Re-center the map to the previous center and adjust zoom level after changing the base layer
            if (this.previousCenter && this.previousZoom !== null) {
                let newZoom: number;

                //Zoom is different compared between leaflet and datafordeler map. Therefore, by testing, +-5 is close to the same.
                if (layerName === "Street view") {
                    newZoom = Math.min(this.previousZoom + 5, this.map.options.maxZoom);
                } else {
                    newZoom = Math.min(this.previousZoom - 5, this.map.options.maxZoom);
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
        this.placeMarkers();
    }

    private makeClusterGroup() {
        this.markers.clearLayers();
        const clusterGroup = L.markerClusterGroup({
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
        this.map?.setView(this.marker._latlng, this.zoomLevel);
    }

    private placeMarkers() {
        if (!this.map) {
            return;
        }
        if (this.coordinateList) {
            const clusterGroup = L.markerClusterGroup({
                maxClusterRadius: this.clusterMaxRadius,
            });

            this.coordinateList.forEach(coord => {
                clusterGroup.addLayer(
                    this.addMarker(coord.latitude, coord.longitude, coord.draggable, coord.markerInfo)
                );
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
            ? L.featureGroup(markers)
            : L.featureGroup(markers.filter(m => m.options.icon.options.iconUrl === this.greyMarker));

        this.map.fitBounds(group.getBounds(), { padding: [50, 50] });
    }

    private addMarker(latitude: number, longitude: number, draggable = true, markerInfo: MarkerInfo = null) {
        const markerIcon = this.getMarkerIcon(markerInfo?.active, markerInfo?.isDevice);
        const marker = L.marker([latitude, longitude], { draggable, icon: markerIcon });
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
                    'ng-reflect-router-link="gateway-detail,' +
                    markerInfo.id +
                    '" href="/applications/' +
                    markerInfo.internalOrganizationId +
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
    private getMarkerIcon(active = true, isDevice = false): any {
        return L.icon({
            iconUrl: isDevice ? this.greyMarker : active ? this.greenMarker : this.redMarker,
            iconSize: [30, 38],
            iconAnchor: [19, 38],
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
            this.map = L.map(this.mapId, {
                center: [
                    this.coordinateList ? this.coordinateList[0]?.latitude : this.coordinates?.latitude,
                    this.coordinateList ? this.coordinateList[0]?.longitude : this.coordinates?.longitude,
                ],
                zoom: this.zoomLevel,
                maxZoom: 18,
                doubleClickZoom: false,
                crs: L.CRS.EPSG3857,
                fullscreenControl: true,
                fullscreenControlOptions: {
                    position: "topleft",
                    content: '<div class="fas fa-expand"></div>',
                },
            });
            const streetTiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(this.map);

            const ortofotowmts = L.tileLayer(
                `https://services.datafordeler.dk/GeoDanmarkOrto/orto_foraar_wmts/1.0.0/WMTS?username=${this.dafusername}&password=${this.dafpw}!&request=GetTile&version=1.0.0&service=WMTS&Layer=orto_foraar_wmts&style=default&format=image/jpeg&TileMatrixSet=KortforsyningTilingDK&TileMatrix={z}&TileRow={y}&TileCol={x}`,
                {
                    attribution: '&copy; <a href="https://datafordeler.dk/vejledning/brugervilkaar/">Datafordeler</a>',
                    noWrap: true,
                }
            );

            // var hillshadeDAF = L.tileLayer(
            //     "https://services.datafordeler.dk/DHMhoejdekurver/DHMhoejdekurver_GML3/1.0.0/WFS?username=MSLFWDKAZS&password=Rosenkrantzgade1!&service=WFS&request=getfeature&typename=Formkurve0_5&Version=2.0.0"
            // )

            // Define layer groups for layer control
            var baseLayers = {
                "Street view": streetTiles,
                "Test - Datafordeleren": ortofotowmts,
            };

            var overlays = {
                // "Street view": hillshadeDAF,
            };

            const layerControl = L.control.layers(baseLayers, overlays).addTo(this.map);

            //If it's a map with more than 1 marker, then the map change from street view to satelite will fail if zoom is above 16 for some reason.. Therefore, remove the possibility for it to happen.
            this.map.on("zoomend", () => {
                if (this.coordinateList) {
                    const currentZoom = this.map.getZoom();

                    if (currentZoom >= this.maxZoomToEnableLayerChange) {
                        layerControl.remove();
                    } else {
                        if (!this.map.hasLayer(layerControl)) {
                            layerControl.addTo(this.map);
                        }
                    }
                }
            });
        }
    }
}
