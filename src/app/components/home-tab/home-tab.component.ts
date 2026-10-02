import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookingSummary } from '../../models/booking';
import { ComplaintSummary } from '../../models/complaint';
import { Hotel } from '../../models/Hotel';

import { BookingChartComponent } from '../booking-chart/booking-chart.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-home-tab',
  standalone: true,
  imports: [
    DatePipe,
    CurrencyPipe,
    BookingChartComponent,
    MapComponent
  ],
  templateUrl: './home-tab.component.html'
})
export class HomeTabComponent {

  hotel = inject(ActivatedRoute).snapshot.data['hotel'] as Hotel;

  booking: BookingSummary = {
    confirmed: this.hotel.bookingConfirmed,
    onRequest: this.hotel.bookingOnRequest,
    nextBookingDate: this.hotel.nextBookingDate,
    monthly: this.hotel.monthlyBookings
  };

  complaint: ComplaintSummary = {
    open: this.hotel.openComplaints,
    total: this.hotel.totalComplaints
  };
}