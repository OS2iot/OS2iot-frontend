import { NgStyle } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-option-field",
  templateUrl: "./option-field.component.html",
  styleUrls: ["./option-field.component.scss"],
  standalone: true,
  imports: [NgStyle],
})
export class OptionFieldComponent implements OnInit {
  ngOnInit(): void {
    let color;

    switch (this.type) {
      case "alert":
        color = "#991B1B";
        break;
      case "warring":
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
  @Input() title = "";
  @Input() type: "default" | "warring" | "alert" = "default";
  boxStyles: Record<string, string> = {};
}
