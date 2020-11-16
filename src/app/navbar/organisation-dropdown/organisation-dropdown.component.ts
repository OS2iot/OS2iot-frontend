import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organisation } from '@app/admin/organisation/organisation.model';
import { PermissionType } from '@app/admin/permission/permission.model';
import { UserResponse } from '@app/admin/users/user.model';
import { faExchangeAlt, faLayerGroup, faUsers, faIdBadge, faToolbox, faBurn } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

@Component({
  selector: 'app-organisation-dropdown',
  templateUrl: './organisation-dropdown.component.html',
  styleUrls: ['./organisation-dropdown.component.scss']
})
export class OrganisationDropdownComponent implements OnInit, OnChanges {
  public organisations: Organisation[];
  public user: UserResponse;
  public isOrgAdmin = false;

  faExchangeAlt = faExchangeAlt;
  faLayergroup = faLayerGroup;
  faUsers = faUsers;
  faIdBadge = faIdBadge;
  faToolbox = faToolbox;
  faBurn = faBurn;


  constructor(
    private sharedVariableService: SharedVariableService,
    public translate: TranslateService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.getAllowedOrganizations();
  }

  ngOnChanges(): void {
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
    this.isOrganisationAdmin(userInfo.organizations[0]?.id);
  }

  private isOrganisationAdmin(orgId: number) {
    this.isOrgAdmin = this.user?.permissions?.some(x => x.type == PermissionType.OrganizationAdmin && x.organization.id === +orgId);
  }

  public onChange(value) {
    this.sharedVariableService.setValue(value);
    this.isOrganisationAdmin(value);
    this.route.navigateByUrl('/applications');
  }

  setSelectedOrganisation(value) {
    this.sharedVariableService.setSelectedOrganisationId(value);
  }

  getSelectedOrganisation() {
    return this.sharedVariableService.getSelectedOrganisationId();
  }
}
