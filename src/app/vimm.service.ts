import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiment } from './experiment';

@Injectable({
  providedIn: 'root'
})
export class VimmService {
  private expArray: Array<Experiment> = [];
  private experiments = new BehaviorSubject(this.expArray);
  currentExperiments = this.experiments.asObservable();
  private gettingData = new BehaviorSubject(false);
  loadNewData = this.gettingData.asObservable();
  private kpi_history = new BehaviorSubject({});
  kpi_hist = this.kpi_history.asObservable();

  constructor(private http: HttpClient) {
    console.log(this,this.expArray);
   }

  uploadFile(formData: FormData) {
    this.gettingData.next(true);

    let headers_object = new HttpHeaders();
    //headers_object = headers_object.append('Content-Type', 'multipart/form-data');
    headers_object = headers_object.append('Authorization', 'Bearer ' + localStorage.getItem('access-token'));

    const httpOptions = {
      headers: headers_object,
      reportProgress: true,
      observe: 'events' as 'body'
    };
    return this.http.post(environment.apiUrl+'/experiment', formData, httpOptions);
    

  }

  updateExperiments(exp:Experiment, history:any) {
    this.expArray.push(exp);
    this.experiments.next(this.expArray);
    this.gettingData.next(false);
    this.kpi_history.next(history);
  }

  deactivateSpinner() {
    this.gettingData.next(false);
  }

  removeExperiment(exp:Experiment) {
    this.expArray.forEach((element, index) => {
      if(element==exp ) this.expArray.splice(index, 1);
    });
    this.experiments.next(this.expArray);
  }

  map_kpi_key(key:string) {
    if(key=="Affected10") return "Fläche (>10 Mpa) in %";
    if(key=="Affected40") return "Fläche (>40 Mpa) in %";
    if(key=="Sum") return "Gesamtdruck in Mpa";
    if(key=="Max") return "Maximaldruck in Mpa";
    if(key=="AverageNonZero") return "Durchschnittlicher Druck in Mpa (für Werte >0)";

    return key;
  }
}
