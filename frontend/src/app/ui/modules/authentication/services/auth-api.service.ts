import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {LoginCredentialsModel, LoginDTOModel} from "../../../../models/authentication/interfaces/authentication.models";
import {AuthenticationMapper} from "../../../../mappers/authentication/authentication.mapper";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  http = inject(HttpClient)
  baseUrl = `${environment.backendUrl}`
  signupUrl = `${this.baseUrl}/signup`;
  loginUrl = `${this.baseUrl}/login`;
  refreshUrl = `${this.baseUrl}/refresh-tokens`;

  constructor() { }

  signup(userInfo: any): Observable<any> {
    console.log(userInfo)
    return this.http.post(this.signupUrl, userInfo)
  }

  login(loginCredentials: LoginCredentialsModel): Observable<any> {
    console.log(loginCredentials)
    return this.http.post(this.loginUrl, loginCredentials)
  }

  refreshToken(refreshToken: string) {
    const headers = new HttpHeaders({
      'authorization': 'Bearer ' + refreshToken
    });
    return this.http.get<LoginDTOModel>(this.refreshUrl, {headers}).pipe(
      map((res: LoginDTOModel) => {
        return AuthenticationMapper.fromLoginDTOModelToViewModel(res)
      })
    );
  }
}
