import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {switchMap, take} from "rxjs/operators";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  requestTimeoutMilliseconds = 30 * 1000;
  isRefreshInProgress = false;
  $refreshSubject = new Subject<boolean>();

  constructor(readonly authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes('/api/auth/') || !this.authService.isTokenExpired()) {
      return next.handle(this.injectAuthorizationHeader(req));
    }

    if (!this.isRefreshInProgress) {

      this.isRefreshInProgress = true;

      return this.authService.refresh()
        .pipe(switchMap(() => {

          this.$refreshSubject.next(true);
          this.isRefreshInProgress = false;
          return next.handle(this.injectAuthorizationHeader(req));
        }));
    }

    return this.$refreshSubject.pipe(
      take(1),
      switchMap(() => next.handle(this.injectAuthorizationHeader(req)))
    );
  }

  injectAuthorizationHeader(req: HttpRequest<any>): HttpRequest<any> {

    console.log(this.authService);

    return !this.authService.$accessToken.value
      ? req
      : req.clone({
        headers: req.headers.set(
          'authorization', `Bearer ${this.authService.$accessToken.value.split('\\"').join('')}`)
      });
  }
}
