import { Component, Input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: "app-status-icon",
  templateUrl: "./status-icon.component.html",
  styleUrls: ["./status-icon.component.scss"],
  standalone: true,
  imports: [MatIcon],
})
export class StatusIconComponent {
  @Input() iconType: "default" | "warring" = "default";
}
