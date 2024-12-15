import {computed, inject, Injectable, signal} from '@angular/core';
import {ParkingSpotViewModel, ReservationViewModel} from "../models/interfaces/parking-spots.model";
import {ParkingSpotsApiService} from "./parking-spots-api.service";
import {ParkingSpotMapper} from "../mappers/parking-spot.mapper";
import {Router} from "@angular/router";
import {SnackbarService} from "../../../../../services/snack-bar/services/snackbar.service";
import {SnackbarTypeEnums} from "../../../../../services/snack-bar/enum/snackbar-type.enums";

export interface SortSettingsModel {
  column: string;
  order: number;
}

@Injectable({
  providedIn: 'root'
})

export class ParkingSpotsService {
  parkingSpotsApiService = inject(ParkingSpotsApiService)
  snackBarService = inject(SnackbarService)
  router = inject(Router)

  parkingSpots = signal<ParkingSpotViewModel[]>([])
  selectedParkingSpot = signal<ParkingSpotViewModel | null>(null)
  userLat = signal<number | null>(null)
  userLong = signal<number | null>(null)
  userLocation = computed(() => {
    return {
      latitude: this.userLat(),
      longitude: this.userLong()
    }
  })

  constructor() { }

  updateIsFavorite(spotId: number, status: boolean) {
    this.parkingSpotsApiService.updateSpotFavoriteStatus(spotId, status).subscribe({
      next: (res) => {
        this.parkingSpots.update((spots) =>
          spots.map((spot) =>
            spot.spotId === spotId
              ? { ...spot, isFavorite: status }
              : spot
          )
        );
        this.fetchParkingSpotById(spotId)
      },
      error: (error) => {
        console.error('Error updating favorite status:', error);
      }
    });
  }


  fetchParkingSports(filters: any, sortSettings: SortSettingsModel) {
    if (this.userLat() && this.userLong()) {
      this.parkingSpotsApiService.fetchParkingSpots(filters).subscribe({
        next: (res) => {
          this.parkingSpots.set(ParkingSpotMapper.fromParkingSpotsDtoToViewModel(res))
          if (sortSettings.column && sortSettings.order) {
            this.sortParkingSpots(sortSettings)
          }
        },
        error: (err) => {
        }
      })
    }
  }

  fetchParkingSpotById(id: number) {
    if (this.userLat() && this.userLong()) {
      this.parkingSpotsApiService.fetchParkingSpotById(id, this.userLocation()).subscribe({
        next: res => {
          this.selectedParkingSpot.set(ParkingSpotMapper.fromParkingSpotDtoToViewModel(res))
        }
      })
    }
  }

  bookSpot(reservationDetails: ReservationViewModel) {
    this.parkingSpotsApiService.bookSpot(ParkingSpotMapper.fromReservationViewModelToDTOModel(reservationDetails)).subscribe({
      next: (res) => {
        this.snackBarService.openSnackBar(SnackbarTypeEnums.SUCCESS, "Spot booked successfully")
        this.fetchParkingSpotById(reservationDetails.spotId)
      },
      error: (err) => {
        this.snackBarService.openSnackBar(SnackbarTypeEnums.ERROR, "Failed to book spot. Please try again later.")
      }
    })
  }

  navigateToDetailsPage(id: number) {
    let detailsPageUrl = '/app/parking-spots'

    this.router.navigate([detailsPageUrl, id]);
  }

  sortParkingSpots(
    sortSettings: SortSettingsModel
  ) {
    const { column, order } = sortSettings;

    this.parkingSpots.set([...this.parkingSpots()].sort((a, b) => {
      const valueA = a[column as keyof ParkingSpotViewModel];
      const valueB = b[column as keyof ParkingSpotViewModel];

      if (valueA == null && valueB == null) return 0;
      if (valueA == null) return order * -1;
      if (valueB == null) return order;

      if (valueA < valueB) return order * -1;
      if (valueA > valueB) return order * 1;
      return 0;
    }));
  }

  getUserLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          this.userLat.set(userLat);
          this.userLong.set(userLng);
        },
        (error) => {
          this.snackBarService.openSnackBar(SnackbarTypeEnums.ERROR, "Allow location to be able to view location based data")
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}
