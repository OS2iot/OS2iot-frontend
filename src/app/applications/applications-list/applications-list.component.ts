import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserMinimalService } from '@app/admin/users/user-minimal.service';
import { NavbarComponent } from '@app/navbar/navbar.component';
import { Application } from '@applications/application.model';
import { AuthService } from '@auth/auth.service';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { WelcomeDialogComponent } from '@shared/components/welcome-dialog/welcome-dialog.component';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';
import { MeService } from '@shared/services/me.service';
import { WelcomeDialogModel } from '@shared/models/dialog.model';

@Component({
  providers: [NavbarComponent],
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss'],
})
export class ApplicationsListComponent implements OnInit {
  isLoadingResults = true;

  public pageLimit = environment.tablePageSize;
  public resultsLength: number;
  public pageOffset = 0;
  public applications: Application[];
  @Input() organizationId: number;
  canEdit: boolean;
  private unauthorizedMessage: string;
  private kombitError: string;
  private noAccess: string;
  hasSomePermission: boolean;
  isGlobalAdmin = false;

  constructor(
    public translate: TranslateService,
    private titleService: Title,
    private globalService: SharedVariableService,
    private meService: MeService,
    private sharedVariableService: SharedVariableService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private userMinimalService: UserMinimalService
  ) {
    translate.use('da');
  }

  ngOnInit(): void {
    this.translate.get(['TITLE.APPLICATION']).subscribe((translations) => {
      this.titleService.setTitle(translations['TITLE.APPLICATION']);
    });
    this.organizationId = this.globalService.getSelectedOrganisationId();
    this.canEdit = this.meService.hasAccessToTargetOrganization(
      OrganizationAccessScope.ApplicationWrite
    );

    // Authenticate user
    this.verifyUserAndInit();
  }

  verifyUserAndInit() {
    this.route.queryParams.subscribe(async (params) => {
      await this.translate
        .get([
          'WELCOME-DIALOG.NO-JOB-ACCESS',
          'TITLE.FRONTPAGE',
          'WELCOME-DIALOG.KOMBIT-LOGIN-ERROR',
          'WELCOME-DIALOG.USER-INACTIVE',
        ])
        .toPromise()
        .then((translations) => {
          this.unauthorizedMessage =
            translations['WELCOME-DIALOG.NO-JOB-ACCESS'];
          this.kombitError = translations['WELCOME-DIALOG.KOMBIT-LOGIN-ERROR'];
          this.noAccess = translations['WELCOME-DIALOG.USER-INACTIVE'];
          this.titleService.setTitle(translations['TITLE.FRONTPAGE']);
        });
      // this is used when a user is returned from Kombit login
      const jwt = params['jwt'];

      if (jwt) {
        this.authService.setSession(jwt);

        const userInfo = await this.sharedVariableService.setUserInfo();
        if (!userInfo.user.email) {
          this.router.navigate(['/new-user'], {
            state: { fromKombit: true },
          });
        } else {
          // Clear the URL from the parameter
          this.router.navigate(['/applications']);
        }
      } else {
        const error = params['error'];
        if (error) {
          if (
            error === 'MESSAGE.KOMBIT-LOGIN-FAILED' ||
            error === 'MESSAGE.API-KEY-AUTH-FAILED'
          ) {
            this.router.navigate(['/not-authorized'], {
              state: { message: this.kombitError, code: 401 },
            });
          } else if (error === 'MESSAGE.USER-INACTIVE') {
            this.router.navigate(['/not-authorized'], {
              state: { message: this.noAccess, code: 401 },
            });
          } else {
            this.router.navigate(['/not-authorized'], {
              state: { message: this.unauthorizedMessage, code: 401 },
            });
          }
        }
      }

      const userInfo = await this.sharedVariableService.setUserInfo();
      this.isGlobalAdmin = this.meService.hasGlobalAdmin();
      const hasSeenWelcomeScreen = this.userMinimalService.getHasSeenWelcomeScreen();
      this.hasSomePermission = this.sharedVariableService.getHasAnyPermission();

      if (
        !this.hasSomePermission ||
        (!this.isGlobalAdmin &&
          !hasSeenWelcomeScreen &&
          userInfo?.user?.showWelcomeScreen)
      ) {
        this.userMinimalService.setHasSeenWelcomeScreen();

        this.dialog.open(WelcomeDialogComponent, {
          disableClose: true,
          closeOnNavigation: true,
          panelClass: 'welcome-screen',
          maxWidth: '60vw',
          data: {
            hasSomePermission: this.hasSomePermission,
          } as WelcomeDialogModel,
        });
      }

      if (this.hasSomePermission) {
        await this.sharedVariableService.setOrganizationInfo();
        this.userMinimalService.setUserMinimalList();
      }

      this.isLoadingResults = false;
    });
  }
}
