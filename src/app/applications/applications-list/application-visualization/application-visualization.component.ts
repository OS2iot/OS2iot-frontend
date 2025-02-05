import { Component } from "@angular/core";
import { ApplicationVisualizationFailedRequestsComponent } from "./application-visualization-failed-requests/application-visualization-failed-requests.component";
import { ApplicationVisualizationTopCodesComponent } from "./application-visualization-top-codes/application-visualization-top-codes.component";

@Component({
  selector: "app-application-visualization",
  standalone: true,
  imports: [ApplicationVisualizationTopCodesComponent, ApplicationVisualizationFailedRequestsComponent],
  templateUrl: "./application-visualization.component.html",
  styleUrl: "./application-visualization.component.scss",
})
export class ApplicationVisualizationComponent {}
