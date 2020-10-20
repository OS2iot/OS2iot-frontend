import { DragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { MapCoordinates } from '../map-coordinates.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {

  private map;
  private marker;
  @Input() longitude?: number;
  @Input() latitude?: number;
  @Input() draggable?: true;
  @Input() coordinates?: [MapCoordinates];
  @Output() updateCoordinates = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.placeMarkers();
  }

  ngOnChanges() {
    this.updateMarker();
  }

  updateMarker() {
    this.marker?.setLatLng([this.latitude, this.longitude]);
    this.map?.setView(this.marker._latlng, 13);
  }

  private placeMarkers() {
    if (this.coordinates) {
      this.coordinates.forEach(coord => {
        this.addMarker(coord.latitude, coord.longitude, coord.draggable);
      });
    } else {
      this.addMarker(this.latitude, this.longitude, this.draggable);
    }
  }

  private addMarker(latitude: number, longitude: number, draggable = true) {
    this.marker = L.marker([latitude, longitude], {draggable});
    this.marker.on('dragend', event => this.dragend(event));
    this.marker.addTo(this.map);
  }

  private dragend(event: any) {
    this.latitude = event.target._latlng.lat;
    this.longitude = event.target._latlng.lng;
    this.updateCoordinates.emit({latitude: this.latitude, longitude: this.longitude});
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [
        this.coordinates ? this.coordinates[0].latitude : this.latitude,
        this.coordinates ? this.coordinates[0].longitude :  this.longitude
      ],
      zoom: 15
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }
}
