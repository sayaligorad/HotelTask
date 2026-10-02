export interface BookingSummary {
  confirmed: number;
  onRequest: number;
  nextBookingDate: string;
  monthly: number[]; // 12 values, Jan..Dec
}
