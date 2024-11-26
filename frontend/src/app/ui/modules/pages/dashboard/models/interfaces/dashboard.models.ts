export interface DashboardDTOModel {
  first_name: string;
  cancelledBookings: string[]
  completedBookings: BookingsDTOModel[]
  favoriteSpots: FavoriteSpotsDTOModel[]
  upcomingBookings: BookingsDTOModel[]
}

export interface BookingsDTOModel {
  booking_id: number;
  guest_id: number;
  spot_id: number;
  start_time: string;
  end_time: string;
  status: string;
  total_price: string;
  created_at: string;
  is_reviewed?: boolean;
  spotDetails: SpotDetailsDTOModel
}


export interface SpotDetailsDTOModel {
  spot_id: number;
  host_id: number;
  car_type: string;
  title: string;
  main_description: string;
  longitude: number;
  latitude: number;
  price_per_hour: number;
  overall_rating: number;
  status: string;
}

export interface FavoriteSpotsDTOModel {
  spot_id: number;
  host_id: number;
  car_type: string;
  title: string;
  main_description: string;
  longitude: number;
  latitude: number;
  price_per_hour: number;
  overall_rating: number;
  status: string;
}

export interface DashboardViewModel {
  firstName: string;
  cancelledBookings: string[];
  completedBookings: BookingsViewModel[];
  favoriteSpots: FavoriteSpotsViewModel[];
  upcomingBookings: BookingsViewModel[];
}

export interface BookingsViewModel {
  bookingId: number;
  guestId: number;
  spotId: number;
  startTime: string;
  endTime: string;
  status: string;
  totalPrice: string;
  createdAt: string;
  isReviewed?: boolean;
  spotDetails: SpotDetailsViewModel;
}

export interface SpotDetailsViewModel {
  spotId: number;
  hostId: number;
  carType: string;
  title: string;
  mainDescription: string;
  longitude: number;
  latitude: number;
  pricePerHour: number;
  overallRating: number;
  status: string;
}

export interface FavoriteSpotsViewModel {
  spotId: number;
  hostId: number;
  carType: string;
  title: string;
  mainDescription: string;
  longitude: number;
  latitude: number;
  pricePerHour: number;
  overallRating: number;
  status: string;
}



