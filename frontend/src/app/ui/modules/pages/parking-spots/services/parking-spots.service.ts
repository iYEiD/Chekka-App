import { Injectable, signal } from '@angular/core';
import {ParkingSpotViewModel} from "../models/interfaces/parking-spots.model";

@Injectable({
  providedIn: 'root'
})
export class ParkingSpotsService {
  parkingSpots = signal<ParkingSpotViewModel[]>([
    {
      id: "1",
      city: "Beirut",
      district: "Hamra",
      mainDescription: "Near shops and cafes",
      pricePerHour: 5,
      rating: 4.5,
      isFavorite: false,
      images: [
        'assets/images/test.png',
        'assets/images/test2.png'
      ]
    },
    {
      id: "2",
      city: "Byblos",
      district: "Old Souk",
      mainDescription: "Near landmarks and port",
      pricePerHour: 3,
      rating: 4.7,
      isFavorite: false,
      images: [
        'assets/images/test.png',
        'assets/images/test2.png'
      ]
    },
    {
      id: "3",
      city: "Tripoli",
      district: "El Mina",
      mainDescription: "Close to seafront and restaurants",
      pricePerHour: 2,
      rating: 4.2,
      isFavorite: false,
      images: [
        'assets/images/test.png',
        'assets/images/test2.png'
      ]
    },
    {
      id: "4",
      city: "Sidon",
      district: "Old City",
      mainDescription: "Near Sidon Sea Castle",
      pricePerHour: 2.5,
      rating: 4.0,
      isFavorite: false,
      images: [
        'assets/images/test.png',
        'assets/images/test2.png'
      ]
    },
    {
      id: "5",
      city: "Zahle",
      district: "City Center",
      mainDescription: "Near dining spots and centers",
      pricePerHour: 1.5,
      rating: 4.3,
      isFavorite: false,
      images: [
        'assets/images/test.png',
        'assets/images/test2.png'
      ]
    },
    {
      id: "6",
      city: "Baalbek",
      district: "Temple Ruins",
      mainDescription: "Near Baalbek ruins",
      pricePerHour: 2,
      rating: 4.6,
      isFavorite: false,
      images: [
        'assets/images/test.png',
        'assets/images/test2.png'
      ]
    },
    {
      id: "7",
      city: "Jounieh",
      district: "Maameltein",
      mainDescription: "Near coastline and venues",
      pricePerHour: 4,
      rating: 4.4,
      isFavorite: false,
      images: [
        'assets/images/test.png',
        'assets/images/test2.png'
      ]
    },
    {
      id: "8",
      city: "Tyre",
      district: "Al Bass",
      mainDescription: "Near site and beaches",
      pricePerHour: 3,
      rating: 4.5,
      isFavorite: false,
      images: [
        'assets/images/test.png',
        'assets/images/test2.png'
      ]
    },
    {
      id: "9",
      city: "Batroun",
      district: "Marina",
      mainDescription: "Near beach bars and sites",
      pricePerHour: 2.5,
      rating: 4.1,
      isFavorite: false,
      images: [
        'assets/images/test.png',
        'assets/images/test2.png'
      ]
    },
    {
      id: "10",
      city: "Aley",
      district: "Main Street",
      mainDescription: "In Aley center",
      pricePerHour: 3,
      rating: 4.0,
      isFavorite: false,
      images: [
        'assets/images/test.png',
        'assets/images/test2.png'
      ]
    },
  ])

  constructor() { }

  toggleIsFavorite(id: string) {
    this.parkingSpots.update((spots) =>
      spots.map((spot) =>
        spot.id === id
          ? { ...spot, isFavorite: !spot.isFavorite }
          : spot
      )
    );
    // implement a backend endpoint as well to update the isFavorite field in the table
  }
}
