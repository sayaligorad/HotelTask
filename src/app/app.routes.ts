import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ClassificationComponent } from './components/classification/classification.component';
import { FinanceComponent } from './components/finance/finance.component';
import { HomeTabComponent } from './components/home-tab/home-tab.component';
import { HotelHomeComponent } from './components/hotel-home/hotel-home.component';
import { HotelSearchComponent } from './components/hotel-search/hotel-search.component';
import { NotesComponent } from './components/notes/notes.component';
import { ProductsComponent } from './components/products/products.component';
import { TermsComponent } from './components/terms/terms.component';
import { hotelResolver } from './resolvers/hotel.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'hotels', pathMatch: 'full' },
  { path: 'hotels', component: HotelSearchComponent },
  {
    path: 'hotels/:id',
    component: HotelHomeComponent,
    resolve: { hotel: hotelResolver },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeTabComponent },
      { path: 'about', component: AboutComponent },
      { path: 'classification', component: ClassificationComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'terms', component: TermsComponent },
      { path: 'finance', component: FinanceComponent },
      { path: 'notes', component: NotesComponent },
    ],
  },
  { path: '**', redirectTo: 'hotels' },
];
