import {inject, Injectable, signal} from '@angular/core';
import {DashboardApiService} from "./dashboard-api.service";
import {DashboardViewModel} from "../models/interfaces/dashboard.models";
import {DashboardMapper} from "../mappers/dashboard.mapper";
import {SnackbarService} from "../../../../../services/snack-bar/services/snackbar.service";
import {SnackbarTypeEnums} from "../../../../../services/snack-bar/enum/snackbar-type.enums";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  dashboardApiService = inject(DashboardApiService)
  snackbarService = inject(SnackbarService)
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
        this.snackbarService.openSnackBar(SnackbarTypeEnums.SUCCESS, res.message)
        this.fetchDashboardData()
      },
      error: (err) => {}
    })
  }

  cancelBooking(bookingId: number) {
    this.dashboardApiService.cancelBooking(bookingId).subscribe({
      next: res => {
        this.snackbarService.openSnackBar(SnackbarTypeEnums.SUCCESS, "Booking cancelled successfully.")
        this.fetchDashboardData()
      },
      error: (err) => {}
    })
  }
}
