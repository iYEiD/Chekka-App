import {inject, Injectable, signal} from '@angular/core';
import {ParkingSpotViewModel, ReservationViewModel} from "../models/interfaces/parking-spots.model";
import {ParkingSpotsApiService} from "./parking-spots-api.service";
import {ParkingSpotMapper} from "../mappers/parking-spot.mapper";
import {Router} from "@angular/router";

export interface SortSettingsModel {
  column: string;
  order: number;
}

@Injectable({
  providedIn: 'root'
})

export class ParkingSpotsService {
  parkingSpotsApiService = inject(ParkingSpotsApiService)
  router = inject(Router)

  parkingSpots = signal<ParkingSpotViewModel[]>([])
  selectedParkingSpot = signal<ParkingSpotViewModel | null>(null)

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
      },
    });
  }


  fetchParkingSports(filters: any, sortSettings: SortSettingsModel) {
    this.parkingSpotsApiService.fetchParkingSpots(filters).subscribe({
      next: (res) => {
        this.parkingSpots.set(ParkingSpotMapper.fromParkingSpotsDtoToViewModel(res))
        if (sortSettings.column && sortSettings.order) {
          console.log(sortSettings)
          this.sortParkingSpots(sortSettings)
        }
      },
      error: (err) => {
      }
    })
  }

  fetchParkingSpotById(id: number) {
    this.parkingSpotsApiService.fetchParkingSpotById(id).subscribe({
      next: res => {
        this.selectedParkingSpot.set(ParkingSpotMapper.fromParkingSpotDtoToViewModel(res))
      }
    })
  }

  reserveSpot(reservationDetails: ReservationViewModel) {
    this.parkingSpotsApiService.reserveSpot(ParkingSpotMapper.fromReservationViewModelToDTOModel(reservationDetails)).subscribe({
      next: (res) => {
      },
        error: (err) => {
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
}
