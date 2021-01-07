import { Component, OnInit } from '@angular/core';
import {MenuItemComponent} from "./menu-item/menu-item.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItemComponent[] = [];

  constructor() {
    this.menuItems.push(new MenuItemComponent("Add New Route"));
    this.menuItems.push(new MenuItemComponent("List of Routes"));
  }

  ngOnInit() {
  }

}
