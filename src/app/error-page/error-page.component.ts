import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-error-page",
  templateUrl: "./error-page.component.html",
  styleUrls: ["./error-page.component.scss"],
  standalone: false,
})
export class ErrorPageComponent implements OnInit {
  errorMessage: any;

  constructor() {}

  ngOnInit() {
    if (history.state.code === 401) {
      this.errorMessage = history.state;
    } else {
      this.errorMessage = {
        message: "Page not found",
        code: 404,
      };
    }
  }
}
