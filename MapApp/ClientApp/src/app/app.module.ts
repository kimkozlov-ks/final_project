import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/components/map/map.component';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MarkerService} from './map/services/marker-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './auth/components/login/login.component';
import {FormsModule} from "@angular/forms";
import {AuthTokenInterceptor} from "./auth/service/auth-interceptor.service";
import { ProfileComponent } from './components/profile/profile.component';
import {AccessGuard} from "./auth/access-guard.guard";
import {PermissionType} from "./auth/permissionType";
import { MenuComponent } from './map/components/menu/menu.component';
import { MenuItemComponent } from './map/components/menu-item/menu-item.component';

const appRoutes: Routes=[
  {path: '', component: LoginComponent},
  {
    path: 'map',
    component: MapComponent,
    canActivate:[AccessGuard],
    data: { requiredPermissions: [] }
  },
  {path: '**', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LoginComponent,
    ProfileComponent,
    MenuComponent,
    MenuItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [
    MarkerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
