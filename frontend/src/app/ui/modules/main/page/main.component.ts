import {Component, computed, ElementRef, HostListener, signal, ViewChild} from '@angular/core';
import {AmenitiesModel} from "../../pages/parking-spots/models/interfaces/parking-spots.model";

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  @ViewChild('header') header!: ElementRef;
  isModalVisible = false;
  isDropdownOpen = false;
  minPriceFilter = signal<number>(1)
  maxPriceFilter = signal<number>(100)
  priceRange = signal<number[]>([this.minPriceFilter(),this.maxPriceFilter()])
  formatterDollar = (value: number): string => `$ ${value}`;
  formatterMaxDollar = (value: number): string => `$ ${value} +`;

  amenities: AmenitiesModel[] = [
    {
      name: "Covered",
      icon: "",
      isSelected: false
    },
    {
      name: "Security",
      icon: "",
      isSelected: false
    },
    {
      name: "EV Charging",
      icon: "",
      isSelected: false
    },
    {
      name: "Handicap",
      icon: "",
      isSelected: false
    },
    {
      name: "Lighting",
      icon: "",
      isSelected: false
    },
    {
      name: "CCTV",
      icon: "",
      isSelected: false
    }
  ]

  inputMinValueShown = computed(() => {
    return '$' + this.minPriceFilter()
  })

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 0) {
      this.header.nativeElement.classList.add('scrolled');
    } else {
      this.header.nativeElement.classList.remove('scrolled');
    }
  }

  onPriceChange(index: number, value: any): void {
    const currentRange = [...this.priceRange()];
    currentRange[index] = value;
    this.priceRange.set(currentRange);
  }

  openModal() {
    this.isModalVisible = true
  }

  closeModal() {
    this.minPriceFilter.set(1)
    this.maxPriceFilter.set(100)
    this.priceRange.set([this.minPriceFilter(), this.maxPriceFilter()])
    this.isModalVisible = false
  }

  onDropdownVisibleChange(visible: boolean): void {
    this.isDropdownOpen = visible;
  }

  protected readonly close = close;
}
