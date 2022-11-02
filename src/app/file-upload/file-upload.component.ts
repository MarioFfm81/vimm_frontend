import { HttpEventType } from '@angular/common/http';
import { LocalizedString } from '@angular/compiler';
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
          console.log(this.uploadProgress)
        }
        if(event.status==200) {
          //localStorage.setItem('1', event.body);
          console.log(event);
          if(!(event.body===undefined)) {
            let exp = new Experiment;
            exp.id = event.body.id;
            exp.name = event.body.name;
            exp.remark = event.body.remark;
            exp.img_id = event.body.img_id;
            exp.kpis = event.body.kpis;
            this.vimmService.updateExperiments(exp);
          }          
          this.fileVariable.nativeElement.value='';
          this.filename='';
        }
      });
      
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
