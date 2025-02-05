import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
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
export class ApplicationVisualizationFailedRequestsComponent implements OnInit {
  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart("requestChart", {
      type: "doughnut", //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: ["Red", "Pink", "Green", "Yellow", "Orange", "Blue"],
        datasets: [
          {
            label: "My First Dataset",

            data: [300, 240, 100, 432, 253, 34],
            backgroundColor: ["200 OK", "201 Created", "400 Bad Request", "yellow", "orange", "blue"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
