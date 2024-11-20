import {ReservationDTOModel, ReservationViewModel} from "../models/interfaces/parking-spots.model";

export class ParkingSpotMapper {

  public static fromReservationViewModelToDTOModel(reservation: ReservationViewModel): ReservationDTOModel {
    return {
      spot_id: reservation.spotId,
      start_time: reservation.startTime,
      end_time: reservation.endTime
    }
  }
}
