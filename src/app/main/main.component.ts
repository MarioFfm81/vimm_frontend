import { Component, OnInit, SimpleChanges } from '@angular/core';
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
  showSpinner = true;
  active_index = 0;
  comp = {};

  constructor(private authService: AuthService, private vimmService: VimmService, private router: Router) { }

  ngOnInit(): void {
    this.authService.test().subscribe();
    this.vimmService.currentExperiments.subscribe((expArray:Array<Experiment>) => {
      this.experiments = expArray;
      this.getComparison();
    })
    this.vimmService.loadNewData.subscribe(val => {
      this.showSpinner = val;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  getComparison() {
    console.log("compare");
    this.comp = {};
    let index_counter = 0;
    this.experiments.forEach(exp => {
      if(index_counter != this.active_index) {
        for (let key in exp.kpis) {
          if (this.comp[key]===undefined) this.comp[key]=exp.kpis[key];
          else this.comp[key]+=exp.kpis[key];
        }
      }
      index_counter += 1;
    });
    let exp_count = this.experiments.length;
    for(let key in this.comp) {
      this.comp[key] /= (exp_count-1)
    }
  }

}
