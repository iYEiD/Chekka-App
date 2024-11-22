import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environments/environment";
import {ParkingSpotDTOModel, ReservationDTOModel} from "../models/interfaces/parking-spots.model";

@Injectable({
  providedIn: 'root'
})
export class ParkingSpotsApiService {
  http = inject(HttpClient);
  baseUrl = `${environment.backendUrl}`
  fetchParkingSportUrl = `${this.baseUrl}/fetch-parking-spots`
  reserveSpotUrl = `${this.baseUrl}/parking-spots/reserve-spot`

  constructor() { }

  fetchParkingSpots(filters: any): Observable<ParkingSpotDTOModel[]> {
    return this.http.post<ParkingSpotDTOModel[]>(this.fetchParkingSportUrl, filters)
  }

  updateSpotFavoriteStatus(spotId: number, status: boolean): Observable<any> {
    let updateSpotFavoriteStatusUrl = `${this.baseUrl}/parking-spots/update-favorite-status/${spotId}`
    console.log(updateSpotFavoriteStatusUrl, status)
    return this.http.post(updateSpotFavoriteStatusUrl, {is_favourite: status})
  }

  reserveSpot(reservationDetails: ReservationDTOModel): Observable<any> {
    console.log(reservationDetails);
    return this.http.post(this.reserveSpotUrl, reservationDetails)
  }
}
