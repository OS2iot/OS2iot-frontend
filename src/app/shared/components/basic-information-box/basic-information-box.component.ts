import { NgStyle } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-basic-information-box",
  standalone: true,
  imports: [MatIconModule, NgStyle],
  templateUrl: "./basic-information-box.component.html",
  styleUrl: "./basic-information-box.component.scss",
})
export class BasicInformationBoxComponent implements OnInit {
  ngOnInit(): void {
    let color: string = "";

    switch (this.type) {
      case "stable": {
        color = "#047857";

        break;
      }
      case "warning": {
        color = "#991b1b";

        break;
      }
      default: {
        color = "black";

        break;
      }
    }

    this.currentStyles[0] = {
      color: color,
      height: this.height.toString() + "px",
      width: this.width.toString() + "px",
    };
  }
  currentStyles: Record<string, string>[] = [];

  @Input() type!: "default" | "warning" | "stable";
  @Input() count!: number;
  @Input() width!: number;
  @Input() height!: number;
  @Input() countOf!: number;
  @Input() description!: string;
  @Input() matSVGSrc!: string;
}
