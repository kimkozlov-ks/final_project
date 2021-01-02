import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet'; import 'leaflet-routing-machine';
import { MarkerService } from '../../services/marker-service.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  private map;
  private waypoints = [];
  private route = null;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.route = L.Routing.control({
      waypoints: this.waypoints,
      show: true
    });
  }

  onMapClick(e) {
    this.waypoints.push(e.latlng);
    this.route.setWaypoints(this.waypoints);
    this.route.addTo(this.map);
    console.log(this.route);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [0, 0],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    this.map.on('click', this.onMapClick.bind(this));

    tiles.addTo(this.map);
  }
}
