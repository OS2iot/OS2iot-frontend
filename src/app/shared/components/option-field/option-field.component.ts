import { NgStyle } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-option-field",
    templateUrl: "./option-field.component.html",
    styleUrls: ["./option-field.component.scss"],
    imports: [NgStyle]
})
export class OptionFieldComponent implements OnInit {
  @Input() title = "";
  @Input() type: "default" | "warning" | "alert" = "default";

  ngOnInit(): void {
    let color;

    switch (this.type) {
      case "alert":
        color = "#991B1B";
        break;
      case "warning":
        color = "#FDE047";
        break;
      default:
        color = "#E5E5E5";
        break;
    }

    this.boxStyles = {
      "background-color": color,
    };
  }

  boxStyles: Record<string, string> = {};
}
