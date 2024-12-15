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
      currentBookings: [
        {
          "bookingId": 100,
          "guestId": 105,
          "spotId": 100,
          "startTime": "2024-12-13 08:00:00",
          "endTime": "2024-12-13 20:00:00",
          "status": "accepted",
          "totalPrice": "20.00",
          "createdAt": "2024-12-14 15:01:35",
          "isReviewed": false,
          "spotDetails": {
            "spotId": 100,
            "hostId": 106,
            "carType": "2wheeler",
            "title": "Beirut Downtown Parking Spot",
            "mainDescription": "A great spot in downtown Beirut.",
            "longitude": 35.9144900192,
            "latitude": 34.4240909846,
            "pricePerHour": 10,
            "overallRating": 4.5,
            "status": "approved",
            "location": {
              "city": "Beirut",
              "district": "Downtown",
              "address": "Beirut Downtown"
            }
          }
        },
        {
          "bookingId": 101,
          "guestId": 105,
          "spotId": 100,
          "startTime": "2024-12-12 08:00:00",
          "endTime": "2024-12-12 20:00:00",
          "status": "accepted",
          "totalPrice": "20.00",
          "createdAt": "2024-12-14 15:01:35",
          "isReviewed": false,
          "spotDetails": {
            "spotId": 100,
            "hostId": 106,
            "carType": "2wheeler",
            "title": "Beirut Downtown Parking Spot",
            "mainDescription": "A great spot in downtown Beirut.",
            "longitude": 35.9144900192,
            "latitude": 34.4240909846,
            "pricePerHour": 10,
            "overallRating": 4.5,
            "status": "approved",
            "location": {
              "city": "Beirut",
              "district": "Downtown",
              "address": "Beirut Downtown"
            }
          }
        },
        {
          "bookingId": 107,
          "guestId": 105,
          "spotId": 103,
          "startTime": "2024-12-14 13:01:35",
          "endTime": "2024-12-14 15:01:35",
          "status": "accepted",
          "totalPrice": "90.00",
          "createdAt": "2024-12-14 15:01:35",
          "isReviewed": false,
          "spotDetails": {
            "spotId": 103,
            "hostId": 106,
            "carType": "2wheeler",
            "title": "Byblos Central Parking Spot",
            "mainDescription": "Affordable spot in central Byblos.",
            "longitude": 35.2278445214,
            "latitude": 33.1963688899,
            "pricePerHour": 8,
            "overallRating": 4.6,
            "status": "approved",
            "location": {
              "city": "Byblos",
              "district": "Downtown",
              "address": "Byblos Downtown"
            }
          }
        }
      ],
      pendingBookings: this.fromBookingsDTOToViewModel(dto.pendingBookings),
      rejectedBookings: this.fromBookingsDTOToViewModel(dto.rejectedBookings)
    };
  }
}
