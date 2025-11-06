import { Component, OnInit } from "@angular/core";
import { ApplicationService } from "@applications/application.service";
import { environment } from "@environments/environment";

@Component({
  selector: "app-datatarget-tab",
  templateUrl: "./datatarget-tab.component.html",
  styleUrls: ["./datatarget-tab.component.scss"],
  standalone: false,
})
export class DatatargetTabComponent implements OnInit {
  public pageLimit = environment.tablePageSize;

  constructor(public applicationService: ApplicationService) {}

  ngOnInit(): void {}
}
