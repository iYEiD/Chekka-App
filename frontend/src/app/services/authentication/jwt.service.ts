import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import {AuthenticationMapper} from "../../mappers/authentication/authentication.mapper";


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  setTokens(accessToken: string) {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
    }
  }

  clearTokens() {
    localStorage.removeItem('accessToken');
  }

  getAccessToken() {
    return localStorage.getItem('accessToken')
  }

  decodeToken(token: string) {
    if(token) {
      return AuthenticationMapper.fromTokenDTOModelToParsedToken(jwtDecode(token));
    }
    return null;
  }

  getAccessTokenRemainingTime() {
    return this.getAccessToken() ? this.decodeToken(this.getAccessToken()!)!?.exp * 1000 - Date.now() : 0;
  }

  getIsAuthenticated() {
    return this.getAccessToken() !== '' && this.getAccessToken() !== undefined;
  }

  getIsAccessTokenExpired() {
    return this.getAccessTokenRemainingTime() <= 0
  }

  isLoggedIn() {
    return this.getIsAuthenticated() && !this.getIsAccessTokenExpired()
  }

}
