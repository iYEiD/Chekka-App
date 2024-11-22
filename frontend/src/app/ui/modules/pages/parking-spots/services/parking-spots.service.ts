import {inject, Injectable, signal} from '@angular/core';
import {ParkingSpotViewModel, ReservationViewModel} from "../models/interfaces/parking-spots.model";
import {ParkingSpotsApiService} from "./parking-spots-api.service";
import {ParkingSpotMapper} from "../mappers/parking-spot.mapper";
import {error} from "@ant-design/icons-angular";

@Injectable({
  providedIn: 'root'
})
export class ParkingSpotsService {
  parkingSpotsApiService = inject(ParkingSpotsApiService)
  parkingSpots = signal<ParkingSpotViewModel[]>([])
  selectedParkingSpot = signal<ParkingSpotViewModel | null>(null)

  constructor() { }

  toggleIsFavorite(id: number) {
    this.parkingSpots.update((spots) =>
      spots.map((spot) =>
        spot.spotId === id
          ? { ...spot, isFavorite: !spot.isFavorite }
          : spot
      )
    );
    this.fetchParkingSpotById(id)
    // implement a backend endpoint as well to update the isFavorite field in the table
  }

  updateIsFavorite(spotId: number, status: boolean) {
    this.parkingSpotsApiService.updateSpotFavoriteStatus(spotId, status).subscribe({
      next: (res) => {
        console.log(res)
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
}
