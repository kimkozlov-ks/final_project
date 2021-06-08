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
    this.mapDispatcherService.$mapAction.next(i);

    if(this.mapDispatcherService.$mapAction.getValue() == MapAction.ADD_ROUTE_POINT &&
     this.menuItems[this.menuItems.length -1].name != "Save Route"){
      this.menuItems.push(new MenuItemComponent("Save Route"));
    }

    if( this.mapDispatcherService.$mapAction.getValue() == MapAction.SAVE_ROUTE) {
      this.mapApiService.saveRoute().pipe(tap(this.onSavingRouteComplete.bind(this))).subscribe();
    }
  }

  private onSavingRouteComplete() {
    this.menuItems.pop();
    this.mapDispatcherService.$mapAction.next(MapAction.ROUTE_SAVED);
  }
}
