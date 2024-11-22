import {
  LocationDTOModel, LocationViewModel,
  ParkingSpotDTOModel,
  ParkingSpotViewModel,
  ReservationDTOModel,
  ReservationViewModel
} from "../models/interfaces/parking-spots.model";

export class ParkingSpotMapper {

  public static fromReservationViewModelToDTOModel(reservation: ReservationViewModel): ReservationDTOModel {
    return {
      spot_id: reservation.spotId,
      start_time: reservation.startTime,
      end_time: reservation.endTime
    }
  }

  public static fromLocationDtoToViewModel(location: LocationDTOModel): LocationViewModel {
    return {
      city: location.city,
      district: location.district,
      address: location.address
    }
  }

  public static fromParkingSpotsDtoToViewModel(parkingSpots: ParkingSpotDTOModel[]): ParkingSpotViewModel[] {
    return parkingSpots.map(parkingSpot => {
      return {
        spotId: parkingSpot.spot_id,
        hostId: parkingSpot.host_id,
        longitude: parkingSpot.longitude,
        latitude: parkingSpot.latitude,
        pricePerHour: parkingSpot.price_per_hour,
        carType: parkingSpot.car_type,
        title: parkingSpot.title,
        mainDescription: parkingSpot.main_description,
        status: parkingSpot.status,
        overallRating: parkingSpot.overall_rating,
        location: this.fromLocationDtoToViewModel(parkingSpot.location),
        amenities: parkingSpot.amenities,
        isFavorite: parkingSpot.is_favorite,
        images: [
          'assets/images/test.png',
          'assets/images/test2.png',
          'assets/images/test.png',
          'assets/images/test2.png',
          'assets/images/test.png',
          'assets/images/test2.png'
        ],
        reviews: [
          {
            userFirstName: "User 1",
            userUsageTime: "3 months",
            rating: 4.6,
            comment: "Amazing spot",
            creationDate: "2 weeks ago",
            title: "Test"
          },
          {
            userFirstName: "User 2",
            userUsageTime: "1 year",
            rating: 2.2,
            comment: "Amazing spot",
            creationDate: "3 years ago",
            title: "Test"
          },
          {
            userFirstName: "User 2",
            userUsageTime: "2 years",
            rating: 3.5,
            comment: "Average spot",
            creationDate: "4 months ago",
            title: "Test"
          }
        ],
        disabledDateTimes: [
          { date: '2024-11-19', hours: [9, 10, 11] },
          { date: '2024-11-20', hours: [15, 16] },
          { date: '2024-11-21', hours: [] },
        ]
      }
    })
  }
}
