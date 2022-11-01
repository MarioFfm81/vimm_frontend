import { Component, OnInit } from '@angular/core';
import { VimmService } from '../vimm.service';

@Component({
  selector: 'app-experiment',
  templateUrl: 'experiment.component.html',
  styles: [
  ]
})
export class ExperimentComponent implements OnInit {
  experiment_id:string;
  id: Number;
  img_path: String;
  kpis: Object;

  constructor(private vimmService: VimmService) { }

  ngOnInit(): void {
    this.vimmService.currentExperiments.subscribe(img_path => {
      console.log("update img");
      if(img_path != '')
        this.img_path = "http://localhost:5000/images/"+img_path;
    });
    
      
      //console.log(this.experiment);

  }

}
