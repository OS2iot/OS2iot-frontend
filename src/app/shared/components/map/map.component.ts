import { AfterViewInit, Component, Input, OnChanges, OnInit, Output, EventEmitter, SimpleChanges, OnDestroy } from '@angular/core';
import { Organisation } from '@app/admin/organisation/organisation.model';
import { OrganisationService } from '@app/admin/organisation/organisation.service';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
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
  @Input() coordinates?: MapCoordinates;
  @Input() coordinateList?: [MapCoordinates];
  @Output() updateCoordinates = new EventEmitter();
  private zoomLevel = 15;
  private redMarker = '/assets/images/red-marker.png';
  private grenMarker = '/assets/images/green-marker.png';


  constructor() { }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.off();
      this.map.remove();
    }
  }

  ngOnInit(): void {
    this.mapId = Math.random().toString();
    if (this.coordinates?.useGeolocation) {
      this.setGeolocation();
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

  ngAfterViewInit(): void {
    this.initMap();
    this.placeMarkers();
  }

  loadMap() {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.coordinates?.currentValue?.latitude !== changes?.coordinates?.previousValue?.latitude ||
      changes?.coordinates?.currentValue?.longitude !== changes?.coordinates?.previousValue?.longitude) {
      this.updateMarker();
    }
  }

  updateMarker() {
    this.marker?.setLatLng([this.coordinates.latitude, this.coordinates.longitude]);
    this.map?.setView(this.marker._latlng, this.zoomLevel);
  }

  private placeMarkers() {
    if (this.coordinateList) {
      this.coordinateList.forEach(coord => {
        this.addMarker(coord.latitude, coord.longitude, coord.draggable, coord.markerInfo);
      });
    } else {
      this.addMarker(this.coordinates.latitude, this.coordinates.longitude, this.coordinates.draggable, this.coordinates.markerInfo);
    }
  }

  private addMarker(latitude: number, longitude: number, draggable = true, markerInfo: MarkerInfo = null) {
    const markerIcon = this.getMarkerIcon(markerInfo?.active);
    this.marker = L.marker([latitude, longitude], { draggable, icon: markerIcon });
    this.marker.on('dragend', event => this.dragend(event));
    if (markerInfo) {
      const isActive = markerInfo.active ? 'Aktiv' : 'Inaktiv';
      this.marker.bindPopup(
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
        +
        '<p>' +
        'ID: ' + markerInfo.internalOrganizationId +
        '</p>'
      );
    }
    this.marker.addTo(this.map);
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
