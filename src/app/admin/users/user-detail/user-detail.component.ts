import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UserResponse } from '../user.model';
import { UserService } from '../user.service';
import { BackButton } from '@shared/models/back-button.model';
import { QuickActionButton } from '@shared/models/quick-action-button.model';
import { Application } from '@applications/application.model';
import { OrganisationResponse } from '@app/admin/organisation/organisation.model';
import { DropdownButton } from '@shared/models/dropdown-button.model';
import { environment } from '@environments/environment';
import { MeService } from '@shared/services/me.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  isLoadingResults = true;
  public pageLimit: number = environment.tablePageSize;
  public pageTotal: number;
  public pageOffset = 0;
  public applications: Application[];
  private applicationsSubscription: Subscription;

  organisation: OrganisationResponse;
  user: UserResponse;
  public backButton: BackButton = {
    label: '',
    routerLink: '/admin/users',
  };
  public buttons: QuickActionButton[] = [
    {
      label: 'USERS.DELETE',
      type: 'delete',
    },
    {
      label: 'USERS.EDIT',
      type: 'edit',
    },
  ];
  dropdownButton: DropdownButton;
  id: number;
  subscription: Subscription;
  canEdit: boolean;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private meService: MeService
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.id = +this.route.snapshot.paramMap.get('user-id');
    if (this.id > 0) {
      this.getUser(this.id);
      this.dropdownButton = {
        label: '',
        editRouterLink: 'edit-user',
        isErasable: false,
      };
    }
    this.translate.get(['NAV.USERS', 'USERS.DETAIL.DROPDOWN'])
      .subscribe(translations => {
        this.backButton.label = translations['NAV.USERS'];
        this.dropdownButton.label = translations['USERS.DETAIL.DROPDOWN'];
      });
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.UserAdministrationWrite);
  }

  private getUser(id: number) {
    this.subscription = this.userService
      .getOne(id, true)
      .subscribe((response) => {
        this.user = response;
        this.isLoadingResults = false;
      });
  }

  onEditUser() {
    this.router.navigate(['edit-user'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    if (this.applicationsSubscription) {
      this.applicationsSubscription.unsubscribe();
    }
  }
}
