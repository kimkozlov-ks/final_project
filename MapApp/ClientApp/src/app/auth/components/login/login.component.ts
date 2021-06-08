import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  isFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn().subscribe(status => {
      if(status){
        router.navigate(['/map']);
      }
      else {
      }
    });
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.username, this.password);
  }

  toRegister() {
    this.router.navigate(['/register']);
  }
}
