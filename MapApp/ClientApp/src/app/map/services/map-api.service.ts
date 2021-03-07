import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Route} from "../model/Route";
import {RouteService} from "./route.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapApiService {

  readonly apiUrl: string = "https://localhost:5005/api/route"

  constructor(private http: HttpClient,
              private route: RouteService) { }

  saveRoute() : Observable<{}> {
    const jsonBody = JSON.stringify(this.route.get());
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' });
    console.log('send route');
    return this.http.post(`${this.apiUrl}/add`, jsonBody, { headers, withCredentials: true });
  }
}
