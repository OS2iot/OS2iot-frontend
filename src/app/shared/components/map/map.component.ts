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
    private zoomLevel = 15;
    private redMarker = "/assets/images/red-marker.png";
    private greenMarker = "/assets/images/green-marker.png";
    private greyMarker = "/assets/images/grey-marker.png";
    subscription: Subscription;
    provider: OpenStreetMapProvider;
    searchControl: L.Control;
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

    changeMarkers() {
        if (this.markers) {
            this.markers.clearLayers();
        }
        this.placeMarkers();
    }

    setGeolocation() {
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(res => {
                this.coordinates.longitude = res.coords.longitude;
                this.coordinates.latitude = res.coords.latitude;
                this.updateMarker();
                this.setCoordinatesOutput();
            });
        }
    }

    updateMarker() {
        this.marker?.setLatLng([this.coordinates.latitude, this.coordinates.longitude]);
        this.map?.setView(this.marker._latlng, this.zoomLevel);
    }

    private placeMarkers() {
        if (!this.map) {
            return;
        }
        if (this.coordinateList) {
            const clusterGroup = L.markerClusterGroup({
                maxClusterRadius: 80,
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

    setCoordinatesOutput() {
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
                maxZoom: 19,
                doubleClickZoom: false,
                fullscreenControl: true,
                fullscreenControlOptions: {
                    position: "topleft",
                    content: '<div class="fas fa-expand"></div>',
                },
            });
            const streetTiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(this.map);

            const ortofotowmts = L.tileLayer(
                "https://services.datafordeler.dk/GeoDanmarkOrto/orto_foraar_wmts/1.0.0/WMTS?username=MSLFWDKAZS&password=Rosenkrantzgade1!&request=GetTile&version=1.0.0&service=WMTS&Layer=orto_foraar_wmts&style=default&format=image/jpeg&TileMatrixSet=KortforsyningTilingDK&TileMatrix={z}&TileRow={y}&TileCol={x}",
                {
                    maxZoom: 19,
                    attribution: "test",
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

            // Add layer control to map
            L.control.layers(baseLayers, overlays).addTo(this.map);
        }
    }
}
