import { Component, OnInit } from "@angular/core";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";

@Component({
    selector: "app-user-table-tab",
    templateUrl: "./user-table-tab.component.html",
    styleUrls: ["./user-table-tab.component.scss"],
})
export class UserTableTabComponent implements OnInit {
    organizationId: number;
    constructor(private globalService: SharedVariableService) {
        this.organizationId = this.globalService.getSelectedOrganisationId();
    }

    ngOnInit(): void {}
}
