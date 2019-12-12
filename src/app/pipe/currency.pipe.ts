import { Pipe, PipeTransform } from '@angular/core';
import { Currency, Ticket } from '../interfaces';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number, ticket: Ticket, currency: Currency): any {
    return Math.round(ticket.price * currency.rate);
  }

}
