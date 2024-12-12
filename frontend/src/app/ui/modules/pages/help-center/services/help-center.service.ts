import {inject, Injectable} from '@angular/core';
import {TicketModel} from "../models/interfaces/ticket.models";
import {HelpCenterApiService} from "./help-center-api.service";
import {SnackbarService} from "../../../../../services/snack-bar/services/snackbar.service";
import {SnackbarTypeEnums} from "../../../../../services/snack-bar/enum/snackbar-type.enums";

@Injectable({
  providedIn: 'root'
})
export class HelpCenterService {
  helpCenterApiService = inject(HelpCenterApiService)
  snackBarService = inject(SnackbarService)

  constructor() { }

  submitTicket(ticket: TicketModel) {
    this.helpCenterApiService.submitTicket(ticket).subscribe({
      next: res => {
        this.snackBarService.openSnackBar(SnackbarTypeEnums.SUCCESS, 'Ticket submitted successfully!')
      },
      error: err => {
        this.snackBarService.openSnackBar(SnackbarTypeEnums.ERROR, 'Error submitting ticket please try again later.')
      }
    })
  }
}
