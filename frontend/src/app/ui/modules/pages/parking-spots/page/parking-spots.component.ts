import {Component, computed, inject} from '@angular/core';
import {ParkingSpotsService} from "../services/parking-spots.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './parking-spots.component.html',
  styleUrl: './parking-spots.component.scss'
})
export class ParkingSpotsComponent {
  parkingSpotsService = inject(ParkingSpotsService)
  router = inject(Router)

  parkingSpots = computed(() => {
    return this.parkingSpotsService.parkingSpots();
  })

  navigateToDetailsPage(id: number) {
    this.parkingSpotsService.navigateToDetailsPage(id)
  }

  updateIsFavorite(emitterData: any) {
    this.parkingSpotsService.updateIsFavorite(emitterData.spotId, emitterData.isFavorite)
  }
}
