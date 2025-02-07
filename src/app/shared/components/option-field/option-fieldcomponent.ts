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
        color = "red";
        break;
      case "warring":
        color = "yellow";
        break;
      default:
        color = "#aebabe";
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
