import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { StorageService } from './storage.service';
import { AuthenticationMapper } from 'src/app/entities/authentication/mapper/authentication.mapper';
import { ParsedTokenDtoModel } from '../../models/interfaces/parsed-token.models';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private storageService: StorageService) { }

  decodedToken?: ParsedTokenDtoModel;

  setTokens(accessToken: string, refreshToken: string) {
    if (accessToken && refreshToken) {
      this.storageService.setLocalStorage('accessToken', accessToken);
      this.storageService.setLocalStorage('refreshToken', refreshToken);
    }
  }

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  getAccessToken() {
    return this.storageService.getLocalStorage('accessToken');
  }

  getRefreshToken() {
    return this.storageService.getLocalStorage('refreshToken');
  }

  updateAccessToken(newToken: string) {
    this.storageService.setLocalStorage('accessToken', newToken);
  }

  decodeToken(token: string) {
    if(token) {
      return AuthenticationMapper.fromTokenDTOModelToParsedToken(jwtDecode(token));
    }
    return null;
  }

  getRoles() {
    this.decodedToken = this.decodeToken(this.getAccessToken()!)!
    return this.decodedToken ? this.decodedToken?.roles : null
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
