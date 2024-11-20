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

  ngOnInit(): void {
    // fetch parking spots from backend
  }

  navigateToDetailsPage(id: number) {
    let detailsPageUrl = '/app/parking-spots'

    this.router.navigate([detailsPageUrl, id]);
  }

  toggleIsFavorite(id: string) {
    this.parkingSpotsService.toggleIsFavorite(id)
  }
}
