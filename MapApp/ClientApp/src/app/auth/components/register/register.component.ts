import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {STATUS_CODES} from "http";
import {HttpResponseBase} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  password: string = '';
  repeatedPassword: string = '';
  isFailed: boolean = false;
  errorMsg: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn().subscribe(status => {
      if(status){
        router.navigate(['/map']);
      }
      else {
      }
    });
  }

  ngOnInit(): void {
  }

  register() {
    this.isFailed = false;
    if(this.password !==  this.repeatedPassword){
      this.isFailed = true;
      return;
    }

    this.authService.register(this.username, this.password).pipe(
      catchError(error => {

        this.isFailed = true;
        switch(error.status){
          case 401:
            this.errorMsg = "User with the same username is already existed!";
            break;
        }
        return of();
      }
    )).subscribe();
  }

  toLogin() {
    this.router.navigate(['/login']);
  }
}
