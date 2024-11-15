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
import {AmenitiesModel} from "../../pages/parking-spots/models/interfaces/parking-spots.model";
import {HelperFunctions} from "../../../../common/helper-functions";
import {ParkingSpotsService} from "../../pages/parking-spots/services/parking-spots.service";

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  parkingSpotService = inject(ParkingSpotsService)

  @ViewChild('header') header!: ElementRef;
  isModalVisible = false;
  isDropdownOpen = false;
  vehicleTypeOptions = [
    {
      label: "Any Type",
      value: "any_type"
    },
    {
      label: "Car",
      value: "car"
    },
    {
      label: "Motorcycle",
      value: "motorcycle"
    }
  ]
  minPriceFilter = signal<number>(1)
  maxPriceFilter = signal<number>(100)
  priceRange = signal<number[] | null>(null)
  formatterDollar = (value: number): string => `$ ${value}`;
  formatterMaxDollar = (value: number): string => `$ ${value} +`;

  searchValue = signal<string | null>(null)
  debouncedSearchValue = HelperFunctions.debouncedSignal(this.searchValue, 300)

  selectedFilters = computed(() => {
    return {
      vehicle_type: this.vehicleType(),
      price_range: this.priceRange(),
      amenities: this.selectedAmenities()
    }
  })

  vehicleType = signal("")

  amenities = signal<AmenitiesModel[]>([
    {
      label: "Covered",
      value: "covered",
      icon: "",
      isSelected: false
    },
    {
      label: "Security",
      value: "security",
      icon: "",
      isSelected: false
    },
    {
      label: "EV Charging",
      value: "ev_charging",
      icon: "",
      isSelected: false
    },
    {
      label: "Handicap",
      value: "handicap",
      icon: "",
      isSelected: false
    },
    {
      label: "Lighting",
      value: "lighting",
      icon: "",
      isSelected: false
    },
    {
      label: "CCTV",
      value: "cctv",
      icon: "",
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

  onVehicleTypeChange(value: number): void {
    this.vehicleType.set(this.vehicleTypeOptions[value].value);
  }

  onPriceChange(index: number, value: any): void {
    const currentRange = [...this.priceRange()!];
    currentRange[index] = value;
    this.priceRange.set(currentRange);
  }

  openModal() {
    this.clearPriceRange()
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
    this.isModalVisible = false
    this.parkingSpotService.fetchParkingSports(this.selectedFilters())
  }

  clearAllFilters() {
    this.clearSearchValue()
    this.clearVehicleType()
    this.clearSelectedAmenities()
    this.clearPriceRange()
    this.fetchParkingSpots()
  }

  clearVehicleType() {
    this.vehicleType.set("any_type")
  }

  clearSelectedAmenities() {
    this.amenities().forEach(amenity => {
      amenity.isSelected = false
    })
  }

  clearSearchValue() {
    this.searchValue.set(null)
  }

  clearPriceRange() {
    this.minPriceFilter.set(1)
    this.maxPriceFilter.set(100)
    this.priceRange.set([this.minPriceFilter(), this.maxPriceFilter()])
  }

}
