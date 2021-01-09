import {Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import jwt_decode from "jwt-decode";
import UserInfo from "../userInfo";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:5001/api/auth';
  storageKey = 'userInfo';
  accessTokenStorageKey = 'accessTokenStorageKey';

  readonly $accessToken = new BehaviorSubject<string>(null);
  readonly $userInfo = new BehaviorSubject<UserInfo>(null);
  private requestTimeoutMilliseconds: number = 30;

  constructor(readonly http: HttpClient, private router: Router) {
    this.$userInfo
      .pipe(tap(userInfo => {
        if (userInfo) {
          localStorage[this.storageKey] = JSON.stringify(userInfo);
        }
      }))
      .subscribe();

    this.$accessToken
      .pipe(tap(accessToken => {
        if (accessToken) {
          localStorage[this.accessTokenStorageKey] = JSON.stringify(accessToken);
        }
      }))
      .subscribe();

    const userInfoFromStorage = localStorage.getItem(this.storageKey);

    if(userInfoFromStorage )
    {
      this.$userInfo.next(JSON.parse(userInfoFromStorage));
    }
    else {
      this.router.navigate(['/login']);
    }

    this.$accessToken.next(localStorage.getItem(this.accessTokenStorageKey).split('\"').join(''));
  }

  isLoggedIn(){
    return this.$userInfo.asObservable();
  }

  logout() {
    console.log("logout");
    const jsonBody = JSON.stringify({ username: this.$userInfo.value.username, password: "-" });
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' });
    this.http.post(`${this.apiUrl}/logout`, jsonBody, { headers, withCredentials: true }, )
      .pipe(tap(this.onLogoutSuccess.bind(this)))
      .subscribe();
  }

  login(username: string, password: string) {
    const jsonBody = JSON.stringify({ username, password });
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' });
    this.http.post(`${this.apiUrl}/login`, jsonBody, { headers, withCredentials: true })
      .pipe(tap(this.processToken.bind(this)))
      .subscribe();
  }

  getUser() : UserInfo{
    return this.$userInfo.getValue();
  }

  refresh() : Observable<any> {
    if (!localStorage[this.storageKey]) {
      return throwError('there is no refresh token, need to login');
    }

    return this.http.get(`${this.apiUrl}/refresh`, { withCredentials: true})
      .pipe(tap(this.processToken.bind(this)));
  }

  processToken(response: any) {
    const token = response.value;
    const userInfo = new UserInfo(jwt_decode(token));

    this.$userInfo.next( userInfo);
    this.$accessToken.next(token);

    if(!userInfo)
    {
      this.router.navigate(['/login']);
    }
  }

  onLogoutSuccess() {
    console.log("logout");
    this.router.navigate(['/login']);
     localStorage.removeItem(this.storageKey);
     this.$accessToken.next(null);
     this.$userInfo.next(null);
  }

  isTokenExpired() {
    return this.$userInfo.value &&
      this.$userInfo.value.expires &&
    this.$userInfo.value.expires < (Date.now() - this.requestTimeoutMilliseconds) / 1000;
  }

  register(username: string, password: string) : Observable<any>{
    const jsonBody = JSON.stringify({ username, password });
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' });
    return this.http.post(`${this.apiUrl}/register`, jsonBody, { headers, withCredentials: true })
      .pipe(tap(this.processToken.bind(this)))
  }
}
