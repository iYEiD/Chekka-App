import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ParkingSpotsApiService {
  http = inject(HttpClient);

  baseUrl = `${environment.backendUrl}`
  fetchParkingSportUrl = `${this.baseUrl}/fetch-parking-spots`
  constructor() { }

  fetchParkingSpots(filters: any): Observable<any> {
    return this.http.post(this.fetchParkingSportUrl, filters)
  }
}
