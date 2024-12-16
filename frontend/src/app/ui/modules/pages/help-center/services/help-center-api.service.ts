import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {GetTicketsResponseDtoModel, SubmitTicketModel} from "../models/interfaces/ticket.models";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HelpCenterApiService {
  http = inject(HttpClient)
  baseURL = `${environment.backendUrl}/user/help-center`;
  ticketUrl = `${this.baseURL}/tickets`

  constructor() { }

  getTickets(): Observable<GetTicketsResponseDtoModel> {
    return this.http.get<GetTicketsResponseDtoModel>(this.ticketUrl)
  }

  submitTicket(ticket: SubmitTicketModel): Observable<any> {
    console.log(ticket)
    return this.http.post(this.ticketUrl, ticket)
  }

  markTicketAsSeen(ticketId: number): Observable<any> {
    let updatedTicketUrl = `${this.ticketUrl}/${ticketId}`;
    return this.http.put(updatedTicketUrl, null)
  }
}
