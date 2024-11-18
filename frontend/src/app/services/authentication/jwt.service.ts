import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import {AuthenticationMapper} from "../../mappers/authentication/authentication.mapper";
import {ParsedTokenDtoModel} from "../../models/authentication/interfaces/authentication.models";


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  decodedToken?: ParsedTokenDtoModel;

  setTokens(accessToken: string) {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
    }
  }

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  getAccessToken() {
    return localStorage.getItem('accessToken')
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken')

  }

  updateAccessToken(newToken: string) {
    localStorage.setItem('accessToken', newToken)
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

  getRefreshTokenRemainingTime() {
    return this.getRefreshToken() ? this.decodeToken(this.getRefreshToken()!)!?.exp * 1000 - Date.now() : 0;
  }

  getIsAuthenticated() {
    return this.getAccessToken() !== '' && this.getAccessToken() !== undefined;
  }

  getIsAccessTokenExpired() {
    return this.getAccessTokenRemainingTime() <= 0
  }

  getIsRefreshTokenExpired() {
    return this.getRefreshTokenRemainingTime() <= 0
  }

  isLoggedIn() {
    return this.getIsAuthenticated() && !(this.getIsAccessTokenExpired() && this.getIsRefreshTokenExpired())
  }

}
