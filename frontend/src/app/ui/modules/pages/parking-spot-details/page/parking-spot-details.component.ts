import {Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ParkingSpotsService} from "../../parking-spots/services/parking-spots.service";
import {HelperFunctions} from "../../../../../common/helper-functions";

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './parking-spot-details.component.html',
  styleUrl: './parking-spot-details.component.scss'
})
export class ParkingSpotDetailsComponent {
  route = inject(ActivatedRoute)
  parkingSpotsService = inject(ParkingSpotsService)

  amenitiesIconMap: Record<string, string> = {
    covered: "bi bi-droplet",
    ev_charging: "bi bi-ev-station",
    security: "bi bi-shield",
    cctv: "bi bi-camera-video"
  };

  parkingSpot = computed(() => {
    return this.parkingSpotsService.selectedParkingSpot()
  })

  parkingSpotId = computed(() => {
    return this.route.snapshot.paramMap.get('ID')
  })

  dateRange = signal<string[] | null>(null)
  selectedStartTime = computed(() => {
    return this.dateRange() ? HelperFunctions.formatDateToCustomFormat(this.dateRange()![0]) : null
  })
  selectedEndTime = computed(() => {
    return this.dateRange() ? HelperFunctions.formatDateToCustomFormat(this.dateRange()![1]) : null
  })

  constructor() {}

  ngOnInit(): void {
    this.parkingSpotsService.fetchParkingSpotById(this.parkingSpotId()!)
  }

}
