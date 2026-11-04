import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Application } from "@applications/application.model";
import { faQuestionCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { DatatargetService } from "../../datatarget.service";
import { SnackService } from "@shared/services/snack.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorMessageService } from "@shared/error-message.service";
import { ScrollToTopService } from "@shared/services/scroll-to-top.service";
import { DataTargetType } from "@shared/enums/datatarget-type";
import { MeService } from "@shared/services/me.service";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { DatatargetEdit } from "@app/datatarget/datatarget-edit/datatarget-edit";
import { Datatarget } from "@app/datatarget/datatarget-models/datatarget.model";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";

@Component({
  selector: "app-fiware-edit",
  templateUrl: "./fiware-edit.component.html",
  styleUrls: ["./fiware-edit.component.scss"],
  standalone: false,
})
export class FiwareEditComponent implements DatatargetEdit, OnInit, OnDestroy {
  public multiPage = false;
  public title = "";
  public sectionTitle = "";
  public backButtonTitle = "";
  @Input() submitButton: string;
  public datatarget: Datatarget = new Datatarget();
  faTimesCircle = faTimesCircle;
  public datatargetSubscription: Subscription;
  public applicationSubscription: Subscription;
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  public datatargetid: number;
  public application: Application;
  newDynamic: any = {};
  faQuestionCircle = faQuestionCircle;
  canEdit: boolean;
  private organizationId: number;
  private counter: number;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private datatargetService: DatatargetService,
    private snackService: SnackService,
    private errorMessageService: ErrorMessageService,
    private scrollToTopService: ScrollToTopService,
    private meService: MeService,
    private sharedVariables: SharedVariableService
  ) {
    translate.use("da");
  }

  ngOnInit() {
    this.translate
      .get(["FORM.CREATE-NEW-DATATARGET", "FORM.EDIT-DATATARGET", "DATATARGET.SAVE", "NAV.DATATARGET"])
      .subscribe(translations => {
        const datatargetid = +this.route.snapshot.paramMap.get("datatargetId");
        if (datatargetid !== 0) {
          this.title = translations["FORM.EDIT-DATATARGET"];
        } else {
          this.title = translations["FORM.CREATE-NEW-DATATARGET"];
        }
        this.submitButton = translations["DATATARGET.SAVE"];
        this.backButtonTitle = translations["NAV.DATATARGET"];
      });

    this.datatargetid = +this.route.snapshot.paramMap.get("datatargetId");
    this.organizationId = this.sharedVariables.getSelectedOrganisationId();

    this.datatarget.type = DataTargetType.FIWARE;

    if (this.datatargetid !== 0) {
      this.getDatatarget(this.datatargetid);
    }
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite);
  }

  onSubmit(): void {
    this.counter = 0;
    if (this.datatargetid) {
      this.updateDatatarget();
    } else {
      this.createDatatarget();
    }
  }

  updateDatatarget() {
    this.resetErrors();
    this.counter = 1;
    this.datatargetService.update(this.datatarget).subscribe({
      next: (response: Datatarget) => {
        this.datatarget = response;
        this.countToRedirect();
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
        this.formFailedSubmit = true;
      },
    });
  }

  countToRedirect() {
    this.counter -= 1;
    if (this.counter <= 0 && !this.formFailedSubmit) {
      this.showSavedSnack();
      this.routeToDatatargets();
    }
  }

  createDatatarget() {
    this.resetErrors();
    this.datatarget.organizationId = this.organizationId;
    this.datatargetService.create(this.datatarget).subscribe({
      next: (response: Datatarget) => {
        this.datatargetid = response.id;
        this.datatarget = response;
        this.showSavedSnack();
        this.routeToCreatedDatatarget();
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
        this.formFailedSubmit = true;
      },
    });
  }

  handleError(error: HttpErrorResponse) {
    const errors = this.errorMessageService.handleErrorMessageWithFields(error);
    this.errorFields = errors.errorFields;
    this.errorMessages = errors.errorMessages;
    this.scrollToTopService.scrollToTop();
  }

  routeToDatatargets() {
    this.router.navigate(["datatargets"]);
  }

  routeToCreatedDatatarget() {
    this.router.navigate(["datatargets", this.datatarget.id], {
      replaceUrl: true,
    });
  }

  onCoordinateKey(event: any) {
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(0, event.target.maxLength);
    }
  }

  getDatatarget(id: number) {
    this.datatargetSubscription = this.datatargetService.get(id).subscribe((response: Datatarget) => {
      this.datatarget = response;
    });
  }

  showSavedSnack() {
    this.snackService.showSavedSnack();
  }

  disableSaveButton(): boolean {
    const disable = false;

    return disable;
  }

  ngOnDestroy(): void {
    if (this.applicationSubscription) {
      this.applicationSubscription.unsubscribe();
    }
    if (this.datatargetSubscription) {
      this.datatargetSubscription.unsubscribe();
    }
  }

  private resetErrors() {
    this.errorFields = [];
    this.errorMessages = undefined;
    this.formFailedSubmit = false;
  }
}
