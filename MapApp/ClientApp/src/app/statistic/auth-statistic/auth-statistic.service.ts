import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthStatisticService {

  private url: string = 'http://localhost:6001/statistic/auth/registered'
  constructor(private http: HttpClient) { }

  get(queryParams: string, page: Number, size: Number) : Observable<any> {
    console.log('get stat');
    return this.http.get(this.url + '?' + queryParams + `page=${page}&size=${size}` , { withCredentials: true})
  }
}
