import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MenuItemComponent} from "./menu-item/menu-item.component";
import {MapDispatcherService} from "../../services/map-dispatcher.service";
import {MapAction} from "../../enums/MapAction";
import {MapApiService} from "../../services/map-api.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItemComponent[] = [];

  @ViewChildren('items') liItems: QueryList<ElementRef>

  constructor(private mapDispatcherService: MapDispatcherService,
              private mapApiService: MapApiService) {
    this.menuItems.push(new MenuItemComponent("Add New Route"));
    this.menuItems.push(new MenuItemComponent("List of Routes"));
  }

  ngOnInit() {
  }

  menuItemClicked(i: number) {

    if(this.mapDispatcherService.mapAction == MapAction.ADD_ROUTE_POINT &&
      this.menuItems.length - 1 != MapAction.SAVE_ROUTE){
      this.menuItems.push(new MenuItemComponent("Save Route"));
    }

    this.mapDispatcherService.mapAction = i;

    if( this.mapDispatcherService.mapAction == MapAction.SAVE_ROUTE) {
      this.mapApiService.saveRoute().pipe(tap(this.onSavingRouteComplete.bind(this))).subscribe();
    }
  }

  private onSavingRouteComplete() {
    this.menuItems.pop();
  }
}
