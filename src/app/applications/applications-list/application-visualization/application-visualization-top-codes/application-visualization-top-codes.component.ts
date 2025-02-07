import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Chart, registerables } from "chart.js";

interface RESTCode {
  status: string;
  color: string;
}

Chart.register(...registerables);

const codes: RESTCode[] = [
  { status: "200 OK", color: "green" },
  { status: "201 Created", color: "blue" },
  { status: "400 Bad Request", color: "yellow" },
  { status: "401 Unauthorized", color: "red" },
  { status: "403 Forbidden", color: "red" },
  { status: "404 Not Found", color: "orange" },
  { status: "500 Internal Server Error", color: "darkred" },
];

@Component({
  selector: "app-application-visualization-top-codes",
  standalone: true,
  templateUrl: "./application-visualization-top-codes.component.html",
  styleUrls: ["./application-visualization-top-codes.component.scss"],
})
export class ApplicationVisualizationTopCodesComponent implements OnInit {
  @ViewChild("chartCanvas", { static: true }) chartCanvas!: ElementRef;
  public chart!: any;
  public legendData = codes; // Store legend data for use in template

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: codes.map(c => c.status), // Use status as labels
        datasets: [
          {
            data: [300, 240, 100, 432, 253, 34, 150], // Sample values
            backgroundColor: codes.map(c => c.color), // Use colors from the array
            borderWidth: 0, // Remove line separation
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false }, // Hide default legend
        },
      },
    });
  }
}
