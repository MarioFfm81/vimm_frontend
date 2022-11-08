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

  options = {
    fieldSeparator: ';',
    quoteStrings: '"',
    decimalseparator: ',',
    showLabels: false,
    headers: [],
    showTitle: true,
    title: 'Experiment-Daten',
    useBom: true,
    removeNewLines: true
  };
  data: Array<{}> = [];

  constructor(private authService: AuthService, private vimmService: VimmService, private router: Router) { }

  ngOnInit(): void {
    this.authService.test().subscribe();
    this.vimmService.currentExperiments.subscribe((expArray:Array<Experiment>) => {
      this.experiments = expArray;
      this.getComparison();
      this.update_data();
    })
    this.vimmService.loadNewData.subscribe(val => {
      this.showSpinner = val;
    });
    this.update_data();
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
      for (let key in exp.kpis) {
        if (this.comp[key]===undefined) this.comp[key]=exp.kpis[key];
        else this.comp[key]+=exp.kpis[key];
      }
    });
    let exp_count = this.experiments.length;
    for(let key in this.comp) {
      this.comp[key] /= (exp_count)
    }
  }

  update_data() {
    this.data = [];
    let counter = 1;
    let row = {};
    row[counter.toString()] = ' ';
    this.experiments.forEach(exp => {
      counter+=1;
      row[counter.toString()] = exp.name;
    })
    this.data.push(row);
    for (let key in this.comp) {
      let row = {};
      let counter = 1;
      row[counter.toString()] = this.vimmService.map_kpi_key(key);
      this.experiments.forEach(exp => {
        counter+=1;
        row[counter.toString()] = exp.kpis[key];
      })
      this.data.push(row);
    }
  }

}
