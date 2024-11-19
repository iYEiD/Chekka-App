import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environments/environment";
import {ReservationDTOModel} from "../models/interfaces/parking-spots.model";

@Injectable({
  providedIn: 'root'
})
export class ParkingSpotsApiService {
  http = inject(HttpClient);
  baseUrl = `${environment.backendUrl}`
  fetchParkingSportUrl = `${this.baseUrl}/fetch-parking-spots`
  reserveSpotUrl = `${this.baseUrl}/parking-spots/reserve-spot`

  constructor() { }

  fetchParkingSpots(filters: any): Observable<any> {
    return this.http.post(this.fetchParkingSportUrl, filters)
  }

  reserveSpot(reservationDetails: ReservationDTOModel): Observable<any> {
    console.log(reservationDetails);
    return this.http.post(this.reserveSpotUrl, reservationDetails)
  }
}
