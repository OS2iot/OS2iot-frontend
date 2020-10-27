import { AfterContentInit, AfterViewChecked, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organisation } from '@app/admin/organisation/organisation.model';
import { PermissionType } from '@app/admin/permission/permission.model';
import { UserResponse } from '@app/admin/users/user.model';
import { AuthService } from '@app/auth/auth.service';
import { faExchangeAlt, faLayerGroup, faUsers, faIdBadge, faIdCard, faToolbox } from '@fortawesome/free-solid-svg-icons';
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


  constructor(
    private authService: AuthService,
    public translate: TranslateService,
    private sharedVariable: SharedVariableService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.getAllowedOrganizations();
  }

  ngOnChanges(): void {
    this.getAllowedOrganizations();
  }

  getAllowedOrganizations() {
    this.authService.me().subscribe((response) => {
      this.organisations = response.organizations;
      this.user = response.user;
      this.sharedVariable.getSelectedOrganisationId();
      if (
        (this.sharedVariable.getSelectedOrganisationId() === 0 &&
          response.organizations.length > 0) ||
        !response.organizations.some(
          (x) => x.id === this.sharedVariable.getSelectedOrganisationId()
        )
      ) {
        this.setSelectedOrganisation(response.organizations[0].id);
        this.isOrganisationAdmin(response.organizations[0].id);
      }
    });
  }

  private isOrganisationAdmin(orgId: number) {
    this.isOrgAdmin = this.user?.permissions?.some(x => x.type === PermissionType.OrganizationAdmin && x.organization.id === +orgId);
    console.log(this.isOrgAdmin);
  }

  public onChange(value) {
    this.setSelectedOrganisation(value);
    this.isOrganisationAdmin(value);
    this.sharedVariable.setValue(value);
    this.route.navigateByUrl('/applications');
  }

  setSelectedOrganisation(value) {
    this.sharedVariable.setSelectedOrganisationId(value);
  }

  getSelectedOrganisation() {
    return this.sharedVariable.getSelectedOrganisationId();
  }
}
