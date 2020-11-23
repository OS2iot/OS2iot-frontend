import { AfterViewInit, Component, Input, OnChanges, OnInit, Output, EventEmitter, SimpleChanges, OnDestroy, AfterViewChecked, DoCheck } from '@angular/core';

import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { MapCoordinates, MarkerInfo } from './map-coordinates.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  private map;
  public mapId;
  private marker;
  private markers: any;
  @Input() coordinates?: MapCoordinates;
  @Input() coordinateList: [MapCoordinates];
  @Output() updateCoordinates = new EventEmitter();
  private zoomLevel = 15;
  private redMarker = '/assets/images/red-marker.png';
  private grenMarker = '/assets/images/green-marker.png';
  subscription: Subscription;

  constructor() {
  }

  ngOnInit(): void {
    this.mapId = Math.random().toString();
    if (this.coordinates?.useGeolocation) {
      this.setGeolocation();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.coordinates?.currentValue?.latitude !== changes?.coordinates?.previousValue?.latitude ||
      changes?.coordinates?.currentValue?.longitude !== changes?.coordinates?.previousValue?.longitude) {
      this.updateMarker();
    }
    if (changes?.coordinateList?.currentValue !== changes?.coordinateList?.previousValue) {
      this.changeMarkers();
    }
  }

  changeMarkers() {
    if (this.markers) {
      this.markers.clearLayers();
    }
    if (this.coordinateList) {
      this.placeMarkers();
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.placeMarkers();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.off();
      this.map.remove();
    }
  }

  setGeolocation() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (res) => {
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
    if (this.coordinateList) {
      const markerLayerGroup = [];
      this.coordinateList.forEach(coord => {
        markerLayerGroup.push(this.addMarker(coord.latitude, coord.longitude, coord.draggable, coord.markerInfo));
        this.markers = L.layerGroup(markerLayerGroup).addTo(this.map);
      });
    } else {
      const marker = this.addMarker(this.coordinates.latitude, this.coordinates.longitude, this.coordinates.draggable, this.coordinates.markerInfo);
      this.map.addLayer(marker);
    }
  }

  private addMarker(latitude: number, longitude: number, draggable = true, markerInfo: MarkerInfo = null) {
    const markerIcon = this.getMarkerIcon(markerInfo?.active);
    const marker = L.marker([latitude, longitude], { draggable, icon: markerIcon });
    marker.on('dragend', event => this.dragend(event));
    if (markerInfo) {
      const isActive = markerInfo.active ? 'Aktiv' : 'Inaktiv';
      marker.bindPopup(
        // TODO: should be standardised when more components use this feature.
        '<a _ngcontent-gij-c367=""' +
        'routerlinkactive="active" class="application-link"' +
        'ng-reflect-router-link-active="active"' +
        'ng-reflect-router-link="gateway-detail,' + markerInfo.id +
        '" href="/gateways/gateway-detail/' + markerInfo.id + '">' + markerInfo.name + '</a>'
        +
        '<p>' +
        isActive +
        '</p>'
        +
        '<p>' +
        'Organisation: ' + markerInfo.internalOrganizationName +
        '</p>'
      );
    }
    return marker;
  }

  private getMarkerIcon(active = true): any {
    return L.icon({
      iconUrl: active ? this.grenMarker : this.redMarker,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    })
      ;
  }

  private dragend(event: any) {
    this.coordinates.latitude = event.target._latlng.lat;
    this.coordinates.longitude = event.target._latlng.lng;
    this.setCoordinatesOutput();
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
          this.coordinateList ? this.coordinateList[0]?.longitude : this.coordinates?.longitude
        ],
        zoom: this.zoomLevel
      });
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      tiles.addTo(this.map);
    }
  }
}
