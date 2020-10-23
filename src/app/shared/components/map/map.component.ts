import { AfterViewInit, Component, Input, OnChanges, OnInit, Output, EventEmitter, SimpleChanges, AfterViewChecked } from '@angular/core';
import * as L from 'leaflet';
import { MapCoordinates, MarkerInfo } from './map-coordinates.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {

  private map;
  private marker;
  @Input() coordinates?: MapCoordinates;
  @Input() coordinateList?: [MapCoordinates];
  @Output() updateCoordinates = new EventEmitter();
  private zoomLevel = 15;
  private redMarker = '/assets/images/red-marker.png';
  private grenMarker = '/assets/images/green-marker.png';

  constructor() { }

  ngOnInit(): void {
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
      this.addMarker(this.coordinates.latitude, this.coordinates.longitude, this.coordinates.draggable);
    }
  }

  private addMarker(latitude: number, longitude: number, draggable = true, markerInfo: MarkerInfo = null) {
    const markerIcon = this.getMarkerIcon(markerInfo?.active);
    this.marker = L.marker([latitude, longitude], {draggable, icon: markerIcon});
    this.marker.on('dragend', event => this.dragend(event));
    if (markerInfo) {
      const aktiv = markerInfo.active ? 'Aktiv' : 'Inaktiv';
      this.marker.bindPopup(
        '<p class="row">' +
          markerInfo.name +
        '</p> ' +
        '<p>' +
          aktiv +
        '</p>');
    }
    this.marker.addTo(this.map);
  }

  private getMarkerIcon(active = true): any {
    return L.icon({
      iconUrl: active ? this.grenMarker : this.redMarker,
      iconSize:     [38, 38],
      iconAnchor:   [19, 38],
      popupAnchor:  [0, -38]
    })
    ;
  }

  private dragend(event: any) {
    this.coordinates.latitude = event.target._latlng.lat;
    this.coordinates.longitude = event.target._latlng.lng;
    this.setCoordinatesOutput();
  }

  setCoordinatesOutput() {
    this.updateCoordinates.emit({latitude: this.coordinates.latitude, longitude: this.coordinates.longitude});
  }

  private initMap(): void {
    const container = document.getElementById('map');
    if (container) {
      this.map = L.map('map', {
        center: [
          this.coordinateList ? this.coordinateList[0]?.latitude : this.coordinates?.latitude,
          this.coordinateList ? this.coordinateList[0]?.longitude :  this.coordinates?.longitude
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
