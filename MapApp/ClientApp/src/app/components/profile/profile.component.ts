import { Component, OnInit } from '@angular/core';
import UserInfo from "../../auth/userInfo";
import {AuthService} from "../../auth/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserInfo = null;

  constructor(private authService: AuthService,
              private router: Router) {
    this.user = authService.getUser();
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
