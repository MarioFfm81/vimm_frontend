import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginRequest } from './LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly INITIAL_PATH='';

  constructor(private httpClient: HttpClient) { }

  login(LoginRequest) {
    return this.httpClient.post('https://vimm-backend.azurewebsites.net/login', LoginRequest, {withCredentials: true});
  }

  test() {
    return this.httpClient.get('https://vimm-backend.azurewebsites.net/protected');
  }
}
