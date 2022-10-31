import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AuthService } from '../auth.service';
import { LoginRequest } from '../LoginRequest';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styles: [`
    .error {
      padding: 16px;
      width: 268px;
      color: white;
      background-color: red;
    }
    `]
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  public error = "";

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
    .subscribe(data => {
        this.router.navigate([this.authService.INITIAL_PATH]);
      },
      error => {
        this.error = "Email oder Passwort sind inkorrekt";
      }
      );
      
  }
  test() {
    this.authService.test().subscribe();
  }
}
