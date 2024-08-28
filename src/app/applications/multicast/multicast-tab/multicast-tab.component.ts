import { Component, OnInit } from "@angular/core";
import { ApplicationService } from "@applications/application.service";

@Component({
  selector: "app-multicast-tab",
  templateUrl: "./multicast-tab.component.html",
  styleUrls: ["./multicast-tab.component.scss"],
})
export class MulticastTabComponent implements OnInit {
  constructor(public applicationService: ApplicationService) {}

  ngOnInit(): void {}
}
