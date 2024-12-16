import {Component, computed, inject, signal} from '@angular/core';
import {HelpCenterService} from "../services/help-center.service";
import {SnackbarService} from "../../../../../services/snack-bar/services/snackbar.service";
import {SnackbarTypeEnums} from "../../../../../services/snack-bar/enum/snackbar-type.enums";
import {TicketViewModel} from "../models/interfaces/ticket.models";
import {MainService} from "../../../main/services/main.service";

@Component({
  selector: 'app-help-center',
  standalone: false,
  templateUrl: './help-center.component.html',
  styleUrl: './help-center.component.scss'
})
export class HelpCenterComponent {
  helpCenterService = inject(HelpCenterService)
  snackBarService = inject(SnackbarService)
  mainService = inject(MainService)

  tickets = computed(() => {
    return this.helpCenterService.tickets()
  })

  isSubmitTicketModalVisible: boolean = false
  isViewTicketModalVisible: boolean = false

  ticketTitle = signal<string | null>(null)
  ticketContent = signal<string | null>(null)
  ticketType = signal<string | null>(null)
  transactionId = signal<number | null>(null)

  viewTicket = signal<TicketViewModel | null>(null)

  ngOnInit(): void {
    this.mainService.changeNavbarStatus()
    this.helpCenterService.getTickets()
  }

  submitTicket() {
    if (!this.ticketTitle() || !this.ticketContent() || !this.ticketType() ||
      (this.ticketType() && (this.ticketType() === "Refund" || this.ticketType() === "Cancellation") && !this.transactionId())) {
      this.snackBarService.openSnackBar(SnackbarTypeEnums.ERROR, 'Please fill all fields before submission')
    } else {
      this.helpCenterService.submitTicket({
        title: this.ticketTitle()!,
        description: this.ticketContent()!,
        type: this.ticketType()!
      })
      setTimeout(() => {
        this.helpCenterService.getTickets();
      }, 100);

      this.closeSubmitTicketModal()
    }
  }

  openSubmitTicketModal() {
    this.isSubmitTicketModalVisible = true
  }

  closeSubmitTicketModal() {
    this.isSubmitTicketModalVisible = false
  }

  openViewTicketModal(ticket: TicketViewModel) {
    this.viewTicket.set(ticket)
    if (ticket.status === "done") {
      this.helpCenterService.markTicketAsSeen(ticket.ticketId)
    }
    this.isViewTicketModalVisible = true
  }

  closeViewTicketModal() {
    this.isViewTicketModalVisible = false
    this.helpCenterService.getTickets()
  }
}
