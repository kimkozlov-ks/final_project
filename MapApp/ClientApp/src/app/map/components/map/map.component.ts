import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet'; import 'leaflet-routing-machine';
import {MapDispatcherService} from "../../services/map-dispatcher.service";
import {MapAction} from "../../enums/MapAction";
import {RouteService} from "../../services/route.service";
import {tap} from "rxjs/operators";

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

  constructor(private mapDispatcherService: MapDispatcherService,
              private routeService: RouteService) {
    this.mapDispatcherService.$mapAction
      .pipe(tap(this.onActionChanged.bind(this)))
      .subscribe()
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  onMapClick(e) {
    switch (this.mapDispatcherService.$mapAction.getValue()){
      case MapAction.ADD_ROUTE_POINT:
        this.waypoints.push(e.latlng);
        this.route.setWaypoints(this.waypoints);

        if(this.waypoints.length > 1){
          this.routeService.updateRoute(this.route);
        }

        console.log(this.route);
        break;
      case MapAction.LIST_OF_ROUTES:
        break;
      case MapAction.NONE:
        break;

      default:
        break;

    }
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

  onActionChanged(){
    switch (this.mapDispatcherService.$mapAction.getValue()){
      case MapAction.ADD_ROUTE_POINT:
        this.waypoints = [];
        this.route = L.Routing.control({
          waypoints: this.waypoints,
          show: true
        });
        this.route.addTo(this.map);
        break;
      case MapAction.LIST_OF_ROUTES:
        break;
      case MapAction.SAVE_ROUTE:
        break;
      case MapAction.ROUTE_SAVED:
        this.routeService.saveRoute();
        break;
      case MapAction.NONE:
        break;
    }
  }
}
