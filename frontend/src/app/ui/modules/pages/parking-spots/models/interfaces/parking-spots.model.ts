import {CarTypeEnums, StatusEnums} from "../enums/parking-spots.enum";

export interface ParkingSpotViewModel {
  spotId: number;
  hostId: number;
  hostFirstname: string;
  hostLastname: string;
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
  availability?: ParkingSpotAvailabilityViewModel[]
  disabledDateTimes?: DisabledDateTimesModel[]
  reviews?: ReviewViewModel[]
}

export interface ParkingSpotDTOModel {
  spot_id: number;
  host_id: number;
  host_firstname: string;
  host_lastname: string;
  longitude: number;
  latitude: number;
  price_per_hour: number;
  car_type: CarTypeEnums;
  title: string;
  main_description: string;
  status: StatusEnums;
  overall_rating: number;
  location: LocationDTOModel;
  amenities: string[];
  is_favorite: boolean;
  availability: ParkingSpotAvailabilityDTOModel[]
  disabledDateTimes: DisabledDateTimesModel[]
  reviews: ReviewDTOModel[]
}

export interface ParkingSpotAvailabilityDTOModel {
  availability_id: number;
  day: number;
  end_time: string;
  spot_id: number;
  start_time: string
}

export interface ParkingSpotAvailabilityViewModel {
  availability_id: number;
  day: number;
  end_time: string;
  spot_id: number;
  start_time: string
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

export interface ReviewDTOModel {
  review_id: number;
  booking_id: number;
  spot_id: number;
  user_id: number;
  title: string;
  rating: number;
  comment: string;
  created_at: string;
  user_firstname: string;
  user_lastname: string
}

export interface ReviewViewModel {
  reviewId: number;
  bookingId: number;
  spotId: number;
  userId: number;
  title: string;
  rating: number;
  comment: string;
  createdAt: string;
  userFirstname: string;
  userLastname: string
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
