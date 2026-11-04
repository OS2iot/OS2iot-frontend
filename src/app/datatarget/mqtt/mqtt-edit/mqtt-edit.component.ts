import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { faQuestionCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { DataTargetType } from "@shared/enums/datatarget-type";
import { ErrorMessageService } from "@shared/error-message.service";
import { ScrollToTopService } from "@shared/services/scroll-to-top.service";
import { SnackService } from "@shared/services/snack.service";
import { Subscription } from "rxjs";
import { DatatargetEdit } from "@app/datatarget/datatarget-edit/datatarget-edit";
import { Datatarget } from "@app/datatarget/datatarget-models/datatarget.model";
import { DatatargetService } from "@app/datatarget/datatarget.service";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";

@Component({
  selector: "app-mqtt-edit",
  templateUrl: "./mqtt-edit.component.html",
  styleUrls: ["./mqtt-edit.component.scss"],
  standalone: false,
})
// TODO: Most of the code is duplicated from other datatarget edit components.
// Same applies to the html file. One solution is extending a base datatarget-edit component
export class MqttEditComponent implements DatatargetEdit, OnInit, OnDestroy {
  public errorMessages: string[];
  public errorFields: string[];
  public formFailedSubmit = false;
  public datatarget: Datatarget = new Datatarget();
  public datatargetId: number;
  faTimesCircle = faTimesCircle;
  faQuestionCircle = faQuestionCircle;
  private organizationId: number;
  private datatargetSubscription: Subscription;
  private applicationSubscription: Subscription;
  private activeApiCalls: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datatargetService: DatatargetService,
    private snackService: SnackService,
    private errorMessageService: ErrorMessageService,
    private scrollToTopService: ScrollToTopService,
    private sharedVariables: SharedVariableService
  ) {}

  ngOnInit(): void {
    this.datatargetId = +this.route.snapshot.paramMap.get("datatargetId");
    this.organizationId = this.sharedVariables.getSelectedOrganisationId();
    this.datatarget.type = DataTargetType.MQTT;

    if (this.datatargetId !== 0) {
      this.getDatatarget(this.datatargetId);
    }
  }

  routeToDatatargets() {
    this.router.navigate(["datatargets"]);
  }

  routeToCreatedDatatarget() {
    this.router.navigate(["datatargets", this.datatarget.id], {
      replaceUrl: true,
    });
  }

  getDatatarget(id: number) {
    this.datatargetSubscription = this.datatargetService.get(id).subscribe((response: Datatarget) => {
      this.datatarget = response;
    });
  }

  onSubmit(): void {
    this.resetErrors();
    if (this.datatargetId) {
      this.updateDatatarget();
    } else {
      this.createDatatarget();
    }
  }

  ngOnDestroy(): void {
    this.applicationSubscription?.unsubscribe();
    this.datatargetSubscription?.unsubscribe();
  }

  private handleError(error: HttpErrorResponse) {
    const errors = this.errorMessageService.handleErrorMessageWithFields(error);
    this.errorFields = errors.errorFields;
    this.errorMessages = errors.errorMessages;
    this.scrollToTopService.scrollToTop();
  }

  private resetErrors() {
    this.errorFields = [];
    this.errorMessages = undefined;
    this.formFailedSubmit = false;
    this.activeApiCalls = 0;
  }

  private updateDatatarget(): void {
    this.activeApiCalls += 1;
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

  private createDatatarget(): void {
    this.datatarget.organizationId = this.organizationId;
    this.datatargetService.create(this.datatarget).subscribe({
      next: (response: Datatarget) => {
        this.datatargetId = response.id;
        this.datatarget = response;
        this.snackService.showSavedSnack();
        this.routeToCreatedDatatarget();
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
        this.formFailedSubmit = true;
      },
    });
  }

  private countToRedirect() {
    this.activeApiCalls -= 1;
    if (this.activeApiCalls <= 0 && !this.formFailedSubmit) {
      this.snackService.showSavedSnack();
      this.routeToDatatargets();
    }
  }
}
