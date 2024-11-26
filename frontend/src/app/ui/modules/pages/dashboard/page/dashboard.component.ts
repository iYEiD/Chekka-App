import {Component, computed, effect, inject, signal} from '@angular/core';
import {DashboardService} from "../services/dashboard.service";
import {ParkingSpotsService} from "../../parking-spots/services/parking-spots.service";
import {BookingsViewModel} from "../models/interfaces/dashboard.models";

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dashboardService = inject(DashboardService);
  parkingSpotsService = inject(ParkingSpotsService);
  dashboardData = computed(() => {
    return this.dashboardService.dashboardData()
  })
  reviewTitle = signal<string | null>(null)
  reviewComment = signal<string | null>(null)
  reviewRating = signal<number | null>(null)
  reviewBookingId = signal<number | null>(null)

  isReviewModalVisible: boolean = false
  isCancelBookingModalVisible: boolean = false
  cancelBookingSpot: BookingsViewModel | null = null

  constructor() {
    effect(() => {
      let test = this.dashboardData()
    });
  }

  ngOnInit(): void {
    this.fetchDashboardData()
  }

  updateDashboardIsFavorite(spotId: number, isFavorite: boolean, event: any) {
    event.stopPropagation()
    this.parkingSpotsService.updateIsFavorite(spotId, isFavorite)
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

  cancelBooking(bookingId: number) {
    this.dashboardService.cancelBooking(bookingId)
  }

  submitReview() {
    this.dashboardService.submitReview(this.reviewBookingId()!, {
      title: this.reviewTitle(),
      comment: this.reviewComment(),
      rating: this.reviewRating(),
    })
    this.closeReviewModal()
  }
}
