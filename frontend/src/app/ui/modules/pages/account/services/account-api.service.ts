import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {Observable} from "rxjs";
import {UserDTOModel, WalletDtoModel} from "../../../../../models/authentication/interfaces/authentication.models";

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {
  http = inject(HttpClient)
  baseUrl = `${environment.backendUrl}/user`
  updateUserDetailUrl = `${this.baseUrl}/update-details`
  getUserDetailsUrl = `${this.baseUrl}/user-details`
  getUserWalletUrl = `${this.baseUrl}/user-wallet`

  constructor() { }

  updateUserDetails(column: string, newValue: string | number, oldValue?: string): Observable<any> {
    return this.http.post(this.updateUserDetailUrl, {
      column: column,
      newValue: newValue,
      oldValue: oldValue
    })
  }

  getUserDetails(): Observable<UserDTOModel> {
    return this.http.get<UserDTOModel>(this.getUserDetailsUrl)
  }

  getUserWallet(): Observable<WalletDtoModel> {
    return this.http.get<WalletDtoModel>(this.getUserWalletUrl)
  }
}
