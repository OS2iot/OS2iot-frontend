import { DragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map;
  @Input() longitude: number;
  @Input() latitude: number;


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log('after view init');
    this.initMap();
    const marker = L.marker([this.latitude, this.longitude], {draggable: true});
    marker.addTo(this.map);
  }

  onClick(event: any) {
    console.log('clicked');
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.latitude, this.longitude ],
      zoom: 15
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }
}
