import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer, Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { UserMinimalService } from "@app/admin/users/user-minimal.service";
import { NavbarComponent } from "@app/navbar/navbar.component";
import { ApplicationService } from "@applications/application.service";
import { AuthService } from "@auth/auth.service";
import { environment } from "@environments/environment";
import { TranslateService } from "@ngx-translate/core";
import { Counter, Tab } from "@shared/components/basic-tap-switch/basic-tap-switch.component";
import { WelcomeDialogComponent } from "@shared/components/welcome-dialog/welcome-dialog.component";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { WelcomeDialogModel } from "@shared/models/dialog.model";
import { MeService } from "@shared/services/me.service";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";

const welcomeDialogId = "welcome-dialog";

@Component({
  providers: [NavbarComponent],
  selector: "app-applications-list",
  templateUrl: "./applications-list.component.html",
  styleUrls: ["./applications-list.component.scss"],
})
export class ApplicationsListComponent implements OnInit {
  currentSubPath: string = "";
  tabs: Tab[];

  isLoadingResults = true;

  public pageLimit = environment.tablePageSize;
  public resultsLength: number;
  public pageOffset = 0;
  mapRoute = "/applications/map";
  listRoute = "/applications";

  @Input() organizationId: number;
  canEdit: boolean;
  private unauthorizedMessage: string;
  private kombitError: string;
  private noAccess: string;
  hasSomePermission: boolean;
  isGlobalAdmin = false;

  currentPath = "";

  constructor(
    public translate: TranslateService,
    private titleService: Title,
    private globalService: SharedVariableService,
    private meService: MeService,
    private sharedVariableService: SharedVariableService,
    private authService: AuthService,
    public route: ActivatedRoute,
    public router: Router,
    private dialog: MatDialog,
    private userMinimalService: UserMinimalService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private applicationService: ApplicationService
  ) {
    translate.use("da");

    this.matIconRegistry.addSvgIcon(
      "layers-tap",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/layers.svg"),
      {}
    );

    this.matIconRegistry.addSvgIcon(
      "map-tap",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/circle-dot.svg"),
      {}
    );
  }

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      this.currentSubPath = urlSegments.map(segment => segment.path).join("/");
    });

    this.translate.get(["TITLE.APPLICATION"]).subscribe(translations => {
      this.titleService.setTitle(translations["TITLE.APPLICATION"]);
    });
    this.organizationId = this.globalService.getSelectedOrganisationId();
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite);

    this.applicationService
      .getApplicationsWithError(this.sharedVariableService.getSelectedOrganisationId())
      .subscribe(data => {
        const counters: Counter[] = [
          {
            color: "default",
            value: data.total.toString(),
          },
        ];

        if (data.withError) {
          counters.push({ color: "alert", value: data.withError.toString() });
        }

        this.tabs = [
          {
            title: "Applikationer",
            icon: { matSVGSrc: "layers-tap", height: 16, width: 16 },
            counters: counters,
            uri: this.listRoute,
          },
          { title: "Kort", icon: { matSVGSrc: "map-tap", height: 17, width: 18 }, uri: this.mapRoute },
        ];
      });

    // Authenticate user
    this.verifyUserAndInit();

    this.currentPath = this.router.url;
  }

  verifyUserAndInit() {
    this.route.queryParams.subscribe(async params => {
      await this.translate
        .get([
          "WELCOME-DIALOG.NO-JOB-ACCESS",
          "TITLE.FRONTPAGE",
          "WELCOME-DIALOG.KOMBIT-LOGIN-ERROR",
          "WELCOME-DIALOG.USER-INACTIVE",
        ])
        .toPromise()
        .then(translations => {
          this.unauthorizedMessage = translations["WELCOME-DIALOG.NO-JOB-ACCESS"];
          this.kombitError = translations["WELCOME-DIALOG.KOMBIT-LOGIN-ERROR"];
          this.noAccess = translations["WELCOME-DIALOG.USER-INACTIVE"];
          this.titleService.setTitle(translations["TITLE.FRONTPAGE"]);
        });
      // this is used when a user is returned from Kombit login
      const jwt = params["jwt"];

      if (jwt) {
        this.authService.setSession(jwt);

        const userInfo = await this.sharedVariableService.setUserInfo();
        if (!userInfo.user.email) {
          this.router.navigate(["/new-user"], {
            state: { fromKombit: true },
          });
          return;
        } else {
          // Clear the URL from the parameter
          this.router.navigate(["/applications"], { replaceUrl: true });
          return;
        }
      } else {
        const error = params["error"];
        if (error) {
          if (error === "MESSAGE.KOMBIT-LOGIN-FAILED" || error === "MESSAGE.API-KEY-AUTH-FAILED") {
            this.router.navigate(["/not-authorized"], {
              state: { message: this.kombitError, code: 401 },
            });
          } else if (error === "MESSAGE.USER-INACTIVE") {
            this.router.navigate(["/not-authorized"], {
              state: { message: this.noAccess, code: 401 },
            });
          } else {
            this.router.navigate(["/not-authorized"], {
              state: { message: this.unauthorizedMessage, code: 401 },
            });
          }

          return;
        }
      }

      const userInfo = await this.sharedVariableService.setUserInfo();
      this.isGlobalAdmin = this.meService.hasGlobalAdmin();
      const hasSeenWelcomeScreen = this.userMinimalService.getHasSeenWelcomeScreen();
      this.hasSomePermission = this.sharedVariableService.getHasAnyPermission();
      const isOpen = !!this.dialog?.getDialogById(welcomeDialogId);

      if (
        !this.hasSomePermission ||
        (!this.isGlobalAdmin && !hasSeenWelcomeScreen && userInfo?.user?.showWelcomeScreen && !isOpen)
      ) {
        this.userMinimalService.setHasSeenWelcomeScreen();

        this.dialog.open(WelcomeDialogComponent, {
          id: welcomeDialogId,
          disableClose: true,
          closeOnNavigation: true,
          panelClass: "welcome-screen",
          maxWidth: "40vw",
          data: {
            hasSomePermission: this.hasSomePermission,
          } as WelcomeDialogModel,
        });

        if (!this.hasSomePermission) {
          // In case a previous .navigate() was fired, ensure this is called after
          setTimeout(() => {
            this.router.navigate(["/user-page"], { replaceUrl: true });
          });
        }
      }

      if (this.hasSomePermission) {
        await this.sharedVariableService.setOrganizationInfo();
        this.userMinimalService.setUserMinimalList();
      }

      this.isLoadingResults = false;
    });
  }

  onTapClicked(url: string) {
    this.currentPath = url;
  }
}
