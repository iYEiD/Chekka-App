import {
  BookingsDTOModel, BookingsViewModel, DashboardDTOModel, DashboardViewModel,
  FavoriteSpotsDTOModel,
  FavoriteSpotsViewModel,
  SpotDetailsDTOModel,
  SpotDetailsViewModel
} from "../models/interfaces/dashboard.models";
import {ParkingSpotMapper} from "../../parking-spots/mappers/parking-spot.mapper";

export class DashboardMapper {
  public static fromSpotDetailsDTOToViewModel(dto: SpotDetailsDTOModel): SpotDetailsViewModel {
    return {
      spotId: dto.spot_id,
      hostId: dto.host_id,
      carType: dto.car_type,
      title: dto.title,
      mainDescription: dto.main_description,
      longitude: dto.longitude,
      latitude: dto.latitude,
      pricePerHour: dto.price_per_hour,
      overallRating: dto.overall_rating,
      status: dto.status,
      location: ParkingSpotMapper.fromLocationDtoToViewModel(dto.location)
    };
  }

  public static fromFavoriteSpotsDTOToViewModel(dtoList: FavoriteSpotsDTOModel[]): FavoriteSpotsViewModel[] {
    return dtoList.map(dto => ({
      spotId: dto.spot_id,
      hostId: dto.host_id,
      carType: dto.car_type,
      title: dto.title,
      mainDescription: dto.main_description,
      longitude: dto.longitude,
      latitude: dto.latitude,
      pricePerHour: dto.price_per_hour,
      overallRating: dto.overall_rating,
      status: dto.status,
      location: ParkingSpotMapper.fromLocationDtoToViewModel(dto.location)
    }));
  }

  public static fromBookingsDTOToViewModel(dtoList: BookingsDTOModel[]): BookingsViewModel[] {
    return dtoList.map(dto => {
      return {
        bookingId: dto.booking_id,
        guestId: dto.guest_id,
        spotId: dto.spot_id,
        startTime: dto.start_time,
        endTime: dto.end_time,
        status: dto.status,
        totalPrice: dto.total_price,
        createdAt: dto.created_at,
        isReviewed: dto.is_reviewed,
        spotDetails: this.fromSpotDetailsDTOToViewModel(dto.spotDetails),
      }
    });
  }

  public static fromDashboardDTOToViewModel(dto: DashboardDTOModel): DashboardViewModel {
    return {
      firstName: dto.first_name,
      cancelledBookings: dto.cancelledBookings,
      completedBookings: this.fromBookingsDTOToViewModel(dto.completedBookings),
      favoriteSpots: this.fromFavoriteSpotsDTOToViewModel(dto.favoriteSpots),
      upcomingBookings: this.fromBookingsDTOToViewModel(dto.upcomingBookings),
      currentBookings: this.fromBookingsDTOToViewModel(dto.currentBookings),
    };
  }
}
