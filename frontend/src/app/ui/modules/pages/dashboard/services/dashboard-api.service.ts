import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DashboardDTOModel} from "../models/interfaces/dashboard.models";

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {
  http = inject(HttpClient)
  baseUrl = environment.backendUrl;
  fetchDashboardDataUrl = `${this.baseUrl}/user/user-dashboard`
  submitReviewUrl = `${this.baseUrl}/user/parking-spots/submit-review`
  cancelBookingUrl = `${this.baseUrl}/user/parking-spots/delete-booking`

  constructor() { }

  fetchDashboardData(): Observable<DashboardDTOModel> {
    return this.http.get<DashboardDTOModel>(this.fetchDashboardDataUrl)
  }

  submitReview(bookingId: number, review: any): Observable<any> {
    let updatedSubmitReviewUrl = `${this.submitReviewUrl}/${bookingId}`;
    return this.http.post(updatedSubmitReviewUrl, review)
  }

  cancelBooking(bookingId: number): Observable<any> {
    let updatedCancelBookingUrl = `${this.cancelBookingUrl}/${bookingId}`;
    return this.http.delete(updatedCancelBookingUrl)
  }

  getSpotGateCode(spotId: number): Observable<string> {
    let getGateCodeUrl = `${this.baseUrl}/user/parking-spots/gate/${spotId}`
    return this.http.get<string>(getGateCodeUrl)
  }
}
