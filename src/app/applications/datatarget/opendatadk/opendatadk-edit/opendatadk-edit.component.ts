import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Application } from "@applications/application.model";
import { ApplicationService } from "@applications/application.service";
import { DatatargetEdit } from "@applications/datatarget/datatarget-edit/datatarget-edit";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { faQuestionCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { TranslateService } from "@ngx-translate/core";
import { PayloadDecoderMappedResponse } from "@payload-decoder/payload-decoder.model";
import { PayloadDecoderService } from "@payload-decoder/payload-decoder.service";
import {
  PayloadDeviceDatatarget,
  PayloadDeviceDatatargetGetManyResponse,
} from "@payload-decoder/payload-device-data.model";
import { PayloadDeviceDatatargetService } from "@payload-decoder/payload-device-datatarget.service";
import { DeleteDialogComponent } from "@shared/components/delete-dialog/delete-dialog.component";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { DataTargetType } from "@shared/enums/datatarget-type";
import { ErrorMessageService } from "@shared/error-message.service";
import { MeService } from "@shared/services/me.service";
import { ScrollToTopService } from "@shared/services/scroll-to-top.service";
import { SnackService } from "@shared/services/snack.service";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { first } from "rxjs/operators";
import { Datatarget, OddkMailInfo } from "../../datatarget.model";
import { DatatargetService } from "../../datatarget.service";
import { OpenDataDkDataset } from "../../opendatadk/opendatadk-dataset.model";
import { OpenDataDkMailDialogComponent } from "./opendatadk-mail-dialog/opendatadk-mail-dialog";
import { OpenDataDkWarningDialogComponent } from "./opendatadk-warning-dialog/opendatadk-warning-dialog";

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

  selectableKeyword = [
    "Befolkning og samfund",
    "Energi",
    "Internationale spørgsmål",
    "Landbrug, fiskeri, skovbrug og fødevarer",
    "Midlertidige data",
    "Miljø",
    "Regeringen og den offentlige sektor",
    "Regioner og byer",
    "Retfærdighed, retssystem og offentlig sikkerhed",
    "Sundhed",
    "Transport",
    "Uddannelse, kultur og sport",
    "Videnskab og teknologi",
    "Økonomi og finanser",
  ];

  errorMessages: any[];
  errorFields: string[];

  datatarget: Datatarget = new Datatarget();
  formFailedSubmit = false;
  datatargetId: number;
  devices: IotDevice[];
  payloadDecoders = [];
  payloadDeviceDatatarget: PayloadDeviceDatatarget[];
  canEdit: boolean;
  private subscriptions = [];
  private applicationId: number;
  private pendingRequestsCounter: number;
  private alreadySentOddkMail: boolean = false;

  constructor(
    translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private datatargetService: DatatargetService,
    private applicationService: ApplicationService,
    private payloadDecoderService: PayloadDecoderService,
    private payloadDeviceDataTargetService: PayloadDeviceDatatargetService,
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
    this.applicationId = +this.route.snapshot.paramMap.get("id");
    if (this.applicationId !== 0) {
      this.getDevices();
      this.getPayloadDecoders();
    }
    if (this.datatargetId !== 0) {
      this.title = "FORM.EDIT-DATATARGET";
      this.getDatatarget(this.datatargetId);
      this.getPayloadDeviceDatatarget(this.datatargetId);
    }
    this.getAlreadySentOddkMail();

    this.canEdit = this.meService.hasAccessToTargetOrganization(
      OrganizationAccessScope.ApplicationWrite,
      undefined,
      this.applicationId
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s?.unsubscribe());
  }

  onSubmit(): void {
    this.resetErrors();
    if (this.datatargetId) {
      if (!this.validatePayloadDeviceDatatarget()) return;
      this.pendingRequestsCounter = 1 + (this.payloadDeviceDatatarget?.length ?? 0);
      this.updateDatatarget();
      this.addPayloadDeviceDatatarget();
    } else {
      this.createDatatarget();
    }
  }

  routeToDatatargets = () => this.router.navigate(["applications", this.applicationId, "data-targets"]);

  routeToCreatedDatatarget = () =>
    this.router.navigate(["applications", this.applicationId, "datatarget", this.datatarget.id], {
      replaceUrl: true,
    });

  addRow() {
    if (!this.payloadDeviceDatatarget) {
      this.payloadDeviceDatatarget = [];
    }
    this.payloadDeviceDatatarget.push({
      id: null,
      iotDeviceIds: [],
      payloadDecoderId: null,
      dataTargetId: this.datatargetId,
    });
  }

  openDeleteDialog(index) {
    const dialog = this.dialog.open(DeleteDialogComponent, {
      data: {
        showAccept: true,
        showCancel: true,
        message: "Er du sikker på at du vil slette?",
      },
    });
    dialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteRow(index);
      }
    });
  }

  payloadDevicesDropdownCompare = (o1: any, o2: any): boolean => o1 === o2;

  selectAllDevices(index: number) {
    this.payloadDeviceDatatarget[index].iotDeviceIds = this.devices.map(device => device.id);
  }

  deSelectAllDevices(index: number) {
    this.payloadDeviceDatatarget[index].iotDeviceIds = [];
  }

  private getPayloadDeviceDatatarget(id: number) {
    this.subscriptions.push(
      this.payloadDeviceDataTargetService
        .getByDataTarget(id)
        .subscribe((dto: PayloadDeviceDatatargetGetManyResponse) => {
          this.payloadDeviceDatatarget = [];
          dto.data.forEach(element => {
            this.payloadDeviceDatatarget.push({
              id: element.id,
              iotDeviceIds: element.iotDevices.map(x => x.id),
              payloadDecoderId: element.payloadDecoder?.id === undefined ? 0 : element.payloadDecoder?.id,
              dataTargetId: element.dataTarget.id,
            });
          });
        })
    );
  }

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

  private addPayloadDeviceDatatarget() {
    this.payloadDeviceDatatarget.forEach(relation => {
      if (relation.payloadDecoderId === 0) {
        relation.payloadDecoderId = null;
      }
      if (relation.id) {
        this.subscriptions.push(
          this.payloadDeviceDataTargetService.put(relation).subscribe({
            next: () => this.countToRedirect(),
            error: error => this.handleError(error),
          })
        );
      } else {
        this.subscriptions.push(
          this.payloadDeviceDataTargetService.post(relation).subscribe({
            next: () => this.countToRedirect(),
            error: error => this.handleError(error),
          })
        );
      }
    });
  }

  private validatePayloadDeviceDatatarget = () => {
    const isError = this.payloadDeviceDatatarget?.some(relation => (relation.iotDeviceIds?.length ?? 0) < 1);
    if (isError) {
      this.errorFields = ["devices"];
      this.errorMessages = ["Must attach at least one IoT-device for each element in list of devices / decoders"];
      this.scrollToTopService.scrollToTop();
    }
    return !isError;
  };

  private createDatatarget() {
    this.pendingRequestsCounter = 0;
    this.datatarget.applicationId = this.applicationId;
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

  // For list of devices / payload-decoders
  private getDevices(): void {
    this.subscriptions.push(
      this.applicationService.getApplication(this.applicationId).subscribe((application: Application) => {
        this.devices = application.iotDevices.sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }));
      })
    );
  }

  private getPayloadDecoders() {
    this.subscriptions.push(
      this.payloadDecoderService
        .getMultiple(1000, 0, "id", "ASC")
        .subscribe((response: PayloadDecoderMappedResponse) => {
          this.payloadDecoders = response.data.sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }));
        })
    );
  }

  private deleteRow(index) {
    if (this.payloadDeviceDatatarget.length === 0) {
    } else if (this.payloadDeviceDatatarget[index]?.id === null) {
      this.payloadDeviceDatatarget.splice(index, 1);
    } else {
      this.subscriptions.push(
        this.payloadDeviceDataTargetService.delete(this.payloadDeviceDatatarget[index].id).subscribe(response => {
          this.payloadDeviceDatatarget.splice(index, 1);
        })
      );
    }
  }
}
