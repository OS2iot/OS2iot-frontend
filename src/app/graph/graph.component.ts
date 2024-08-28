import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { Chart, ChartConfiguration } from "chart.js";

const canvasId = "someGraph";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.scss"],
})
export class GraphComponent implements OnChanges {
  @Input() data: ChartConfiguration["data"];
  @Input() type: ChartConfiguration["type"];
  @Input() options: ChartConfiguration["options"] = {
    plugins: { legend: { display: false } },
    responsive: true,
    layout: {
      padding: {
        top: 15,
        left: 10,
        right: 10,
      },
    },
  };
  @Input() title: string;
  @Input() graphCardClass: string;
  @Input() graphHeaderClass: string;
  chartInstance: Chart = null;
  isGraphEmpty: boolean;

  @ViewChild(canvasId) chart: ElementRef<HTMLCanvasElement>;

  constructor() {
    this.isGraphEmpty = this.checkIfGraphIsEmpty();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.buildChart();
  }

  buildChart(): void {
    // Update the chart with (new) data. Destroying the chart and re-creating it seems the most stable.
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    if (!this.chart?.nativeElement) {
      return;
    }

    const options = this.buildOptionsForNoData(this.options);

    this.chartInstance = new Chart(this.chart.nativeElement.getContext("2d"), {
      data: this.data,
      type: this.type,
      options,
    });
  }

  private checkIfGraphIsEmpty(): boolean {
    // Currently, only the first dataset is checked for zeroes.
    return (
      !this.data?.datasets?.length ||
      (this.data.datasets.length === 1 &&
        !this.data.datasets[0].data.some(point => point !== null && point !== undefined))
    );
  }

  private buildOptionsForNoData(options: ChartConfiguration["options"]): typeof options {
    this.isGraphEmpty = this.checkIfGraphIsEmpty();

    return this.isGraphEmpty
      ? {
          ...options,
          scales: {
            ...options?.scales,
            x: {
              ...options?.scales?.x,
              display: false,
            },
            y: {
              ...options?.scales?.y,
              display: false,
            },
          },
        }
      : options;
  }
}
