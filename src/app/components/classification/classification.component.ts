import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from '../../models/Hotel';

@Component({
  selector: 'app-classification',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="panel-card">
      <h6>Classification</h6>
      <ul class="mb-0">
        <li>Hotel type: {{ hotel.hotelType }}</li>
        <li>Provider: {{ hotel.provider }}</li>
        <li>Short name: {{ hotel.shortName }}</li>
      </ul>
    </div>
  `,
})
export class ClassificationComponent {
  hotel = inject(ActivatedRoute).snapshot.data['hotel'] as Hotel;
}
