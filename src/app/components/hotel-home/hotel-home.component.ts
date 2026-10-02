import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Hotel } from '../../models/Hotel';
import { MenuItem } from '../../shared/interfaces/menu-item';
import { LeftPanelComponent } from '../left-panel/left-panel.component';

@Component({
  selector: 'app-hotel-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LeftPanelComponent],
  templateUrl: './hotel-home.component.html',
})
export class HotelHomeComponent {
  // Data is already loaded by hotelResolver before this component renders
  hotel = inject(ActivatedRoute).snapshot.data['hotel'] as Hotel;

  menus: MenuItem[] = [
    { label: 'Home', path: 'home' },
    { label: 'About', path: 'about' },
    { label: 'Classification', path: 'classification' },
    { label: 'Products', path: 'products' },
    { label: 'Terms', path: 'terms' },
    { label: 'Finance', path: 'finance' },
    { label: 'Notes', path: 'notes' },
  ];
}
