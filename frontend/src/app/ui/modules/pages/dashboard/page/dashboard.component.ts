import {Component, computed, effect, inject, signal} from '@angular/core';
import {DashboardService} from "../services/dashboard.service";
import {ParkingSpotsService} from "../../parking-spots/services/parking-spots.service";
import {BookingsViewModel} from "../models/interfaces/dashboard.models";
import {MainService} from "../../../main/services/main.service";
import {SnackbarService} from "../../../../../services/snack-bar/services/snackbar.service";
import {SnackbarTypeEnums} from "../../../../../services/snack-bar/enum/snackbar-type.enums";

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dashboardService = inject(DashboardService);
  parkingSpotsService = inject(ParkingSpotsService);
  mainService = inject(MainService)
  snackbarService = inject(SnackbarService)

  dashboardData = computed(() => {
    return this.dashboardService.dashboardData()
  })
  reviewTitle = signal<string | null>(null)
  reviewComment = signal<string | null>(null)
  reviewRating = signal<number | null>(null)
  reviewBookingId = signal<number | null>(null)

  gateCode = computed(() => {
    return this.dashboardService.spotGateCode()
  })

  isReviewModalVisible: boolean = false
  isCancelBookingModalVisible: boolean = false
  isViewGateCodeModalVisible: boolean = false
  cancelBookingSpot: BookingsViewModel | null = null

  constructor() {
    effect(() => {
      let test = this.dashboardData()
    });
  }

  ngOnInit(): void {
    this.fetchDashboardData()
    this.mainService.changeNavbarStatus()
  }

  updateDashboardIsFavorite(spotId: number, isFavorite: boolean, event: any) {
    event.stopPropagation()
    this.parkingSpotsService.updateIsFavorite(spotId, isFavorite)
    this.fetchDashboardData()
  }

  fetchDashboardData() {
    this.dashboardService.fetchDashboardData()
  }

  openReviewModal(bookingId: number, event: any) {
    this.reviewBookingId.set(bookingId)
    event.stopPropagation()
    this.isReviewModalVisible = true
  }

  closeReviewModal() {
    this.isReviewModalVisible = false
  }

  openCancelBookingModal(spot: BookingsViewModel, event: any) {
    event.stopPropagation()
    this.isCancelBookingModalVisible = true
    this.cancelBookingSpot = spot
  }

  closeCancelBookingModal() {
    this.isCancelBookingModalVisible = false
    this.cancelBookingSpot = null
  }

  openViewGateCodeModal(spotId: number, event: any) {
    event.stopPropagation()
    this.dashboardService.getGateCode(spotId)
    this.isViewGateCodeModalVisible = true
  }

  closeViewGateCodeModal() {
    this.isViewGateCodeModalVisible = false
  }

  cancelBooking(bookingId: number) {
    this.dashboardService.cancelBooking(bookingId)
    this.closeCancelBookingModal()
    this.fetchDashboardData()
  }

  submitReview() {
    this.dashboardService.submitReview(this.reviewBookingId()!, {
      title: this.reviewTitle(),
      comment: this.reviewComment(),
      rating: this.reviewRating(),
    })
    this.fetchDashboardData()
    this.closeReviewModal()
  }

  cancelUpcomingBooking() {
    this.snackbarService.openSnackBar(SnackbarTypeEnums.INFO, "Please go to help center page and send a cancellation request to cancel an upcoming booking.", 10000)
  }
}
