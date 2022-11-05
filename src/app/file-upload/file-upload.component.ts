import { HttpEventType } from '@angular/common/http';
import { AstMemoryEfficientTransformer, LocalizedString } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Experiment } from '../experiment';
import { VimmService } from '../vimm.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: 'file-upload.component.html',
  styles: [`
    .file-input {
      display: none;
    }
    .error {
      white-space: pre-wrap;
      color: white;
      background-color: red;
    }
  `
  ]
})
export class FileUploadComponent implements OnInit {

  filename = '';
  uploadProgress:number;
  uploadSub: Subscription;
  @ViewChild('fileUpload', {static: false})
  fileVariable: ElementRef;
  experiments = {};
  errorMsg='';

  constructor(private vimmService: VimmService) { }
  

  ngOnInit(): void {
    this.vimmService.currentExperiments.subscribe(exp => {
      this.experiments = exp;
    });
  }

  onFileSelected(event) {
    const file:File = event.target.files[0];
    
    if (file) {
      this.filename = file.name;
      const formData = new FormData();
      formData.append('experiment', file);
      this.uploadSub = this.vimmService.uploadFile(formData).subscribe((event:any) => {
        if(event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100* (event.loaded / event.total));
        }
        if(event.status==200) {
          //localStorage.setItem('1', event.body);
          if(!(event.body===undefined)) {
            let exp = new Experiment;
            exp.id = event.body.experiment.id;
            exp.name = event.body.experiment.name;
            exp.remark = event.body.experiment.remark;
            exp.img_id = event.body.experiment.img_id;
            exp.kpis = event.body.experiment.kpis;
            exp.hist_id = event.body.experiment.hist_id;
            let hist = event.body.history;
            this.vimmService.updateExperiments(exp, hist);
          }          
          this.fileVariable.nativeElement.value='';
          this.filename='';
        }
      },
      error => {
        console.log(error);
        if(error=='BAD REQUEST') {
          this.errorMsg = "Es können nur .txt Dateien ausgewählt werden.";
        }
        else
          this.errorMsg = "Die Datei konnte nicht verarbeitet werden.\nStellen Sie sicher, dass sie das richtige Format hat.";
        this.vimmService.deactivateSpinner();
      },);
      
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }


}
