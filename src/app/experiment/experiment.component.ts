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

  constructor(private vimmService: VimmService) { }

  ngOnInit(): void {
    this.img_path = environment.apiUrl+"/images/"+this.experiment.img_id
  }

}
