import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-booking-chart',
  standalone: true,
  template: `
    <div class="panel-card">
      <h6>Bookings Overview</h6>
      <canvas #chartCanvas></canvas>
      <div class="text-center small text-muted">{{ year }}</div>
    </div>
  `,
})
export class BookingChartComponent implements AfterViewInit, OnDestroy {
  @Input() data: number[] = [];
  @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>;

  year = new Date().getFullYear();
  private chart?: Chart;

  ngAfterViewInit(): void {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{ label: 'Bookings', data: this.data, backgroundColor: '#0d6efd' }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
