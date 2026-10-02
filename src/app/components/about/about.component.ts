import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from '../../models/Hotel';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="panel-card">
      <h6>About</h6>
      <p><strong>{{ hotel.name }}</strong> is a {{ hotel.hotelType }} hotel by {{ hotel.provider }}, located in {{ hotel.location }}, {{ hotel.state }}, {{ hotel.country }}.</p>
      <p class="mb-0">Contact: {{ hotel.email }} | {{ hotel.phone }}</p>
    </div>
  `,
})
export class AboutComponent {
  hotel = inject(ActivatedRoute).snapshot.data['hotel'] as Hotel;
}
