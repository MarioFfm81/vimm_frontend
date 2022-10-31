import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly INITIAL_PATH='/main';

  constructor(private http: HttpClient) { }

  login(LoginRequest) {
    
    //return this.httpClient.post('https://vimm-backend.azurewebsites.net/login', LoginRequest, {withCredentials: true});
    console.log(environment.apiUrl);
    return this.http.post(environment.apiUrl+'/login', LoginRequest)
    .pipe(map(resData => {
      // return resData.targets.map(character => character.name);
      this.setSession(resData)
    }));

    
  }

  private setSession(authResult) {
    localStorage.setItem('access-token', authResult['access-token']);
    localStorage.setItem('is_logged_in', '1');
    console.log(localStorage.getItem('access-token'));
  }

  is_logged_in?() {
    if(localStorage.getItem('is_logged_in')==="1")
      return true;
    else
      return false;
  }

  logout() {
    localStorage.setItem('is_logged_in','0');
  }

  test() {
    let headers_object = new HttpHeaders();
    headers_object = headers_object.append('Content-Type', 'application/json');
    headers_object = headers_object.append('Authorization', 'Bearer ' + localStorage.getItem('access-token'));

    const httpOptions = {
      headers: headers_object
    };
    console.log(localStorage.getItem('access-token'));
    return this.http.get(environment.apiUrl+'/protected', httpOptions);
  }
}
