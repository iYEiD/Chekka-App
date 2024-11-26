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
    Covered: "bi bi-droplet",
    Handicap: "bi bi-person-wheelchair",
    Security: "bi bi-shield",
    Lighting: "bi bi-lightbulb",
    CCTV: "bi bi-camera-video",
    EV: "bi bi-ev-station"
  };

  parkingSpot = computed(() => {
    return this.parkingSpotsService.selectedParkingSpot()
  })

  parkingSpotId = computed(() => {
    return this.route.snapshot.paramMap.get('ID')
  })

  dateRange = signal<string[] | null>(null)
  selectedStartTime = computed(() => {
    return this.dateRange() && this.dateRange()?.length !== 0 ? HelperFunctions.formatDateToCustomFormat(this.dateRange()![0]) : null
  })
  selectedEndTime = computed(() => {
    return this.dateRange() && this.dateRange()?.length !== 0 ? HelperFunctions.formatDateToCustomFormat(this.dateRange()![1]) : null
  })
  totalPrice = computed(() => {
    return this.totalDuration() ? this.totalDuration()!*this.parkingSpot()?.pricePerHour! : null
  })
  totalDuration = computed(() => {
    return this.selectedEndTime() && this.selectedStartTime() ? this.getDuration(this.selectedStartTime()!, this.selectedEndTime()!) : null
  })
  invalidDateRange = computed(() => {
    if (!this.selectedEndTime() || !this.selectedStartTime()) {
      return false
    } else {
      return !this.compareDateStrings(this.selectedStartTime()!, this.selectedEndTime()!)
    }
  })
  reserveButtonDisabled = computed(() => {
    return this.totalPrice() === null || this.invalidDateRange()
  })
  reservationDetails = computed(() => {
    return {
      spotId: this.parkingSpot()?.spotId!,
      startTime: this.selectedStartTime()!,
      endTime: this.selectedEndTime()!,
    }
  })

  isModalVisible: boolean = false

  availabilityMap = new Map<number, { startHour: number; endHour: number }>();

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

    const currentDate = current as Date;
    const dayOfWeek = currentDate.getDay() || 7; // Convert Sunday (0) to 7

    const availability = this.availabilityMap.get(dayOfWeek);

    const disabledHours: any = [];
    for (let hour = 0; hour < 24; hour++) {
      if (availability && (hour < availability.startHour || hour > availability.endHour)) {
        disabledHours.push(hour);
      }
    }

    return {
      nzDisabledHours: () => disabledHours,
      nzDisabledMinutes: () => [],
      nzDisabledSeconds: () => [],
    };
  };

  constructor() {
    effect(() => {
      let spot = this.parkingSpot()
      this.parkingSpot()?.availability!.forEach(entry => {
        const startHour = parseInt(entry.start_time.split(':')[0], 10);
        const endHour = parseInt(entry.end_time.split(':')[0], 10);
        this.availabilityMap.set(entry.day, { startHour, endHour });
      });
    })
  }

  ngOnInit(): void {
    this.parkingSpotsService.fetchParkingSpotById(parseInt(this.parkingSpotId()!, 10))
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

  compareDateStrings(startSignal: string, endSignal: string): boolean {
    if (!startSignal || !endSignal) return false;

    const startDate = this.parseCustomDateString(startSignal);
    const endDate = this.parseCustomDateString(endSignal);

    if (!startDate || !endDate) {
      console.error("Invalid date format");
      return false;
    }

    return startDate <= endDate;
  }

  parseCustomDateString(dateString: string): Date | null {
    try {
      const [datePart, timePart] = dateString.split('@');
      const parsedDate = new Date(`${datePart.trim()} ${timePart.trim()}`);
      return isNaN(parsedDate.getTime()) ? null : parsedDate;
    } catch (error) {
      return null;
    }
  }

  getAmenityIcon(amenity: string): string {
    const matchingKey = Object.keys(this.amenitiesIconMap).find((key) =>
      amenity.toLowerCase().startsWith(key.toLowerCase())
    );

    return matchingKey ? this.amenitiesIconMap[matchingKey] : '';
  }

}
