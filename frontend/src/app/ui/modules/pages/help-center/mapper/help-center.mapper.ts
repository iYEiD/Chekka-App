import {
  GetTicketsResponseDtoModel,
  GetTicketsResponseViewModel,
  TicketDtoModel, TicketViewModel
} from "../models/interfaces/ticket.models";

export class HelpCenterMapper {
  public static fromGetTicketResponseDtoToViewModel(response: GetTicketsResponseDtoModel): GetTicketsResponseViewModel {
    return {
      pendingTickets: this.fromTicketDtoToViewModel(response.pendingTickets),
      doneTickets: this.fromTicketDtoToViewModel(response.doneTickets),
      seenTickets: this.fromTicketDtoToViewModel(response.seenTickets)
    }
  }

  public static fromTicketDtoToViewModel(tickets: TicketDtoModel[]): TicketViewModel[] {
    return tickets.map(ticket => {
      return {
        adminId: ticket.admin_id,
        ticketId: ticket.ticket_id,
        createdAt: ticket.created_at,
        status: ticket.status,
        title: ticket.title,
        response: ticket.response,
        description: ticket.description,
        type: ticket.type,
        updatedAt: ticket.updated_at,
        userId: ticket.user_id
      }
    })
  }
}
