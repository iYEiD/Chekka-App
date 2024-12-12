import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {TicketModel} from "../models/interfaces/ticket.models";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HelpCenterApiService {
  http = inject(HttpClient)
  baseURL = `${environment.backendUrl}/help-center`;
  submitTicketUrl = `${this.baseURL}/submit-ticket`

  constructor() { }

  submitTicket(ticket: TicketModel): Observable<any> {
    console.log(ticket)
    return this.http.post(this.submitTicketUrl, ticket)
  }
}
