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
    return this.dateRange() && this.dateRange()?.length !== 0 ? HelperFunctions.formatDateToCustomFormat(this.dateRange()![0]) : "-"
  })
  selectedEndTime = computed(() => {
    return this.dateRange() && this.dateRange()?.length !== 0 ? HelperFunctions.formatDateToCustomFormat(this.dateRange()![1]) : "-"
  })
  totalPrice = computed(() => {
    return this.totalDuration() ? this.totalDuration()!*this.parkingSpot()?.pricePerHour! : null
  })
  totalDuration = computed(() => {
    return this.selectedEndTime() && this.selectedStartTime() ? this.getDuration(this.selectedStartTime(), this.selectedEndTime()) : null
  })
  reserveButtonDisabled = computed(() => {
    return this.totalPrice() === null
  })
  reservationDetails = computed(() => {
    return {
      spotId: this.parkingSpot()?.id!,
      startTime: this.selectedStartTime()!,
      endTime: this.selectedEndTime()!,
    }
  })

  isModalVisible: boolean = false

  disabledDate = (current: Date): boolean => {
    if (!current) return false;

    const formattedDate = this.formatDate(current);
    const disabledEntry = this.parkingSpot()?.disabledDateTimes?.find((entry) => entry.date === formattedDate);

    return !!disabledEntry && (!disabledEntry.hours || disabledEntry.hours.length === 0);
  };

  disabledTime = (current: Date | Date[], partial?: 'start' | 'end') => {
    if (!current || Array.isArray(current)) {
      return {
        nzDisabledHours: () => [],
        nzDisabledMinutes: () => [],
        nzDisabledSeconds: () => [],
      };
    }

    const formattedDate = this.formatDate(current as Date); // Format to 'yyyy-MM-dd'

    const disabledEntry = this.parkingSpot()?.disabledDateTimes?.find((entry) => entry.date === formattedDate);

    if (disabledEntry && disabledEntry.hours && disabledEntry.hours.length > 0) {
      return {
        nzDisabledHours: () => disabledEntry.hours,
        nzDisabledMinutes: () => [],
        nzDisabledSeconds: () => [],
      };
    }

    return {
      nzDisabledHours: () => [],
      nzDisabledMinutes: () => [],
      nzDisabledSeconds: () => [],
    };
  };


  constructor() {}

  ngOnInit(): void {
    this.parkingSpotsService.fetchParkingSpotById(this.parkingSpotId()!)
  }

  openConfirmationModal() {
    this.isModalVisible = true
  }

  closeConfirmationModal() {
    this.isModalVisible = false
  }

  reserveSpot() {
    this.closeConfirmationModal()
    this.parkingSpotsService.reserveSpot(this.reservationDetails())
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getDuration(startTimestamp: string, endTimestamp: string): number {
    const start = new Date(startTimestamp);
    const end = new Date(endTimestamp);

    const diffInMilliseconds = end.getTime() - start.getTime();

    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    return diffInHours;
  }

}
