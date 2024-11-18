import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {
  LoginCredentialsModel,
  LoginDTOModel, UserSignupInfoDTOModel,
} from "../../../../models/authentication/interfaces/authentication.models";
import {AuthenticationMapper} from "../../../../mappers/authentication/authentication.mapper";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  http = inject(HttpClient)
  baseUrl = `${environment.backendUrl}`
  signupUrl = `${this.baseUrl}/user/signup`;
  loginUrl = `${this.baseUrl}/user/login`;
  refreshUrl = `${this.baseUrl}/refresh-tokens`;

  constructor() { }

  signup(userSignupInfo: UserSignupInfoDTOModel): Observable<any> {
    return this.http.post(this.signupUrl, userSignupInfo)
  }

  login(loginCredentials: LoginCredentialsModel): Observable<LoginDTOModel> {
    return this.http.post<LoginDTOModel>(this.loginUrl, loginCredentials)
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
