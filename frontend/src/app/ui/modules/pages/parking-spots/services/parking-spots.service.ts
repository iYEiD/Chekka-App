import {inject, Injectable, signal} from '@angular/core';
import {ParkingSpotViewModel, ReservationViewModel} from "../models/interfaces/parking-spots.model";
import {ParkingSpotsApiService} from "./parking-spots-api.service";
import {ParkingSpotMapper} from "../mappers/parking-spot.mapper";
import {error} from "@ant-design/icons-angular";
import {Router} from "@angular/router";

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
              ? { ...spot, isFavorite: !spot.isFavorite }
              : spot
          )
        );
      },
      error: error => {}
    })
  }

  fetchParkingSports(filters: any) {
    this.parkingSpotsApiService.fetchParkingSpots(filters).subscribe({
      next: (res) => {
        this.parkingSpots.set(ParkingSpotMapper.fromParkingSpotsDtoToViewModel(res))
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
    this.selectedParkingSpot.set(this.parkingSpots().filter(spot => spot.spotId === id)[0])
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
}
