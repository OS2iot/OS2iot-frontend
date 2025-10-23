import { Component, Input, OnInit } from "@angular/core";
import { UserResponse } from "@app/admin/users/user.model";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { MeService } from "@shared/services/me.service";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";

@Component({
  selector: "app-administration",
  templateUrl: "./administration.component.html",
  styleUrls: ["./administration.component.scss"],
  standalone: false,
})
export class AdministrationComponent implements OnInit {
  public user: UserResponse;
  public isGlobalAdmin = false;

  public isUserAdmin = false;
  @Input() orgId: number;

  constructor(private sharedVariableService: SharedVariableService, private meService: MeService) {}

  ngOnInit(): void {
    this.user = this.sharedVariableService.getUserInfo().user;
    this.isGlobalAdmin = this.meService.hasGlobalAdmin();
    this.isUserAdmin = this.meService.hasAccessToTargetOrganization(
      OrganizationAccessScope.UserAdministrationWrite,
      this.orgId
    );
  }
}
