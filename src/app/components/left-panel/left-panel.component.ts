import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hotel } from '../../models/Hotel';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './left-panel.component.html',
})
export class LeftPanelComponent {
  @Input() hotel!: Hotel;

  private hotelService = inject(HotelService);

  hotelTypes = ['Luxury', 'Business', 'Boutique', 'Resort', 'Premium'];
  fallbackImage =
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80';
  imgFailed = false;

  editAddress = false;
  editBasic = false;
  message = '';
  errorMessage = '';

  // form values while editing
  addressData = { address: '', state: '', country: '', pincode: '', email: '', phone: '' };
  basicData = { shortName: '', hotelType: '', currency: '', location: '' };

  // validation messages (key = field name)
  addressErrors: Record<string, string> = {};
  basicErrors: Record<string, string> = {};

  // ---------------- ADDRESS ----------------
  startEditAddress(): void {
    this.addressData = {
      address: this.hotel.address,
      state: this.hotel.state,
      country: this.hotel.country,
      pincode: this.hotel.pincode,
      email: this.hotel.email,
      phone: this.hotel.phone,
    };
    this.addressErrors = {};
    this.errorMessage = '';
    this.editAddress = true;
  }

  cancelAddress(): void {
    this.editAddress = false;
    this.addressErrors = {};
  }

  validateAddress(): boolean {
    const d = this.addressData;
    const errors: Record<string, string> = {};

    if (!d.address.trim()) errors['address'] = 'Street is required';
    if (!d.state.trim()) errors['state'] = 'State is required';
    if (!d.country.trim()) errors['country'] = 'Country is required';

    if (!d.pincode.trim()) errors['pincode'] = 'Pincode is required';
    else if (!/^\d{6}$/.test(d.pincode.trim())) errors['pincode'] = 'Pincode must be 6 digits';

    if (!d.email.trim()) errors['email'] = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) errors['email'] = 'Enter a valid email';

    if (!d.phone.trim()) errors['phone'] = 'Phone number is required';
    else if (!/^\d{10}$/.test(d.phone.trim())) errors['phone'] = 'Phone number must be 10 digits';

    this.addressErrors = errors;
    return Object.keys(errors).length === 0;
  }

  saveAddress(): void {
    if (!this.validateAddress()) {
      return;
    }
    const d = this.addressData;
    const changes = {
      address: d.address.trim(),
      state: d.state.trim(),
      country: d.country.trim(),
      pincode: d.pincode.trim(),
      email: d.email.trim(),
      phone: d.phone.trim(),
    };
    this.save(changes, () => (this.editAddress = false));
  }

  // ---------------- BASIC INFO ----------------
  startEditBasic(): void {
    this.basicData = {
      shortName: this.hotel.shortName,
      hotelType: this.hotel.hotelType,
      currency: this.hotel.currency,
      location: this.hotel.location,
    };
    this.basicErrors = {};
    this.errorMessage = '';
    this.editBasic = true;
  }

  cancelBasic(): void {
    this.editBasic = false;
    this.basicErrors = {};
  }

  validateBasic(): boolean {
    const d = this.basicData;
    const errors: Record<string, string> = {};

    if (!d.shortName.trim()) errors['shortName'] = 'Short name is required';
    else if (d.shortName.trim().length > 10) errors['shortName'] = 'Maximum 10 characters';

    if (!d.hotelType) errors['hotelType'] = 'Select a hotel type';

    if (!d.currency.trim()) errors['currency'] = 'Currency is required';
    else if (!/^[A-Za-z]{3}$/.test(d.currency.trim())) errors['currency'] = 'Use 3 letters, e.g. INR';

    if (!d.location.trim()) errors['location'] = 'Location is required';

    this.basicErrors = errors;
    return Object.keys(errors).length === 0;
  }

  saveBasic(): void {
    if (!this.validateBasic()) {
      return;
    }
    const d = this.basicData;
    const changes = {
      shortName: d.shortName.trim(),
      hotelType: d.hotelType,
      currency: d.currency.trim().toUpperCase(),
      location: d.location.trim(),
    };
    this.save(changes, () => (this.editBasic = false));
  }

  // ---------------- COMMON SAVE ----------------
  private save(changes: Partial<Hotel>, onSuccess: () => void): void {
    this.hotelService.updateHotel(this.hotel.id, changes).subscribe({
      next: () => {
        // the service updates the same hotel object, so the screen refreshes itself
        this.errorMessage = '';
        this.message = 'Saved successfully';
        setTimeout(() => (this.message = ''), 2000);
        onSuccess();
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
      },
    });
  }
}