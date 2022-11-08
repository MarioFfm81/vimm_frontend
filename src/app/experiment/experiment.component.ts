import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { VimmService } from '../vimm.service';
import { environment } from 'src/environments/environment';
import { Experiment } from '../experiment';

@Component({
  selector: 'app-experiment',
  templateUrl: 'experiment.component.html',
  styleUrls: ['experiment.component.css']
})
export class ExperimentComponent implements OnInit {
  @Input() experiment:Experiment;
  img_path: string;
  hist_path: string;
  history: any;
  @Input() comparison: any;
  @Input() small: boolean;

  constructor(private vimmService: VimmService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.img_path = environment.apiUrl+"/images/"+this.experiment.img_id
    this.hist_path = environment.apiUrl+"/images/"+this.experiment.hist_id
    console.log(this.comparison);
  }

  ngOnInit(): void {
    this.vimmService.kpi_hist.subscribe(hist => this.history = hist);
  }

  

  removeExp() {
    this.vimmService.removeExperiment(this.experiment);
  }

  map_kpi_key(key:string) {
    return this.vimmService.map_kpi_key(key);
  }

  check_deviation(key) {
    let limit=0.1
    if(key=="Average" || key=="Sum") limit=.05;
    if(key=="Max") limit=1;
    return Math.abs((this.experiment.kpis[key]/this.history[key])-1) > limit;
  }

  check_comp_deviation(key) {
    if(this.comparison===undefined || this.comparison[key]===undefined) return true;
    let limit=0.1
    if(key=="Average" || key=="Sum") limit=.05;
    if(key=="Max") limit=1;
    return Math.abs((this.experiment.kpis[key]/this.comparison[key])-1) > limit;
  }

}

