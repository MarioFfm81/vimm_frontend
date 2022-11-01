import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VimmService {
  private experiments = new BehaviorSubject('');
  currentExperiments = this.experiments.asObservable();

  constructor(private http: HttpClient) { }

  uploadFile(formData: FormData) {
    let headers_object = new HttpHeaders();
    //headers_object = headers_object.append('Content-Type', 'multipart/form-data');
    headers_object = headers_object.append('Authorization', 'Bearer ' + localStorage.getItem('access-token'));

    const httpOptions = {
      headers: headers_object,
      reportProgress: true,
      observe: 'events' as 'body'
    };
    console.log(formData);
    return this.http.post(environment.apiUrl+'/experiment', formData, httpOptions);

  }

  updateExperiments(id:string) {
    this.experiments.next(id);
  }
}
