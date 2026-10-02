import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  template: `
    <div class="panel-card">
      <h6>Map</h6>
      <div #mapContainer style="height: 300px; width: 100%"></div>
    </div>
  `,
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @Input() latitude = 0;
  @Input() longitude = 0;
  @Input() name = '';
  @ViewChild('mapContainer') container!: ElementRef<HTMLDivElement>;

  private map?: L.Map;

  ngAfterViewInit(): void {
    this.map = L.map(this.container.nativeElement).setView([this.latitude, this.longitude], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // Default marker images break with bundlers, so point to the CDN
    const icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    L.marker([this.latitude, this.longitude], { icon }).addTo(this.map).bindPopup(this.name);

    setTimeout(() => this.map?.invalidateSize(), 0);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
