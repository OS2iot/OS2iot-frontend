import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '@applications/application.model';
import { ApplicationService } from '@applications/application.service';
import { DatatargetEdit } from '@applications/datatarget/datatarget-edit/datatarget-edit';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import {
  faQuestionCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { PayloadDecoderMappedResponse } from '@payload-decoder/payload-decoder.model';
import { PayloadDecoderService } from '@payload-decoder/payload-decoder.service';
import {
  PayloadDeviceDatatarget,
  PayloadDeviceDatatargetGetByDataTargetResponse,
} from '@payload-decoder/payload-device-data.model';
import { PayloadDeviceDatatargetService } from '@payload-decoder/payload-device-datatarget.service';
import { DeleteDialogComponent } from '@shared/components/delete-dialog/delete-dialog.component';
import { OpendatadkDialogService } from '@shared/components/opendatadk-dialog/opendatadk-dialog.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';
import { DataTargetType } from '@shared/enums/datatarget-type';
import { ErrorMessageService } from '@shared/error-message.service';
import { MeService } from '@shared/services/me.service';
import { OpendatadkService } from '@shared/services/opendatadk.service';
import { ScrollToTopService } from '@shared/services/scroll-to-top.service';
import { SnackService } from '@shared/services/snack.service';
import { Observable, Subscription } from 'rxjs';
import { Datatarget } from '../../datatarget.model';
import { DatatargetService } from '../../datatarget.service';
import { OpenDataDkDataset } from '../../opendatadk/opendatadk-dataset.model';

@Component({
  selector: 'app-opendatadk-edit',
  templateUrl: './opendatadk-edit.component.html',
  styleUrls: ['./opendatadk-edit.component.scss'],
})
export class OpendatadkEditComponent implements DatatargetEdit, OnDestroy {
  faQuestionCircle = faQuestionCircle;
  faTimesCircle = faTimesCircle;

  title = 'FORM.CREATE-NEW-DATATARGET';

  errorMessages: any[];
  errorFields: string[];

  datatarget: Datatarget = new Datatarget();
  private datatargetSubscription: Subscription;
  private relationSubscription: Subscription;
  private applicationSubscription: Subscription;
  private payloadDecoderSubscription: Subscription;
  private dataExistsSubscription: Subscription;

  formFailedSubmit = false;
  datatargetId: number;
  private applicationId: number;
  devices: IotDevice[];
  payloadDecoders = [];
  private counter: number;
  private dataSetExists = false;
  private isMailDialogAlreadyShown = false;

  payloadDeviceDatatarget: PayloadDeviceDatatarget[];
  canEdit: boolean;

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
    private opendatadkService: OpendatadkService,
    private opendatadkDialogService: OpendatadkDialogService,
    private scrollToTopService: ScrollToTopService,
    private meService: MeService
  ) {
    translate.use('da');

    this.datatarget.type = DataTargetType.OPENDATADK;
    this.datatarget.setToOpendataDk = true;

    this.datatargetId = +this.route.snapshot.paramMap.get('datatargetId');
    this.applicationId = +this.route.snapshot.paramMap.get('id');
    if (this.datatargetId !== 0) {
      this.title = 'FORM.EDIT-DATATARGET';
      this.getDatatarget(this.datatargetId);
      this.getPayloadDeviceDatatarget(this.datatargetId);
    }
    if (this.applicationId !== 0) {
      this.getDevices();
    }
    this.getPayloadDecoders();
    this.getDataSetExists();
    this.canEdit = this.meService.hasAccessToTargetOrganization(
      OrganizationAccessScope.ApplicationWrite,
      undefined,
      this.applicationId
    );
  }

  ngOnDestroy(): void {
    this.relationSubscription?.unsubscribe();
    this.applicationSubscription?.unsubscribe();
    this.datatargetSubscription?.unsubscribe();
    this.payloadDecoderSubscription?.unsubscribe();
    this.dataExistsSubscription?.unsubscribe();
  }

  private getPayloadDeviceDatatarget(id: number) {
    this.relationSubscription = this.payloadDeviceDataTargetService
      .getByDataTarget(id)
      .subscribe((dto: PayloadDeviceDatatargetGetByDataTargetResponse) => {
        this.payloadDeviceDatatarget = [];
        dto.data.forEach((element) => {
          this.payloadDeviceDatatarget.push({
            id: element.id,
            iotDeviceIds: element.iotDevices.map((x) => x.id),
            payloadDecoderId:
              element.payloadDecoder?.id === undefined
                ? 0
                : element.payloadDecoder?.id,
            dataTargetId: element.dataTarget.id,
          });
        });
      });
  }

  private getDatatarget(id: number) {
    this.datatargetSubscription = this.datatargetService
      .get(id)
      .subscribe((response: Datatarget) => {
        this.datatarget = response;
        if (this.datatarget.openDataDkDataset != null) {
          this.datatarget.openDataDkDataset.acceptTerms = true;
        }
      });
  }
  private getDataSetExists() {
    this.dataExistsSubscription = this.opendatadkService
      .get()
      .subscribe((response) => {
        this.dataSetExists = response.dataset.length !== 0;
      });
  }

  onSubmit(): void {
    this.resetErrors();
    if (this.datatargetId) {
      this.updateDatatarget();
      this.addPayloadDeviceDatatarget();
    } else {
      this.createDatatarget();
    }
  }
  private updateDatatarget() {
    this.counter = 1 + (this.payloadDeviceDatatarget?.length ?? 0);
    this.datatargetService.update(this.datatarget).subscribe(
      (response: Datatarget) => {
        this.datatarget = response;
        if (this.datatarget.openDataDkDataset != null) {
          this.datatarget.openDataDkDataset.acceptTerms = true;
        }
        this.shouldShowMailDialog().subscribe((response) => {
          this.countToRedirect();
        });
      },
      (error: HttpErrorResponse) => {
        this.checkDataTargetModelOpendatadkdatasaet();
        this.handleError(error);
        this.formFailedSubmit = true;
      }
    );
  }
  private addPayloadDeviceDatatarget() {
    this.payloadDeviceDatatarget.map((pdd) => {
      if (pdd.payloadDecoderId === 0) {
        pdd.payloadDecoderId = null;
      }
    });
    this.payloadDeviceDatatarget.forEach((relation) => {
      if (relation.id) {
        this.payloadDeviceDataTargetService.put(relation).subscribe(
          (response) => {
            this.countToRedirect();
          },
          (error) => {
            this.handleError(error);
          }
        );
      } else {
        this.payloadDeviceDataTargetService.post(relation).subscribe(
          (res: any) => {
            this.countToRedirect();
          },
          (error) => {
            this.handleError(error);
          }
        );
      }
    });
  }
  private createDatatarget() {
    this.counter = 0;
    this.datatarget.applicationId = this.applicationId;
    this.datatargetService.create(this.datatarget).subscribe(
      (response: Datatarget) => {
        this.datatargetId = response.id;
        this.datatarget = response;
        if (this.datatarget.openDataDkDataset != null) {
          this.datatarget.openDataDkDataset.acceptTerms = true;
        }
        this.saveSnackService.showSavedSnack();
        this.routeToDatatargets();
      },
      (error: HttpErrorResponse) => {
        this.checkDataTargetModelOpendatadkdatasaet();
        this.handleError(error);
        this.formFailedSubmit = true;
      }
    );
  }
  private countToRedirect() {
    this.counter -= 1;
    if (this.counter <= 0 && !this.formFailedSubmit) {
      this.saveSnackService.showSavedSnack();
      this.routeToDatatargets();
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
  private shouldShowMailDialog(): Observable<any> {
    return new Observable((observer) => {
      if (
        !this.dataSetExists &&
        this.datatarget.setToOpendataDk &&
        !this.isMailDialogAlreadyShown
      ) {
        this.isMailDialogAlreadyShown = true;
        this.opendatadkDialogService.showDialog().subscribe((response) => {
          if (response) {
            this.showMailClient();
          }
          observer.next(response);
        });
      } else {
        observer.next(true);
      }
    });
  }
  private showMailClient() {
    if (!this.datatarget.openDataDkDataset.url) {
      this.datatarget.openDataDkDataset.url = this.datatargetService.getOpendataSharingApiUrl();
    }
    window.location.href =
      'mailto:FG2V@kk.dk?subject=Oprettelse%20af%20datas%C3%A6t%20i%20OpenDataDK&body=K%C3%A6re%20Frans%0D%0A%0D%0AHermed%20fremsendes%20linket%20til%20DCAT%20kataloget%20%2C%20du%20bedes%20registrere%20p%C3%A5%20Open%20Data%20DK%20platformen.%0D%0A%0D%0ALink%3A ' +
      this.datatarget.openDataDkDataset.url;
  }

  routeToDatatargets(): void {
    this.router.navigate(['applications', this.applicationId.toString()]);
  }

  //TODO: Would be better to store this as a flag/field instead
  disableSaveButton(): boolean {
    let disable = true;
    if (!this.datatarget.setToOpendataDk) {
      disable = false;
    } else if (this.datatarget.openDataDkDataset?.acceptTerms) {
      disable = false;
    } else {
      disable = true;
    }
    return disable;
  }

  // For list of devices / payload-decoders
  private getDevices(): void {
    this.applicationSubscription = this.applicationService
      .getApplication(this.applicationId)
      .subscribe((application: Application) => {
        this.devices = application.iotDevices.sort((a, b) =>
          a.name.localeCompare(b.name, 'en', { numeric: true })
        );
      });
  }
  private getPayloadDecoders() {
    this.payloadDecoderSubscription = this.payloadDecoderService
      .getMultiple(1000, 0, 'id', 'ASC')
      .subscribe((response: PayloadDecoderMappedResponse) => {
        this.payloadDecoders = response.data.sort((a, b) =>
          a.name.localeCompare(b.name, 'en', { numeric: true })
        );
      });
  }
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
  private deleteRow(index) {
    if (this.payloadDeviceDatatarget.length === 0) {
    } else if (this.payloadDeviceDatatarget[index]?.id === null) {
      this.payloadDeviceDatatarget.splice(index, 1);
    } else {
      this.payloadDeviceDataTargetService
        .delete(this.payloadDeviceDatatarget[index].id)
        .subscribe((response) => {
          this.payloadDeviceDatatarget.splice(index, 1);
        });
    }
  }
  openDeleteDialog(index) {
    const dialog = this.dialog.open(DeleteDialogComponent, {
      data: {
        showAccept: true,
        showCancel: true,
        message: 'Er du sikker på at du vil slette?',
      },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteRow(index);
      }
    });
  }
  payloadDevicesDropdownCompare = (o1: any, o2: any): boolean => o1 === o2;
  selectAllDevices(index: number) {
    this.payloadDeviceDatatarget[index].iotDeviceIds = this.devices.map(
      (device) => device.id
    );
  }
  deSelectAllDevices(index: number) {
    this.payloadDeviceDatatarget[index].iotDeviceIds = [];
  }
}
