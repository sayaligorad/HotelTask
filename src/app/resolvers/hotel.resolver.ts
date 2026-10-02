import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { Hotel } from '../models/Hotel';
import { HotelService } from '../services/hotel.service';

export const hotelResolver: ResolveFn<Hotel> = (route) => {
  const service = inject(HotelService);
  const router = inject(Router);
  const id = Number(route.paramMap.get('id'));

  return service.getHotelById(id).pipe(
    catchError((err: Error) => {
      // Cancel navigation and go back to search with an error message
      router.navigate(['/hotels'], { queryParams: { error: err.message } });
      return EMPTY;
    })
  );
};
