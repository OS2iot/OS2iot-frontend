import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organisation } from '@app/admin/organisation/organisation.model';
import { PermissionType } from '@app/admin/permission/permission.model';
import { UserResponse } from '@app/admin/users/user.model';
import { faExchangeAlt, faLayerGroup, faUsers, faIdBadge, faToolbox, faBurn, faKey } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

@Component({
  selector: 'app-organisation-dropdown',
  templateUrl: './organisation-dropdown.component.html',
  styleUrls: ['./organisation-dropdown.component.scss']
})
export class OrganisationDropdownComponent implements OnInit {
  public organisations: Organisation[];
  public user: UserResponse;
  public isOrgAdmin = false;
  public isGlobalAdmin = false;

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
    this.isOrgAdmin = this.user?.permissions?.some(x => x.type == PermissionType.OrganizationAdmin && x.organization.id === +orgId);
    this.isGlobalAdmin = this.user?.permissions?.some( permission => permission.type === PermissionType.GlobalAdmin);
  }

  public onChange(organizationId: string) {
    this.sharedVariableService.setValue(+organizationId);
    this.setLocalPermissionCheck(+organizationId);

    if (this.route.url === '/' || this.route.url === '/applications') {
      window.location.reload();
    } else {
      this.route
        .navigateByUrl('/', { skipLocationChange: false })
        .then(() => this.route.navigate(['applications'], {}));
    }
  }

  setSelectedOrganisation(value) {
    this.sharedVariableService.setSelectedOrganisationId(value);
  }

  getSelectedOrganisation(): number {
    return +this.sharedVariableService.getSelectedOrganisationId();
  }
}
