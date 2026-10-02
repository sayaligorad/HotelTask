import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from '../../models/Hotel';

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="panel-card">
      <h6>Finance</h6>
      <p>Total amount to be paid:
        <strong>{{ hotel.totalAmount | currency: hotel.currency : "symbol" : "1.0-0" }}</strong></p>
      <p class="mb-0">Currency: {{ hotel.currency }}</p>
    </div>
  `,
})
export class FinanceComponent {
  hotel = inject(ActivatedRoute).snapshot.data['hotel'] as Hotel;
}
