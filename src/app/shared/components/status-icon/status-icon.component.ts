import { NgOptimizedImage } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-status-icon",
  templateUrl: "./status-icon.component.html",
  styleUrls: ["./status-icon.component.scss"],
  standalone: true,
  imports: [NgOptimizedImage],
})
export class StatusIconComponent {
  @Input() iconType: "default" | "warring" = "default";
}
