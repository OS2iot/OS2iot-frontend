import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organisation } from '@app/admin/organisation/organisation.model';
import { PermissionType } from '@app/admin/permission/permission.model';
import { UserResponse } from '@app/admin/users/user.model';
import { faExchangeAlt, faLayerGroup, faUsers, faIdBadge, faToolbox, faBurn, faKey } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { MeService } from '@shared/services/me.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-organisation-dropdown',
  templateUrl: './organisation-dropdown.component.html',
  styleUrls: ['./organisation-dropdown.component.scss']
})
export class OrganisationDropdownComponent implements OnInit {
  public organisations: Organisation[];
  public user: UserResponse;
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


  constructor(
    private sharedVariableService: SharedVariableService,
    public translate: TranslateService,
    private route: Router,
    private meService: MeService
  ) { }

  ngOnInit(): void {
    this.getAllowedOrganizations();
  }

  getAllowedOrganizations() {
    const userInfo = this.sharedVariableService.getUserInfo();
    this.organisations = userInfo.organizations;
    this.user = userInfo.user;
    this.sharedVariableService.getSelectedOrganisationId();
    if (
      (this.sharedVariableService.getSelectedOrganisationId() === 0 &&
        userInfo.organizations.length > 0) ||
      !userInfo.organizations.some(
        (x) => x.id === this.sharedVariableService.getSelectedOrganisationId()
      )
    ) {
      this.setSelectedOrganisation(userInfo.organizations[0]?.id);
    }
    this.setLocalPermissionCheck(userInfo.organizations[0]?.id);
  }

  private setLocalPermissionCheck(orgId: number) {
    this.isUserAdmin = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.UserAdministrationWrite);
    this.isGlobalAdmin = this.user?.permissions?.some( permission => permission.type === PermissionType.GlobalAdmin);
    this.isOnlyGatewayAdmin = this.user.permissions.every(permission => permission.type === PermissionType.OrganizationGatewayAdmin);
  }

  public onChange(organizationId: string) {
    this.sharedVariableService.setValue(+organizationId);
    this.setLocalPermissionCheck(+organizationId);
    this.route
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.route.navigate(['applications']));
  }

  setSelectedOrganisation(value) {
    this.sharedVariableService.setSelectedOrganisationId(value);
  }

  getSelectedOrganisation(): number {
    return +this.sharedVariableService.getSelectedOrganisationId();
  }
}
