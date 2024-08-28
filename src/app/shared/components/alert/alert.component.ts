import { Component, OnInit } from "@angular/core";
import { AlertService } from "@shared/services/alert.service";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
})
export class AlertComponent implements OnInit {
  constructor(public alertService: AlertService) {}

  ngOnInit() {}
}
