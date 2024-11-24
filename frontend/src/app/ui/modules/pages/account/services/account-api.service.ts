import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {
  http = inject(HttpClient)
  baseUrl = `${environment.backendUrl}/user`
  updateUserDetailUrl = `${this.baseUrl}/update-details`

  constructor() { }

  updateUserDetails(column: string, newValue: string | number, oldValue?: string): Observable<any> {
    return this.http.post(this.updateUserDetailUrl, {
      column: column,
      newValue: newValue,
      oldValue: oldValue
    })
  }
}
