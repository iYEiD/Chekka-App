import {Component, computed, inject} from '@angular/core';
import {Router} from "@angular/router";
import {ParkingSpotsService} from "../../parking-spots/services/parking-spots.service";

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  router = inject(Router)
  parkingSpotsService = inject(ParkingSpotsService)
  parkingSpots = computed(() => this.parkingSpotsService.parkingSpots())

  private map!: google.maps.Map;
  private markers: google.maps.Marker[] = [];
  private zoomThreshold = 12;

  // Your list of locations with lat, lng, and ids
  locations = [
    { lat: 37.7749, lng: -122.4194, label: 'San Francisco', id: 9 },
    { lat: 34.0522, lng: -118.2437, label: 'Los Angeles', id: 9 },
    { lat: 40.7128, lng: -74.006, label: 'New York', id: 9 },
  ];

  constructor() {}

  ngOnInit(): void {
    this.initMap();
    this.addMarkers();
  }

  private initMap(): void {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 8,
    });
  }

  private addMarkers(): void {
    this.locations.forEach((location) => {
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: this.map,
        title: location.label,
      });

      marker.addListener('click', () => this.handleMarkerClick(marker, location));

      this.markers.push(marker);
    });
  }

  private handleMarkerClick(marker: google.maps.Marker, location: { id: number }): void {
    const currentZoom = this.map.getZoom() || 8;

    if (currentZoom < this.zoomThreshold) {
      this.map.setCenter(marker.getPosition() as google.maps.LatLng);
      this.map.setZoom(this.zoomThreshold);
    } else {
      this.router.navigate(['/app/parking-spots', location.id]);
    }
  }
}
