import { Component, OnInit } from '@angular/core';
import UserInfo from "../../auth/userInfo";
import {AuthService} from "../../auth/service/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserInfo = null;

  constructor(private authService: AuthService) {
    this.user = authService.getUser();
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
