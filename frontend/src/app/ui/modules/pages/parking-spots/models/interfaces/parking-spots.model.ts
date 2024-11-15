export interface ParkingSpotViewModel {
  id: string;
  city: string;
  district: string;
  mainDescription: string;
  pricePerHour: number;
  rating: number;
  isFavorite: boolean;
  images: string[];
}

export interface ParkingSpotDTOModel {

}

export interface AmenitiesModel {
  label: string;
  value: string
  icon: string;
  isSelected: boolean;
}
