import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {
  http = inject(HttpClient)
  baseUrl = `${environment.backendUrl}`
  updateUserDetailUrl = `${this.baseUrl}/user/update-details`

  constructor() { }

  updateUserDetails(changes: any): Observable<any> {
    console.log(changes)
    return this.http.post(this.updateUserDetailUrl, changes)
  }
}
