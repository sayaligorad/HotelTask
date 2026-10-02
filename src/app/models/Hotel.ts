export interface Hotel {
  id: number;
  name: string;
  provider: string;
  address: string;
  state: string;
  country: string;
  pincode: string;
  email: string;
  phone: string;
  shortName: string;
  hotelType: string;
  currency: string;
  location: string;
  latitude: number;
  longitude: number;
  lastUsedDate: string;
  nextBookingDate: string;
  bookingConfirmed: number;
  bookingOnRequest: number;
  openComplaints: number;
  totalComplaints: number;
  totalAmount: number;
  imageUrl: string;
  monthlyBookings: number[];
}
