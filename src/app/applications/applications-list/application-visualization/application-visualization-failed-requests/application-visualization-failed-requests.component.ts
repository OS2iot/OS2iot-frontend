import { Component } from "@angular/core";
import { ChartOptions } from "chart.js";
interface RESTCode {
  status: string;
  color: string;
}

const codes: RESTCode[] = [
  {
    status: "200 OK",
    color: "green",
  },
  {
    status: "201 Created",
    color: "blue",
  },
  {
    status: "400 Bad Request",
    color: "yellow",
  },
  {
    status: "401 Unauthorized",
    color: "red",
  },
  {
    status: "403 Forbidden",
    color: "red",
  },
  {
    status: "404 Not Found",
    color: "orange",
  },
  {
    status: "500 Internal Server Error",
    color: "dark red",
  },
];

@Component({
  selector: "app-application-visualization-failed-requests",
  standalone: true,
  imports: [],
  templateUrl: "./application-visualization-failed-requests.component.html",
  styleUrl: "./application-visualization-failed-requests.component.scss",
})
export class ApplicationVisualizationFailedRequestsComponent {
  public chartData: any;
  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Tidsrum",
        },
      },
      y: {
        title: {
          display: true,
          text: "Antal forespørgsler",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  constructor() {
    this.chartData = {
      labels: ["08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30"],
      datasets: [
        {
          label: "Antal forespørgsler",
          data: [40, 35, 38, 36, 34, 33, 37], // Example data
          borderColor: "green",
          borderWidth: 2,
          borderDash: [5, 5], // Dashed line
          fill: false,
          type: "line",
          pointRadius: 4,
        },
        {
          label: "Fejlede forespørgsler",
          data: [20, 18, 2, 3, 10, 2, 1], // Example failed requests
          backgroundColor: "red",
          stack: "requests",
          type: "bar",
        },
        {
          label: "Succesfulde forespørgsler",
          data: [20, 17, 36, 33, 24, 31, 36], // Derived from total - failed
          backgroundColor: "green",
          stack: "requests",
          type: "bar",
        },
      ],
    };
  }
}
