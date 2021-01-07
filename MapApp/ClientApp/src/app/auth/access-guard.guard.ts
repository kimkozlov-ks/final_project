import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from './service/auth.service';
import {PermissionType} from './permissionType';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {

  constructor(private readonly authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const requiredPermissions: PermissionType[] = (route.data.requiredPermissions ? route.data.requiredPermissions : [])
      .map(rp => PermissionType[rp]);

    return this.authService.$userInfo.pipe(
      map(userInfo =>
        requiredPermissions.every(permission => userInfo.permissions.includes(permission)))
    );
  }
}
