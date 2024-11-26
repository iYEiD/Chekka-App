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
  baseUrl = `${environment.backendUrl}/parking-spots`
  fetchParkingSpotsUrl = `${this.baseUrl}/fetch-parking-spots`
  fetchParkingSpotByIdUrl = `${this.baseUrl}/fetch-parking-spot-details`
  reserveSpotUrl = `${this.baseUrl}/reserve-spot`

  constructor() { }

  fetchParkingSpots(filters: any): Observable<ParkingSpotDTOModel[]> {
    return this.http.post<ParkingSpotDTOModel[]>(this.fetchParkingSpotsUrl, filters)
  }

  fetchParkingSpotById(spotId: number): Observable<ParkingSpotDTOModel> {
    let updatedFetchParkingSpotByIdUrl = `${this.fetchParkingSpotByIdUrl}/${spotId}`
    return this.http.get<ParkingSpotDTOModel>(updatedFetchParkingSpotByIdUrl)
  }

  updateSpotFavoriteStatus(spotId: number, status: boolean): Observable<any> {
    let updateSpotFavoriteStatusUrl = `${this.baseUrl}/update-favorite/${spotId}`
    return this.http.post(updateSpotFavoriteStatusUrl, {is_favorite: status})
  }

  reserveSpot(reservationDetails: ReservationDTOModel): Observable<any> {
    console.log(reservationDetails);
    return this.http.post(this.reserveSpotUrl, reservationDetails)
  }
}
