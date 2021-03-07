import { Injectable } from '@angular/core';
import {Route} from "../model/Route";
import {RoutePoint} from "../model/RoutePoint";

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private _route: Route = null;
  private _routes: Route[] = [];

  constructor() { }

  updateRoute(route: any){
    this._route = new Route();

    this._route.name = "test " + Date.now();

    route.getWaypoints().forEach(w => {
      this._route.points.push(new RoutePoint(w.latLng.lat, w.latLng.lng));
    })
  }

  get(): Route {
    return this._route;
  }

  saveRoute(){
    this._routes.push(this._route);
  }
}
