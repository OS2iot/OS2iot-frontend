import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { faBroadcastTower } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@app/auth/auth.service';
import { Router } from '@angular/router';
import { Organisation } from '@app/admin/organisation/organisation.model';
import { UserResponse } from '@app/admin/users/user.model';
import { SharedVariableService } from '@app/shared-variable/shared-variable.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public user: UserResponse;
  public organisations: Organisation[];

  isLoginMode = true;
  faBroadcastTower = faBroadcastTower;

  constructor(
    private authService: AuthService,
    public translate: TranslateService,
    private router: Router,
    private sharedVariableServioce: SharedVariableService
  ) {
    translate.use('da');
  }

  ngOnInit(): void {
    this.getAllowedOrganizations();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('auth');
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getAllowedOrganizations() {
    this.authService.me().subscribe((response) => {
      this.organisations = response.organizations;
      this.user = response.user;
      this.sharedVariableServioce.getSelectedOrganisationId();
      if (
        (this.sharedVariableServioce.getSelectedOrganisationId() == 0 &&
          response.organizations.length > 0) ||
        !response.organizations.some(
          (x) => x.id == this.sharedVariableServioce.getSelectedOrganisationId()
        )
      ) {
        this.setSelectedOrganisation(response.organizations[0].id);
      }
    });
  }

  setSelectedOrganisation(value) {
    this.sharedVariableServioce.setSelectedOrganisationId(value);
  }

  getSelectedOrganisation() {
    return this.sharedVariableServioce.getSelectedOrganisationId();
  }

  public onChange(value) {
    this.setSelectedOrganisation(value);
    this.sharedVariableServioce.setValue(value);
  }
}
