import {
  LocationDTOModel, LocationViewModel, ParkingSpotAvailabilityDTOModel, ParkingSpotAvailabilityViewModel,
  ParkingSpotDTOModel,
  ParkingSpotViewModel,
  ReservationDTOModel,
  ReservationViewModel, ReviewDTOModel, ReviewViewModel
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
    return parkingSpots.map(this.fromParkingSpotDtoToViewModel, this);
  }

  public static fromParkingSpotDtoToViewModel(parkingSpot: ParkingSpotDTOModel): ParkingSpotViewModel {
    return {
      spotId: parkingSpot.spot_id,
      hostId: parkingSpot.host_id,
      hostFirstname: parkingSpot.host_firstname,
      hostLastname: parkingSpot.host_lastname,
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
      disabledDateTimes: parkingSpot.disabledDateTimes ? parkingSpot.disabledDateTimes : [],
      reviews: parkingSpot.reviews ? this.fromReviewDtoToViewModel(parkingSpot.reviews) : [],
      availability: parkingSpot.availability ? this.fromAvailabilityDtoToViewModel(parkingSpot.availability) : [],
      images: [
        'assets/images/test.png',
        'assets/images/test2.png',
        'assets/images/test.png',
        'assets/images/test2.png',
        'assets/images/test.png',
        'assets/images/test2.png'
      ],
    }
  }

  public static fromReviewDtoToViewModel(reviews: ReviewDTOModel[]): ReviewViewModel[] {
    return reviews.map(review => {
      return {
        spotId: review.spot_id,
        userLastname: review.user_lastname,
        title: review.title,
        reviewId: review.review_id,
        comment: review.comment,
        rating: review.rating,
        bookingId: review.booking_id,
        createdAt: review.created_at,
        userFirstname: review.user_firstname,
        userId: review.user_id
      }
    })
  }

  public static fromAvailabilityDtoToViewModel(availabilities: ParkingSpotAvailabilityDTOModel[]): ParkingSpotAvailabilityViewModel[] {
    return availabilities.map(availability => {
      return {
        spot_id: availability.spot_id,
        availability_id: availability.availability_id,
        start_time: availability.start_time,
        end_time: availability.end_time,
        day: availability.day
      }
    })
  }
}
