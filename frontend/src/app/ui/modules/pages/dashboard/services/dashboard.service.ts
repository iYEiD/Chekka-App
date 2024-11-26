import {inject, Injectable, signal} from '@angular/core';
import {DashboardApiService} from "./dashboard-api.service";
import {DashboardViewModel} from "../models/interfaces/dashboard.models";
import {DashboardMapper} from "../mappers/dashboard.mapper";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  dashboardApiService = inject(DashboardApiService)
  dashboardData = signal<DashboardViewModel | null>(null)

  constructor() { }

  fetchDashboardData() {
    this.dashboardApiService.fetchDashboardData().subscribe({
      next: res => {
        this.dashboardData.set(DashboardMapper.fromDashboardDTOToViewModel(res))
      }
    })
  }

  submitReview(bookingId: number, review: any) {
    this.dashboardApiService.submitReview(bookingId, review).subscribe({
      next: res => {
        this.fetchDashboardData()
      },
      error: (err) => {}
    })
  }

  cancelBooking(bookingId: number) {
    this.dashboardApiService.cancelBooking(bookingId).subscribe({
      next: res => {
        this.fetchDashboardData()
      },
      error: (err) => {}
    })
  }
}
