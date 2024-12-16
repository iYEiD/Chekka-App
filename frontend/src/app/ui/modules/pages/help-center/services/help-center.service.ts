import {inject, Injectable, signal} from '@angular/core';
import {GetTicketsResponseViewModel, SubmitTicketModel} from "../models/interfaces/ticket.models";
import {HelpCenterApiService} from "./help-center-api.service";
import {SnackbarService} from "../../../../../services/snack-bar/services/snackbar.service";
import {SnackbarTypeEnums} from "../../../../../services/snack-bar/enum/snackbar-type.enums";
import {HelpCenterMapper} from "../mapper/help-center.mapper";

@Injectable({
  providedIn: 'root'
})
export class HelpCenterService {
  helpCenterApiService = inject(HelpCenterApiService)
  snackBarService = inject(SnackbarService)
  tickets = signal<GetTicketsResponseViewModel | null>(null)

  constructor() { }

  submitTicket(ticket: SubmitTicketModel) {
    this.helpCenterApiService.submitTicket(ticket).subscribe({
      next: res => {
        this.snackBarService.openSnackBar(SnackbarTypeEnums.SUCCESS, 'Ticket submitted successfully!')
      },
      error: err => {
        this.snackBarService.openSnackBar(SnackbarTypeEnums.ERROR, 'Error submitting ticket please try again later.')
      }
    })
  }

  getTickets() {
    this.helpCenterApiService.getTickets().subscribe({
      next: res => {
        this.tickets.set(HelpCenterMapper.fromGetTicketResponseDtoToViewModel(res))
      }
    })
  }

  markTicketAsSeen(ticketId: number) {
    this.helpCenterApiService.markTicketAsSeen(ticketId).subscribe({
      next: res => {
        console.log("ticket set as seen")
      }
    })
  }
}
