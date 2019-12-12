import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private _http: HttpClient) {
  }

  retrieveTicketsList(): Observable<Ticket[]> {
    return this._http.get('../assets/tickets.json')
      .pipe(map((res: {tickets: Ticket[]}) => res.tickets));
  }
}
