import { Component, OnInit } from "@angular/core";
import { UserResponse } from "@app/admin/users/user.model";
import { MeService } from "@shared/services/me.service";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";

@Component({
  selector: "app-global-admin",
  templateUrl: "./global-admin.component.html",
  styleUrls: ["./global-admin.component.scss"],
})
export class GlobalAdminComponent implements OnInit {
  public user: UserResponse;
  public isGlobalAdmin = false;

  constructor(private sharedVariableService: SharedVariableService, private meService: MeService) {}

  ngOnInit(): void {
    this.user = this.sharedVariableService.getUserInfo().user;
    this.isGlobalAdmin = this.meService.hasGlobalAdmin();
  }
}
