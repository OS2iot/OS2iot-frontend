import { Component, OnInit } from "@angular/core";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";

@Component({
  selector: "app-awaiting-user-tab",
  templateUrl: "./awaiting-users-table-tab.component.html",
  styleUrls: ["./awaiting-users-table-tab.component.scss"],
  standalone: false,
})
export class AwaitingUsersTableTabComponent implements OnInit {
  organizationId: number;
  constructor(private globalService: SharedVariableService) {
    this.organizationId = this.globalService.getSelectedOrganisationId();
  }

  ngOnInit(): void {}
}
