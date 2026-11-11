import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { faQuestionCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { TranslateService } from "@ngx-translate/core";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { DataTargetType } from "@shared/enums/datatarget-type";
import { ErrorMessageService } from "@shared/error-message.service";
import { MeService } from "@shared/services/me.service";
import { ScrollToTopService } from "@shared/services/scroll-to-top.service";
import { SnackService } from "@shared/services/snack.service";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { first } from "rxjs/operators";
import { DatatargetService } from "../../datatarget.service";
import { OpenDataDkDataset } from "../../opendatadk/opendatadk-dataset.model";
import { OpenDataDkMailDialogComponent } from "./opendatadk-mail-dialog/opendatadk-mail-dialog";
import { OpenDataDkWarningDialogComponent } from "./opendatadk-warning-dialog/opendatadk-warning-dialog";
import { DatatargetEdit } from "@app/datatarget/datatarget-edit/datatarget-edit";
import { Datatarget, OddkMailInfo } from "@app/datatarget/datatarget-models/datatarget.model";

@Component({
  selector: "app-opendatadk-edit",
  templateUrl: "./opendatadk-edit.component.html",
  styleUrls: ["./opendatadk-edit.component.scss"],
  standalone: false,
})
export class OpendatadkEditComponent implements DatatargetEdit, OnDestroy {
  faQuestionCircle = faQuestionCircle;
  faTimesCircle = faTimesCircle;

  title = "FORM.CREATE-NEW-DATATARGET";

  selectableTheme = [
    "SOCI",
    "ENER",
    "INTR",
    "AGRI",
    "OP_DATPRO",
    "ENVI",
    "GOVE",
    "REGI",
    "JUST",
    "HEAL",
    "TRAN",
    "EDUC",
    "TECH",
    "ECON",
  ];

  selectableUpdateFrequencies = [
    "CONT",
    "1MIN",
    "5MIN",
    "10MIN",
    "15MIN",
    "TRIHOURLY",
    "30MIN",
    "HOURLY",
    "BIHOURLY",
    "12HRS",
    "DAILY",
    "WEEKLY",
    "BIWEEKLY",
    "MONTHLY",
    "BIMONTHLY",
    "QUARTERLY",
    "ANNUAL",
    "NEVER",
    "UNKNOWN",
    "OTHER",
    // Unused options from specificaion
    // "TRIENNIAL",
    // "QUADRENNIAL",
    // "QUINQUENNIAL",
    // "AS_NEEDED",
    // "NOT_PLANNED",
    // "TRIDECENNIAL",
    // "BIDECENNIAL",
    // "DECENNIAL",
    // "BIENNIAL",
  ];

  errorMessages: any[];
  errorFields: string[];

  datatarget: Datatarget = new Datatarget();
  formFailedSubmit = false;
  datatargetId: number;
  canEdit: boolean;
  private subscriptions = [];
  private organizationId: number;
  private pendingRequestsCounter: number;
  private alreadySentOddkMail: boolean = false;

  constructor(
    translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private datatargetService: DatatargetService,
    private saveSnackService: SnackService,
    private dialog: MatDialog,
    private errorMessageService: ErrorMessageService,
    private scrollToTopService: ScrollToTopService,
    private meService: MeService,
    private sharedVariableService: SharedVariableService
  ) {
    translate.use("da");

    this.datatarget.type = DataTargetType.OPENDATADK;
    this.datatarget.setToOpendataDk = true;

    this.datatargetId = +this.route.snapshot.paramMap.get("datatargetId");
    this.organizationId = this.sharedVariableService.getSelectedOrganisationId();

    if (this.datatargetId !== 0) {
      this.title = "FORM.EDIT-DATATARGET";
      this.getDatatarget(this.datatargetId);
    }
    this.getAlreadySentOddkMail();

    this.canEdit = this.meService.hasAccessToTargetOrganization(
      OrganizationAccessScope.DataTargetWrite,
      this.organizationId
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s?.unsubscribe());
  }

  onSubmit(): void {
    this.resetErrors();
    if (this.datatargetId) {
      this.pendingRequestsCounter = 1;
      this.updateDatatarget();
    } else {
      this.createDatatarget();
    }
  }

  routeToDatatargets = () => this.router.navigate(["datatargets"]);

  routeToCreatedDatatarget = () =>
    this.router.navigate(["datatargets", this.datatarget.id], {
      replaceUrl: true,
    });

  private getDatatarget(id: number) {
    this.subscriptions.push(
      this.datatargetService.get(id).subscribe((response: Datatarget) => {
        this.datatarget = response;
        if (this.datatarget.openDataDkDataset != null) {
          this.datatarget.openDataDkDataset.acceptTerms = true;
        }
      })
    );
  }

  private updateDatatarget() {
    this.subscriptions.push(
      this.datatargetService.update(this.datatarget).subscribe({
        next: (response: Datatarget) => {
          this.datatarget = response;
          if (this.datatarget.openDataDkDataset != null) {
            this.datatarget.openDataDkDataset.acceptTerms = true;
          }
          this.countToRedirect();
        },
        error: (error: HttpErrorResponse) => {
          this.checkDataTargetModelOpendatadkdatasaet();
          this.handleError(error);
          this.formFailedSubmit = true;
        },
      })
    );
  }

  private createDatatarget() {
    this.pendingRequestsCounter = 0;
    this.datatarget.organizationId = this.organizationId;
    this.subscriptions.push(
      this.datatargetService.create(this.datatarget).subscribe({
        next: (response: Datatarget) => {
          this.datatargetId = response.id;
          this.datatarget = response;
          if (this.datatarget.openDataDkDataset != null) {
            this.datatarget.openDataDkDataset.acceptTerms = true;
          }
          this.saveSnackService.showSavedSnack();
          this.showMailOrRedirect();
        },
        error: (error: HttpErrorResponse) => {
          this.checkDataTargetModelOpendatadkdatasaet();
          this.handleError(error);
          this.formFailedSubmit = true;
        },
      })
    );
  }

  private showMailOrRedirect = () => {
    if (!this.alreadySentOddkMail) {
      this.openMailDialog();
    } else {
      this.routeToCreatedDatatarget();
    }
  };

  // Note: When updating, we send multiple async request, and use this counter to know when everything is done, so we can redirect
  private countToRedirect() {
    this.pendingRequestsCounter -= 1;
    if (this.pendingRequestsCounter <= 0 && !this.formFailedSubmit) {
      this.saveSnackService.showSavedSnack();
      this.showMailOrRedirect();
    }
  }

  private resetErrors() {
    this.errorFields = [];
    this.errorMessages = undefined;
    this.formFailedSubmit = false;
  }

  private checkDataTargetModelOpendatadkdatasaet() {
    this.datatarget.setToOpendataDk = true;
    if (!this.datatarget.openDataDkDataset) {
      this.datatarget.openDataDkDataset = new OpenDataDkDataset();
    }
  }

  private handleError(error: HttpErrorResponse) {
    const errors = this.errorMessageService.handleErrorMessageWithFields(error);
    this.errorFields = errors.errorFields;
    this.errorMessages = errors.errorMessages;
    this.scrollToTopService.scrollToTop();
  }

  // For mail dialog
  private getAlreadySentOddkMail = () => {
    const orgId = this.sharedVariableService.getSelectedOrganisationId();
    this.subscriptions.push(
      this.datatargetService.getOpenDataDkRegistered(orgId).subscribe(response => {
        this.alreadySentOddkMail = !!response;
      })
    );
  };

  private setAlreadySentOddkMail = async () => {
    const orgId = this.sharedVariableService.getSelectedOrganisationId();
    await this.datatargetService.updateOpenDataDkRegistered(orgId).pipe(first()).toPromise();
  };

  private openMailDialog = () => {
    const dialog = this.dialog.open(OpenDataDkMailDialogComponent);
    dialog.afterClosed().subscribe(async (result: OddkMailInfo) => {
      if (result) {
        // User accepted -> Send mail and continue
        await this.datatargetService.sendOpenDataDkMail(result).pipe(first()).toPromise();
        this.routeToCreatedDatatarget();
      } else {
        // User cancelled -> Show the warning
        this.openMailWarningDialog();
      }
    });
  };

  private openMailWarningDialog = () => {
    const dialog = this.dialog.open(OpenDataDkWarningDialogComponent);
    dialog.afterClosed().subscribe(async result => {
      if (result) {
        // User accepted -> Save if 'never again' was checked, then continue
        if (result.neverAgain) {
          await this.setAlreadySentOddkMail();
        }
        this.routeToCreatedDatatarget();
      } else {
        // User cancelled -> Show the mail-dialog again
        this.openMailDialog();
      }
    });
  };
}
