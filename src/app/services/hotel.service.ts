import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  catchError,
  map,
  shareReplay,
  throwError
} from 'rxjs';

import { Hotel } from '../models/Hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private http = inject(HttpClient);

  private readonly url = 'assets/data/hotels.json';

  private hotels$: Observable<Hotel[]> = this.http
    .get<Hotel[]>(this.url)
    .pipe(
      catchError((error) => {
        console.error('Hotel JSON loading error:', error);

        return throwError(() =>
          new Error('Unable to load hotels. Please try again later.')
        );
      }),
      shareReplay(1)
    );

  getHotels(): Observable<Hotel[]> {
    return this.hotels$;
  }

  getHotelById(id: number): Observable<Hotel> {
    return this.getHotels().pipe(
      map((list: Hotel[]) => {
        const hotel = list.find(
          (h: Hotel) => h.id === id
        );

        if (!hotel) {
          throw new Error(
            `Hotel with id ${id} was not found.`
          );
        }

        return hotel;
      })
    );
  }

  updateHotel(
    id: number,
    changes: Partial<Hotel>
  ): Observable<Hotel> {

    return this.getHotelById(id).pipe(
      map((hotel: Hotel) => {
        Object.assign(hotel, changes);
        return hotel;
      })
    );
  }
}