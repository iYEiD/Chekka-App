import {Component, inject, signal} from '@angular/core';
import {HelpCenterService} from "../services/help-center.service";
import {SnackbarService} from "../../../../../services/snack-bar/services/snackbar.service";
import {SnackbarTypeEnums} from "../../../../../services/snack-bar/enum/snackbar-type.enums";

@Component({
  selector: 'app-help-center',
  standalone: false,
  templateUrl: './help-center.component.html',
  styleUrl: './help-center.component.scss'
})
export class HelpCenterComponent {
  helpCenterService = inject(HelpCenterService)
  snackBarService = inject(SnackbarService)

  ticketTitle = signal<string | null>(null)
  ticketContent = signal<string | null>(null)
  ticketType = signal<string | null>(null)

  ticketTypeOptions = ['refund', 'payment']

  onTicketTypeChange(value: string): void {
    this.ticketType.set(value);
  }

  submitTicket() {
    if (!this.ticketTitle() || !this.ticketContent() || !this.ticketType()) {
      this.snackBarService.openSnackBar(SnackbarTypeEnums.ERROR, 'Please fill all fields before submission')
    } else {
      this.helpCenterService.submitTicket({
        title: this.ticketTitle()!,
        content: this.ticketContent()!,
        type: this.ticketType()!
      })
    }
  }
}
