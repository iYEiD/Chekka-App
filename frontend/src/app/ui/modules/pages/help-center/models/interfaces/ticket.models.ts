export interface SubmitTicketModel {
  title: string;
  description: string;
  type: string;
}

export interface TicketDtoModel {
  ticket_id: number,
  user_id: number,
  admin_id: number | null,
  type: string,
  title: string,
  status: string,
  description: string | null,
  response: string | null,
  created_at: string,
  updated_at: string
}

export interface TicketViewModel {
  ticketId: number,
  userId: number,
  adminId: number | null,
  type: string,
  title: string,
  status: string,
  description: string | null,
  response: string | null,
  createdAt: string,
  updatedAt: string
}

export interface GetTicketsResponseDtoModel {
  pendingTickets: TicketDtoModel[]
  seenTickets: TicketDtoModel[]
  doneTickets: TicketDtoModel[]
}

export interface GetTicketsResponseViewModel {
  pendingTickets: TicketViewModel[]
  seenTickets: TicketViewModel[]
  doneTickets: TicketViewModel[]
}
