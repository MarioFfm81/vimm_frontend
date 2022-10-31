import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AuthService } from '../auth.service';
import { LoginRequest } from '../LoginRequest';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(private authService: AuthService,  private router: Router) { }

  ngOnInit(): void {

  }


  login() {
    const loginRequest: LoginRequest = {
      email: this.email,
      password: this.password
    };
    console.log(loginRequest)

    this.authService.login(loginRequest)
      .subscribe((any) => this.router.navigate([this.authService.INITIAL_PATH]));
  }
  test() {
    this.authService.test().subscribe();
  }
}
