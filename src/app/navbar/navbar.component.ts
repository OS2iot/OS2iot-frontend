import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Organisation } from "@app/admin/organisation/organisation.model";
import { PermissionType } from "@app/admin/permission/permission.model";
import { AuthService, CurrentUserInfoResponse } from "@app/auth/auth.service";
import { environment } from "@environments/environment";
import {
  faBroadcastTower,
  faBurn,
  faExchangeAlt,
  faIdBadge,
  faKey,
  faLayerGroup,
  faNetworkWired,
  faQuestionCircle,
  faSignInAlt,
  faSignOutAlt,
  faSlidersH,
  faToolbox,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { TranslateService } from "@ngx-translate/core";
import { User } from "@shared/components/forms/form-body-application/form-body-application.component";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { LoggedInService } from "@shared/services/loggedin.service";
import { MeService } from "@shared/services/me.service";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { UserResponse } from "./../admin/users/user.model";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public organisations: Organisation[];
  public selected: number;
  public userResponse: UserResponse;
  public isUserAdmin = false;
  public isGlobalAdmin = false;
  public isOnlyGatewayAdmin = false;

  faExchangeAlt = faExchangeAlt;
  faLayergroup = faLayerGroup;
  faUsers = faUsers;
  faIdBadge = faIdBadge;
  faToolbox = faToolbox;
  faBurn = faBurn;
  faKey = faKey;
  isCollapsed = false;
  isLoginMode = true;
  user: User;
  faBroadcastTower = faBroadcastTower;
  userInfo: CurrentUserInfoResponse;
  faSlidersH = faSlidersH;
  faNetworkWired = faNetworkWired;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;
  faUser = faUser;
  faQuestionCircle = faQuestionCircle;
  imagePath = "../../assets/images/os2iot.png ";

  constructor(
    private authService: AuthService,
    public translate: TranslateService,
    private router: Router,
    private sharedVariableService: SharedVariableService,
    private loggedInService: LoggedInService,
    private meService: MeService,
    private route: Router
  ) {
    translate.use("da");
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl("auth");
    this.loggedInService.emitChange(false);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  hasSomePermissions(): boolean {
    return this.sharedVariableService.getHasAnyPermission();
  }

  getUsername(): string {
    return this.sharedVariableService.getUsername();
  }

  isLoggedInWithKombit() {
    return this.authService.isLoggedInWithKombit();
  }

  hasEmail(): string {
    this.userInfo = this.sharedVariableService.getUserInfo();
    return this.userInfo?.user?.email;
  }

  public goToHelp() {
    window.open("https://os2iot.os2.eu/");
  }

  getKombitLogoutUrl() {
    const jwt = this.authService.getJwt();
    if (this.authService.isLoggedInWithKombit()) {
      return `${environment.baseUrl}auth/kombit/logout?secret_token=${jwt}`;
    } else {
      return "";
    }
  }

  ngOnInit(): void {
    this.getAllowedOrganizations();
    this.organisations.sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }));
    this.selected = this.sharedVariableService.getSelectedOrganisationId();
  }

  getAllowedOrganizations() {
    const userInfo = this.sharedVariableService.getUserInfo();
    this.organisations = userInfo.organizations;
    this.userResponse = userInfo.user;
    this.sharedVariableService.getSelectedOrganisationId();
    if (
      (this.sharedVariableService.getSelectedOrganisationId() === 0 && userInfo.organizations.length > 0) ||
      !userInfo.organizations.some(x => x.id === this.sharedVariableService.getSelectedOrganisationId())
    ) {
      this.setSelectedOrganisation(userInfo.organizations[0]?.id);
    }
    this.setLocalPermissionCheck(userInfo.organizations[0]?.id);
  }

  private setLocalPermissionCheck(orgId: number) {
    this.isUserAdmin = this.meService.hasAccessToTargetOrganization(
      OrganizationAccessScope.UserAdministrationWrite,
      orgId
    );
    this.isGlobalAdmin = this.userResponse?.permissions?.some(({ type: pmTypes }) =>
      pmTypes.some(pmType => pmType.type === PermissionType.GlobalAdmin)
    );
    this.isOnlyGatewayAdmin = this.userResponse.permissions.every(({ type: pmTypes }) =>
      pmTypes.some(pmType => pmType.type === PermissionType.OrganizationGatewayAdmin)
    );
  }

  public onChange(organizationId: string) {
    this.sharedVariableService.setValue(+organizationId);
    this.setLocalPermissionCheck(+organizationId);

    if (this.route.url === "/" || this.route.url === "/applications") {
      window.location.reload();
    } else {
      this.route.navigateByUrl("/", { skipLocationChange: false }).then(() => this.route.navigate(["applications"]));
    }
  }

  setSelectedOrganisation(value) {
    this.sharedVariableService.setSelectedOrganisationId(value);
  }

  getSelectedOrganisation(): number {
    return +this.sharedVariableService.getSelectedOrganisationId();
  }
}
