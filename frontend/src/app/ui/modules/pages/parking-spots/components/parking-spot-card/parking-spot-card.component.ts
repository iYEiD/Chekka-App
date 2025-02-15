import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ParkingSpotViewModel} from "../../models/interfaces/parking-spots.model";

@Component({
  selector: 'app-parking-spot-card',
  standalone: false,
  templateUrl: './parking-spot-card.component.html',
  styleUrl: './parking-spot-card.component.scss'
})
export class ParkingSpotCardComponent {
  @Input() parkingSpot: ParkingSpotViewModel = new Input()
  @Output() cardClickEmitter = new EventEmitter()
  @Output() favoriteClickEmitter = new EventEmitter()

  cardClickEmitterFunction(event: any) {
    if ((event.target as HTMLElement).closest('.slick-dots')) {
      return;
    } else {
      this.cardClickEmitter.emit(this.parkingSpot.spotId)
    }
  }

  favoriteClickEmitterFunction(event: any) {
    event.stopPropagation();
    this.favoriteClickEmitter.emit({
      spotId: this.parkingSpot.spotId,
      isFavorite: !this.parkingSpot.isFavorite
    });
  }
}
