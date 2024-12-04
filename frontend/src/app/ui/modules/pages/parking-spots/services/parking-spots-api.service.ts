import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environments/environment";
import {ParkingSpotDTOModel, ReservationDTOModel} from "../models/interfaces/parking-spots.model";
import {updateEntities} from "@ngrx/signals/entities";

@Injectable({
  providedIn: 'root'
})
export class ParkingSpotsApiService {
  http = inject(HttpClient);
  baseUrl = `${environment.backendUrl}`
  fetchParkingSpotsUrl = `${this.baseUrl}/parking-spots/fetch-parking-spots`
  fetchParkingSpotByIdUrl = `${this.baseUrl}/parking-spots/fetch-parking-spot-details`
  bookSpotUrl = `${this.baseUrl}/user/parking-spots/book-spot`

  constructor() { }

  fetchParkingSpots(filters: any): Observable<ParkingSpotDTOModel[]> {
    return this.http.post<ParkingSpotDTOModel[]>(this.fetchParkingSpotsUrl, filters)
  }

  fetchParkingSpotById(spotId: number): Observable<ParkingSpotDTOModel> {
    let updatedFetchParkingSpotByIdUrl = `${this.fetchParkingSpotByIdUrl}/${spotId}`
    return this.http.get<ParkingSpotDTOModel>(updatedFetchParkingSpotByIdUrl)
  }

  updateSpotFavoriteStatus(spotId: number, status: boolean): Observable<any> {
    let updateSpotFavoriteStatusUrl = `${this.baseUrl}/parking-spots/update-favorite/${spotId}`
    return this.http.post(updateSpotFavoriteStatusUrl, {is_favorite: status})
  }

  bookSpot(reservationDetails: ReservationDTOModel): Observable<any> {
    console.log(reservationDetails);
    let updatedBookSpotUrl = `${this.bookSpotUrl}/${reservationDetails.spot_id}`
    console.log(updatedBookSpotUrl)
    return this.http.post(updatedBookSpotUrl, reservationDetails)
  }
}
