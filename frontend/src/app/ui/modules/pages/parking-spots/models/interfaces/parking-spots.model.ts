import {CarTypeEnums, StatusEnums} from "../enums/parking-spots.enum";

export interface ParkingSpotViewModel {
  spotId: number;
  hostId: number;
  longitude: number;
  latitude: number;
  pricePerHour: number;
  carType: CarTypeEnums;
  title: string;
  mainDescription: string;
  status: StatusEnums;
  overallRating: number;
  location: LocationViewModel;
  amenities: string[];
  isFavorite: boolean;
  images: string[];
  disabledDateTimes: DisabledDateTimesModel[]
  reviews: ReviewViewModel[]
}

export interface ParkingSpotDTOModel {
  spot_id: number;
  host_id: number;
  longitude: number;
  latitude: number;
  price_per_hour: number;
  car_type: CarTypeEnums;
  title: string;
  main_description: string;
  status: StatusEnums;
  created_at: string;
  updated_at: string;
  overall_rating: number;
  location: LocationDTOModel;
  amenities: string[];
  is_favorite: boolean;
}

export interface LocationDTOModel {
  city: string;
  district: string;
  address: string;
}

export interface LocationViewModel {
  city: string;
  district: string;
  address: string;
}

export interface DisabledDateTimesModel {
  date: string;
  hours: number[]
}

export interface ParkingSpotDTOModel {

}

export interface AmenitiesFilterModel {
  label: string;
  value: string
  isSelected: boolean;
}

export interface ReviewViewModel {
  userFirstName: string;
  userUsageTime: string
  title: string;
  rating: number;
  comment: string;
  creationDate: string;
}

export interface ReservationViewModel {
  spotId: number;
  startTime: string;
  endTime: string;
}

export interface ReservationDTOModel {
  spot_id: number;
  start_time: string;
  end_time: string;
}
