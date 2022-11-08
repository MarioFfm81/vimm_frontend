import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Experiment } from '../experiment';
import { VimmService } from '../vimm.service';
import * as FileSaver from 'file-saver';

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
  data_str: string = '';

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
    this.data_str='';
    this.experiments.forEach(exp => {
      this.data_str += ';'+exp.name;
    })
    for (let key in this.comp) {
      this.data_str += '\n';
      let row = {};
      let counter = 1;
      row[counter.toString()] = this.vimmService.map_kpi_key(key);
      this.data_str += this.vimmService.map_kpi_key(key);
      this.experiments.forEach(exp => {
        counter+=1;
        row[counter.toString()] = exp.kpis[key];
        this.data_str += ';'+exp.kpis[key].toString().replace(".",',');
      })
      
      this.data.push(row);
    }
  }

  csvDownload() {
    this.exportFile(this.data_str, 'text/csv;charset=utf-8');
  }

  exportFile(data: any, fileType: string) {
    data = "\uFEFF" + data;
    const blob = new Blob([data], {type: fileType});
    FileSaver.saveAs(blob, 'Experimentdaten');
  }

}
