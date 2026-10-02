import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Hotel } from '../../models/Hotel';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-hotel-search',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './hotel-search.component.html',
})
export class HotelSearchComponent implements OnInit {

  private hotelService = inject(HotelService);
  private route = inject(ActivatedRoute);

  allHotels: Hotel[] = [];
  filtered: Hotel[] = [];
  paged: Hotel[] = [];
  pages: number[] = [];

  searchText = '';
  page = 1;
  readonly pageSize = 20;

  loading = true;
  error = '';

  ngOnInit(): void {

    // Error sent by the resolver (e.g. hotel not found)
    this.error =
      this.route.snapshot.queryParamMap.get('error') ?? '';

    this.hotelService.getHotels().subscribe({

      next: (list) => {
        this.allHotels = list;
        this.search();
        this.loading = false;
      },

      error: (err: Error) => {
        this.error = err.message;
        this.loading = false;
      },

    });
  }

  search(): void {

    const text = this.searchText.trim().toLowerCase();

    this.filtered = text
      ? this.allHotels.filter((h) =>
          h.name.toLowerCase().includes(text)
        )
      : [...this.allHotels];

    this.goToPage(1);
  }

  reset(): void {
    this.searchText = '';
    this.search();
  }

  goToPage(p: number): void {

    const totalPages = Math.max(
      1,
      Math.ceil(this.filtered.length / this.pageSize)
    );

    this.page = Math.min(
      Math.max(p, 1),
      totalPages
    );

    this.pages = Array.from(
      { length: totalPages },
      (_, i) => i + 1
    );

    const start =
      (this.page - 1) * this.pageSize;

    this.paged = this.filtered.slice(
      start,
      start + this.pageSize
    );
  }
}