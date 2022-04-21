import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';

// TODO: Create chart module and register any necessary stuff there
// You can register everything with a one-liner: https://www.chartjs.org/docs/latest/getting-started/integration.html
// Registering everything will increase the application size.
// It may ease development, however.
Chart.register(
  // ...registerables
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-my-line-chart',
  templateUrl: './my-line-chart.component.html',
  styleUrls: ['./my-line-chart.component.scss'],
})
export class MyLineChartComponent implements AfterViewInit {
  @ViewChild('myLineChart') chart: ElementRef<HTMLCanvasElement>;

  constructor() {}

  ngAfterViewInit(): void {
    if (this.chart?.nativeElement) {
      console.log('Setting chart up');

      const myChart = new Chart(this.chart.nativeElement, {
        data: {
          datasets: [
            {
              data: [65, 59, 80, 81, 56, 55, 40],
              label: 'Series A',
              borderColor: 'rgb(255, 99, 132)',
            },
          ],
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
          ],
        },
        type: 'line',
        options: {
          responsive: true,
        },
      });
    }
  }
}
