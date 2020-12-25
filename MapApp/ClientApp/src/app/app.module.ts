import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MarkerService} from './services/marker-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule, Routes} from "@angular/router";
import {NavMenuComponent} from "./components/nav-menu/nav-menu.component";
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from "@angular/forms";

const appRoutes: Routes=[
  {path: '', component: LoginComponent},
  {path: 'map', component: MapComponent},
  {path: '**', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [
    MarkerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
