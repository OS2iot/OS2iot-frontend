import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { UserMinimalService } from "@app/admin/users/user-minimal.service";
import { AuthService } from "@auth/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { MeService } from "@shared/services/me.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  unauthorizedMessage: string;
  kombitError: string;
  noAccess: string;
  isLoadingResults = true;
  hasSomePermission: boolean;
  isGlobalAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private sharedVariableService: SharedVariableService,
    private translate: TranslateService,
    private titleService: Title,
    private userMinimalService: UserMinimalService,
    private meService: MeService
  ) {
    this.route.queryParams.subscribe(async params => {
      this.translate.use("da");
      await this.translate
        .get(["DASHBOARD.NO-JOB-ACCESS", "TITLE.FRONTPAGE", "DASHBOARD.KOMBIT-LOGIN-ERROR", "DASHBOARD.USER-INACTIVE"])
        .toPromise()
        .then(translations => {
          this.unauthorizedMessage = translations["DASHBOARD.NO-JOB-ACCESS"];
          this.kombitError = translations["DASHBOARD.KOMBIT-LOGIN-ERROR"];
          this.noAccess = translations["DASHBOARD.USER-INACTIVE"];
          this.titleService.setTitle(translations["TITLE.FRONTPAGE"]);
        });

      // this is used when a user is returned from Kombit login
      const jwt = params["jwt"];
      if (jwt) {
        this.authService.setSession(jwt);
        const userInfo = await this.sharedVariableService.setUserInfo();
        if (!userInfo.user.email) {
          this.router.navigate(["/new-user"], {
            state: { code: 200 },
          });
        } else {
          // Clear the URL from the parameter
          this.router.navigate(["/dashboard"]);
        }
      } else {
        const error = params["error"];
        if (error) {
          if (error == "MESSAGE.KOMBIT-LOGIN-FAILED" || error == "MESSAGE.API-KEY-AUTH-FAILED") {
            this.router.navigate(["/not-authorized"], {
              state: { message: this.kombitError, code: 401 },
            });
          }
          if (error == "MESSAGE.USER-INACTIVE") {
            this.router.navigate(["/not-authorized"], {
              state: { message: this.noAccess, code: 401 },
            });
          } else {
            this.router.navigate(["/not-authorized"], {
              state: { message: this.unauthorizedMessage, code: 401 },
            });
          }
        }
      }

      const userInfo = await this.sharedVariableService.setUserInfo();
      await this.sharedVariableService.setOrganizationInfo();

      this.userMinimalService.setUserMinimalList();
      this.hasSomePermission = this.sharedVariableService.getHasAnyPermission();
      this.isGlobalAdmin = this.meService.hasGlobalAdmin();
      this.isLoadingResults = false;

      if (userInfo.user.awaitingConfirmation && userInfo.user.email) {
        this.router.navigate(["/user-page"]);
      }
    });
  }

  ngOnInit(): void {}
}
