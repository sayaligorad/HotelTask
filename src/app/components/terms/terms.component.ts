import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from '../../models/Hotel';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="panel-card">
      <h6>Terms</h6>
      <ul class="mb-0">
        <li>Check-in 2:00 PM, check-out 11:00 AM</li>
        <li>Free cancellation up to 48 hours before arrival</li>
        <li>Payments are settled in {{ hotel.currency }}</li>
      </ul>
    </div>
  `,
})
export class TermsComponent {
  hotel = inject(ActivatedRoute).snapshot.data['hotel'] as Hotel;
}
