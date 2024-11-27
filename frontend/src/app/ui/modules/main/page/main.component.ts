import {
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  signal,
  untracked,
  ViewChild
} from '@angular/core';
import {AmenitiesFilterModel} from "../../pages/parking-spots/models/interfaces/parking-spots.model";
import {ParkingSpotsService} from "../../pages/parking-spots/services/parking-spots.service";
import {HelperFunctions} from "../../../../common/helper-functions";
import {Router} from "@angular/router";
import {AuthService} from "../../authentication/services/auth.service";
import {MainService} from "../services/main.service";

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  parkingSpotService = inject(ParkingSpotsService)
  mainService = inject(MainService)
  authService = inject(AuthService)
  router = inject(Router)

  @ViewChild('header') header!: ElementRef;
  isModalVisible = false;
  isDropdownOpen = false;
  vehicleTypeOptions = ["any_type", "Car", "Bike", "Truck"]
  minPriceFilter = signal<number>(1)
  maxPriceFilter = signal<number>(100)
  priceRange = signal<number[] | null>([this.minPriceFilter(), this.maxPriceFilter()])
  formatterDollar = (value: number): string => `$ ${value}`;
  formatterMaxDollar = (value: number): string => `$ ${value} +`;

  searchValue = signal<string | null>(null)
  debouncedSearchValue = HelperFunctions.debouncedSignal(this.searchValue, 300)

  selectedFilters = computed(() => {
    return {
      vehicle_type: this.vehicleType() !== "any_type" ? this.vehicleType() : null,
      price_range: this.priceRange()![0] !== this.minPriceFilter() || this.priceRange()![1] !== this.maxPriceFilter() ? this.priceRange() : null,
      amenities: this.selectedAmenities().length !== 0 ? this.selectedAmenities() : null,
      search_value: this.debouncedSearchValue(),
      date_range: this.dateTimeRange() ? [HelperFunctions.formatFilterDate(this.dateTimeRange()![0]), HelperFunctions.formatFilterDate(this.dateTimeRange()![1])] : null
    }
  })

  filterTagChips: string[] = []

  dateTimeRange = signal<any | null>(null)

  vehicleType = signal<string>("any_type")

  amenities = signal<AmenitiesFilterModel[]>([
    {
      label: "Covered",
      value: "is_covered",
      isSelected: false
    },
    {
      label: "Security",
      value: "has_security",
      isSelected: false
    },
    {
      label: "EV Charging",
      value: "has_ev_charging",
      isSelected: false
    },
    {
      label: "Handicap Accessible",
      value: "is_handicap_accessible",
      isSelected: false
    },
    {
      label: "Lighting",
      value: "has_lighting",
      isSelected: false
    },
    {
      label: "CCTV",
      value: "has_cctv",
      isSelected: false
    }
  ])
  selectedAmenities = computed(() => {
    return this.amenities().filter(amenity => amenity.isSelected)
      .map(amenity => amenity.value)
  })

  constructor() {
    effect(() => {
      const debouncedValue = this.debouncedSearchValue()
      untracked(() => {
        this.fetchParkingSpots()
      })
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 0) {
      this.header.nativeElement.classList.add('scrolled');
    } else {
      this.header.nativeElement.classList.remove('scrolled');
    }
  }

  onVehicleTypeChange(value: string): void {
    this.vehicleType.set(value);
  }

  onPriceChange(index: number, value: any): void {
    const currentRange = [...this.priceRange()!];
    currentRange[index] = value;
    this.priceRange.set(currentRange);
  }

  openModal() {
    this.isModalVisible = true
  }

  closeModal() {
    this.isModalVisible = false
  }

  onDropdownVisibleChange(visible: boolean): void {
    this.isDropdownOpen = visible;
  }

  updateAmenityIsSelectedStatus(amenityName: string) {
    const updatedAmenities = this.amenities().map(a =>
      a.value === amenityName ? { ...a, isSelected: !a.isSelected } : a
    )
    this.amenities.set(updatedAmenities)
  }

  fetchParkingSpots() {
    this.filterTagChips = []
    this.isModalVisible = false
    this.vehicleType() !== "any_type" && this.vehicleType() ? this.filterTagChips.push(this.vehicleType()) : null
    this.priceRange()![0] !== this.minPriceFilter() || this.priceRange()![1] !== this.maxPriceFilter() ?
      this.filterTagChips.push("$" + this.minPriceFilter() + " - $" + this.maxPriceFilter()) : null
    this.selectedAmenities().length > 0 ?
      this.selectedAmenities().forEach(amenity => this.filterTagChips.push(amenity)) : null
    this.parkingSpotService.fetchParkingSports(this.selectedFilters())
    let currentUrl = this.router.url
    if (currentUrl !== '/app/parking-spots') {
      this.navigateToHomePage()
    }
  }

  clearAllFilters() {
    this.clearVehicleType()
    this.clearSelectedAmenities()
    this.clearPriceRange()
  }

  clearVehicleType() {
    this.vehicleType.set("any_type")
  }

  clearSelectedAmenities() {
    const updatedAmenities = this.amenities().map(amenity => {
      return { ...amenity, isSelected: false };
    });
    this.amenities.set(updatedAmenities);
  }

  clearPriceRange() {
    this.minPriceFilter.set(1)
    this.maxPriceFilter.set(100)
    this.priceRange.set([this.minPriceFilter(), this.maxPriceFilter()])
  }

  navigateToHomePage() {
    this.router.navigate(['/app/parking-spots'])
  }
}
