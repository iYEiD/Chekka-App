import {Component, computed, effect, inject} from '@angular/core';
import {Router} from "@angular/router";
import {ParkingSpotsService} from "../../parking-spots/services/parking-spots.service";
import {ParkingSpotViewModel} from "../../parking-spots/models/interfaces/parking-spots.model";
import {MainService} from "../../../main/services/main.service";

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  router = inject(Router)
  parkingSpotsService = inject(ParkingSpotsService)
  mainService = inject(MainService)

  parkingSpots = computed(() => {
    return this.parkingSpotsService.parkingSpots()
  })

  map!: google.maps.Map;
  markers: google.maps.Marker[] = [];
  zoomThreshold = 12;

  constructor() {
    effect(() => {
      let parkingSpots = this.parkingSpots()
      this.initMap();
      this.addMarkers();
    });
  }

  ngOnInit(): void {
    this.mainService.changeNavbarStatus()
  }

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 33.8547, lng: 35.8623 },
      zoom: 9,
    });
  }

  addMarkers(): void {
    this.parkingSpots().forEach((spot) => {
      const marker = new google.maps.Marker({
        position: { lat: spot.latitude, lng: spot.longitude },
        map: this.map,
        title: spot.title,
      });

      marker.addListener('click', () => this.handleMarkerClick(marker, spot));

      this.markers.push(marker);
    });
  }

  handleMarkerClick(marker: google.maps.Marker, spot: ParkingSpotViewModel): void {
    const currentZoom = this.map.getZoom() || 8;

    if (currentZoom < this.zoomThreshold) {
      this.map.setCenter(marker.getPosition() as google.maps.LatLng);
      this.map.setZoom(this.zoomThreshold);
    } else {
      this.router.navigate(['/app/parking-spots', spot.spotId]);
    }
  }
}
