import {Component, computed, inject} from '@angular/core';
import {Router} from "@angular/router";
import {ParkingSpotsService} from "../../parking-spots/services/parking-spots.service";
import {ParkingSpotViewModel} from "../../parking-spots/models/interfaces/parking-spots.model";

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  router = inject(Router)
  parkingSpotsService = inject(ParkingSpotsService)
  parkingSpots = computed(() => {
    console.log(this.parkingSpotsService.parkingSpots())
    return this.parkingSpotsService.parkingSpots()
  })

  private map!: google.maps.Map;
  private markers: google.maps.Marker[] = [];
  private zoomThreshold = 12;

  constructor() {}

  ngOnInit(): void {
    this.initMap();
    this.addMarkers();
  }

  private initMap(): void {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 33.8547, lng: 35.8623 },
      zoom: 9,
    });
  }

  private addMarkers(): void {
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

  private handleMarkerClick(marker: google.maps.Marker, spot: ParkingSpotViewModel): void {
    const currentZoom = this.map.getZoom() || 8;

    if (currentZoom < this.zoomThreshold) {
      this.map.setCenter(marker.getPosition() as google.maps.LatLng);
      this.map.setZoom(this.zoomThreshold);
    } else {
      this.router.navigate(['/app/parking-spots', spot.spotId]);
    }
  }
}
