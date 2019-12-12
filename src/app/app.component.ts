import { Component, OnDestroy, OnInit } from '@angular/core';
import { TicketsService } from './services';
import { Currency, Filter, Ticket } from './interfaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Currencies, FilterLabels } from './enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {

  ticketsCopy: Ticket[] = [];
  filters: Filter[] = [
    new Filter(FilterLabels.ALL, -1),
    new Filter(FilterLabels.WITHOUT_TRANSFERS, 0),
    new Filter(FilterLabels.ONE_TRANSFER, 1),
    new Filter(FilterLabels.TWO_TRANSFERS, 2),
    new Filter(FilterLabels.THREE_TRANSFERS, 3),
  ];
  currencies: Currency[] = [
    new Currency(Currencies.RUB, 1, '₽'),
    new Currency(Currencies.USD, 0.016, '$'),
    new Currency(Currencies.EUR, 0.014, '€'),
  ];
  selectedCurrency: Currency = this.currencies[0];

  private _originalTickets: Ticket[] = [];
  private _unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private _ticketsService: TicketsService,
  ) {
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit(): void {
    this._retrieveTicketsList();
  }

  filterChanged(filter: Filter): void {
    if (filter.label === FilterLabels.ALL) {
      this.filters.forEach(item => item.checked = filter.checked);
      this.ticketsCopy = this._originalTickets;
    } else {
      const checkedFilters = this.filters.some(value => value.checked);

      this.filters.find((item: Filter) => {
        return item.label === FilterLabels.ALL;
      }).checked = false;

      if (checkedFilters) {
        this.ticketsCopy = this._originalTickets.filter((ticket: Ticket) => {
          return this.filters.some((filterItem: Filter) => {
            return filterItem.checked && filterItem.stops === ticket.stops;
          });
        });
      } else {
        this.ticketsCopy = this._originalTickets;
      }
    }
  }

  private _retrieveTicketsList(): void {
    this._ticketsService.retrieveTicketsList()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res: Ticket[]) => {
        this.ticketsCopy = this._originalTickets = res;
      });
  }
}
