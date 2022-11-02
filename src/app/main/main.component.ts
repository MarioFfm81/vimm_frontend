import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Experiment } from '../experiment';
import { VimmService } from '../vimm.service';

@Component({
  selector: 'app-main',
  templateUrl: `main.component.html`,
  styleUrls: ['main.component.css']
})
export class MainComponent implements OnInit {

  experiments: Array<Experiment>;

  constructor(private authService: AuthService, private vimmService: VimmService, private router: Router) { }

  ngOnInit(): void {
    this.authService.test().subscribe();
    this.vimmService.currentExperiments.subscribe((expArray:Array<Experiment>) => {
      console.log("main");
      console.log(expArray);
      this.experiments = expArray;
      console.log(this.experiments);
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
