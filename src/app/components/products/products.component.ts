import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from '../../models/Hotel';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="panel-card">
      <h6>Products</h6>
      <ul class="mb-0">
        <li>Accommodation - Standard Room</li>
        <li>Accommodation - Deluxe Room</li>
        <li>Accommodation - Suite</li>
      </ul>
    </div>
  `,
})
export class ProductsComponent {
  hotel = inject(ActivatedRoute).snapshot.data['hotel'] as Hotel;
}
