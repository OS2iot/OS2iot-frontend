import { Component, OnInit } from "@angular/core";
import { PermissionType } from "@app/admin/permission/permission.model";
import { UserResponse } from "@app/admin/users/user.model";
import { faGlobe, faUsers, faIdBadge, faSitemap, faUser } from "@fortawesome/free-solid-svg-icons";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { MeService } from "@shared/services/me.service";

@Component({
    selector: "app-global-admin",
    templateUrl: "./global-admin.component.html",
    styleUrls: ["./global-admin.component.scss"],
})
export class GlobalAdminComponent implements OnInit {
    faGlobe = faGlobe;
    faUsers = faUsers;
    faIdBadge = faIdBadge;
    faSitemap = faSitemap;
    faUser = faUser;

    public user: UserResponse;
    public isGlobalAdmin = false;

    constructor(private sharedVariableService: SharedVariableService, private meService: MeService) {}

    ngOnInit(): void {
        this.user = this.sharedVariableService.getUserInfo().user;
        this.isGlobalAdmin = this.meService.hasGlobalAdmin();
    }
}
