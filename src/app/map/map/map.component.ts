import { DragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { MapCoordinates } from '../map-coordinates.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map;
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

  private placeMarkers() {
    if (this.coordinates) {
      this.coordinates.forEach(coord => {
        this.addMarker(coord.latitude, coord.longitude, coord.draggable);
      });
    } else {
      this.addMarker(this.longitude, this.latitude, this.draggable);
    }
  }

  private addMarker(longitude: number, latitude: number, draggable = true) {
    const marker = L.marker([longitude, latitude], {draggable});
    marker.on('dragend', event => this.dragend(event));
    marker.addTo(this.map);
  }

  private dragend(event: any) {
    this.longitude = event.target._latlng.lng;
    this.latitude = event.target._latlng.lat;
    this.updateCoordinates.emit({longitude: this.longitude, latitude: this.latitude});
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
