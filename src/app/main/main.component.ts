import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-main',
  templateUrl: `main.component.html`,
  styles: [
  ]
})
export class MainComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.test().subscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
