import { Injectable, inject } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  http = inject(HttpClient)
  baseUrl = `${environment.backendUrl}`
  signupUrl = `${this.baseUrl}/signup`;
  loginUrl = `${this.baseUrl}/login`;

  constructor() { }

  signup(userInfo: any): Observable<any> {
    console.log(userInfo)
    return this.http.post(this.signupUrl, userInfo)
  }

  login(loginCredentials: any): Observable<any> {
    console.log(loginCredentials)
    return this.http.post(this.loginUrl, loginCredentials)
  }
}
