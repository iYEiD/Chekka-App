import {Component, computed, inject} from '@angular/core';
import {ParkingSpotsService} from "../services/parking-spots.service";

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './parking-spots.component.html',
  styleUrl: './parking-spots.component.scss'
})
export class ParkingSpotsComponent {
  parkingSpotsService = inject(ParkingSpotsService)

  parkingSpots = computed(() => {
    return this.parkingSpotsService.parkingSpots();
  })

  ngOnInit(): void {
    // fetch parking spots from backend
  }

  navigateToDetailsPage(event: any) {

  }

  toggleIsFavorite(id: string) {
    this.parkingSpotsService.toggleIsFavorite(id)
  }
}
