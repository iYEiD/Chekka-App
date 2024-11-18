export interface ParkingSpotViewModel {
  id: string;
  city: string;
  district: string;
  mainDescription: string;
  pricePerHour: number;
  rating: number;
  isFavorite: boolean;
  images: string[];
  amenities?: string[];
  reviews?: ReviewsViewModel[]
}

export interface ParkingSpotDTOModel {

}

export interface AmenitiesFilterModel {
  label: string;
  value: string
  isSelected: boolean;
}

export interface ReviewsViewModel {
  userFirstName: string;
  userUsageTime: string
  title: string;
  rating: number;
  comment: string;
  creationDate: string;
}
