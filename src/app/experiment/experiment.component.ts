import { Component, Input, OnInit } from '@angular/core';
import { VimmService } from '../vimm.service';
import { environment } from 'src/environments/environment';
import { Experiment } from '../experiment';

@Component({
  selector: 'app-experiment',
  templateUrl: 'experiment.component.html',
  styles: [
  ]
})
export class ExperimentComponent implements OnInit {
  @Input() experiment:Experiment;
  img_path: string;
  hist_path: string;

  constructor(private vimmService: VimmService) { }

  ngOnInit(): void {
    this.img_path = environment.apiUrl+"/images/"+this.experiment.img_id
    this.hist_path = environment.apiUrl+"/images/"+this.experiment.hist_id
  }

  removeExp() {
    this.vimmService.removeExperiment(this.experiment);
  }

  map_kpi_key(key:string) {
    if(key=="Affected10") return "Fläche (>10 Mpa) in %";
    if(key=="Affected40") return "Fläche (>40 Mpa) in %";
    if(key=="Sum") return "Gesamtdruck in Mpa";
    if(key=="Max") return "Maximaldruck in Mpa";
    if(key=="Average") return "Durchschnittlicher Druck in Mpa (für Werte >0)";

    return key;
  }

}
