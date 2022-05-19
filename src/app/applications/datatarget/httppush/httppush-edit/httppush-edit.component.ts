import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Datatarget } from '../../datatarget.model';
import { Observable, Subscription } from 'rxjs';
import { Application } from '@applications/application.model';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import {
  PayloadDeviceDatatarget,
  PayloadDeviceDatatargetGetByDataTargetResponse,
} from '@payload-decoder/payload-device-data.model';
import { DatatargetService } from '../../datatarget.service';
import { ApplicationService } from '@applications/application.service';
import { PayloadDecoderService } from '@payload-decoder/payload-decoder.service';
import { PayloadDeviceDatatargetService } from '@payload-decoder/payload-device-datatarget.service';
import { SnackService } from '@shared/services/snack.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { PayloadDecoderMappedResponse } from '@payload-decoder/payload-decoder.model';
import { DeleteDialogComponent } from '@shared/components/delete-dialog/delete-dialog.component';
import { ErrorMessageService } from '@shared/error-message.service';
import { OpendatadkDialogService } from '@shared/components/opendatadk-dialog/opendatadk-dialog.service';
import { OpendatadkService } from '@shared/services/opendatadk.service';
import { ScrollToTopService } from '@shared/services/scroll-to-top.service';
import { OpenDataDkDataset } from '../../opendatadk/opendatadk-dataset.model';
import { DataTargetType } from '@shared/enums/datatarget-type';
import { DatatargetEdit } from '@applications/datatarget/datatarget-edit/datatarget-edit';
import { MeService } from '@shared/services/me.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-httppush-edit',
  templateUrl: './httppush-edit.component.html',
  styleUrls: ['./httppush-edit.component.scss'],
})
export class HttppushEditComponent
  implements DatatargetEdit, OnInit, OnDestroy {
  public multiPage = false;
  public title = '';
  public sectionTitle = '';
  public backButtonTitle = '';
  public submitButton: string;
  public datatarget: Datatarget = new Datatarget();
  faTimesCircle = faTimesCircle;
  public datatargetSubscription: Subscription;
  public relationSubscription: Subscription;
  public applicationSubscription: Subscription;
  public payloadDecoderSubscription: Subscription;
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  public datatargetid: number;
  private applicationId: number;
  private applicationName: string;
  public application: Application;
  public devices: IotDevice[];
  public payloadDecoders = [];
  private counter: number;
  private dataSetExcists = false;
  private isMailDialogAlreadyShown = false;

  payloadDeviceDatatarget: PayloadDeviceDatatarget[];
  newDynamic: any = {};
  canEdit: boolean;

  constructor(
    public translate: TranslateService,
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
    private meService: MeService,
  ) {
    translate.use('da');
  }

  ngOnInit() {
    this.translate
      .get([
        'FORM.CREATE-NEW-DATATARGET',
        'FORM.EDIT-DATATARGET',
        'DATATARGET.SAVE',
        'NAV.DATATARGET',
      ])
      .subscribe((translations) => {
        const datatargetid = +this.route.snapshot.paramMap.get('datatargetId');
        if (datatargetid !== 0) {
          this.title = translations['FORM.EDIT-DATATARGET'];
        } else {
          this.title = translations['FORM.CREATE-NEW-DATATARGET'];
        }
        this.submitButton = translations['DATATARGET.SAVE'];
        this.backButtonTitle = translations['NAV.DATATARGET'];
      });

    this.datatargetid = +this.route.snapshot.paramMap.get('datatargetId');
    this.applicationId = +this.route.snapshot.paramMap.get('id');
    this.applicationName = this.route.snapshot.paramMap.get('name');
    if (this.datatargetid !== 0) {
      this.getDatatarget(this.datatargetid);
      this.getPayloadDeviceDatatarget(this.datatargetid);
    }
    if (this.applicationId !== 0) {
      this.getDevices();
    }
    this.getPayloadDecoders();
    this.setDataSetExcists();
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite);
  }

  addRow() {
    if (!this.payloadDeviceDatatarget) {
      this.payloadDeviceDatatarget = [];
    }
    this.payloadDeviceDatatarget.push({
      id: null,
      iotDeviceIds: [],
      payloadDecoderId: null,
      dataTargetId: this.datatargetid,
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

  onSubmit(): void {
    this.counter = 0;
    if (this.datatargetid) {
      this.updateDatatarget();
      this.addPayloadDeviceDatatarget();
    } else {
      this.createDatatarget();
    }
  }

  public compare(o1: any, o2: any): boolean {
    return o1 === o2;
  }

  updateDatatarget() {
    this.resetErrors();
    this.counter =
      1 +
      (this.payloadDeviceDatatarget?.length
        ? this.payloadDeviceDatatarget?.length
        : 0);
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

  addPayloadDeviceDatatarget() {
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

  countToRedirect() {
    this.counter -= 1;
    if (this.counter <= 0 && !this.formFailedSubmit) {
      this.showSavedSnack();
      this.routeToDatatargets();
    }
  }

  getPayloadDeviceDatatarget(id: number) {
    this.relationSubscription = this.payloadDeviceDataTargetService
      .getByDataTarget(id)
      .subscribe((response: PayloadDeviceDatatargetGetByDataTargetResponse) => {
        this.mapToDatatargetDevicePayload(response);
      });
  }

  createDatatarget() {
    this.resetErrors();
    this.datatarget.applicationId = this.applicationId;
    this.datatargetService.create(this.datatarget).subscribe(
      (response: Datatarget) => {
        this.datatargetid = response.id;
        this.datatarget = response;
        if (this.datatarget.openDataDkDataset != null) {
          this.datatarget.openDataDkDataset.acceptTerms = true;
        }
        this.showSavedSnack();
        this.routeToDatatargets();
      },
      (error: HttpErrorResponse) => {
        this.checkDataTargetModelOpendatadkdatasaet();
        this.handleError(error);
        this.formFailedSubmit = true;
      }
    );
  }

  private resetErrors() {
    this.errorFields = [];
    this.errorMessages = undefined;
    this.formFailedSubmit = false;
  }

  checkDataTargetModelOpendatadkdatasaet() {
    if (!this.datatarget.openDataDkDataset) {
      this.datatarget.openDataDkDataset = new OpenDataDkDataset();
    }
  }

  getDevices(): void {
    this.applicationSubscription = this.applicationService
      .getApplication(this.applicationId)
      .subscribe((application: Application) => {
        this.devices = application.iotDevices;
      });
  }

  public selectAllDevices(index: number) {
    this.payloadDeviceDatatarget[index].iotDeviceIds = this.devices.map(
      (device) => device.id
    );
  }

  public deSelectAllDevices(index: number) {
    this.payloadDeviceDatatarget[index].iotDeviceIds = [];
  }

  getPayloadDecoders() {
    this.payloadDecoderSubscription = this.payloadDecoderService
      .getMultiple(1000, 0, 'id', 'ASC')
      .subscribe((response: PayloadDecoderMappedResponse) => {
        this.payloadDecoders = response.data;
      });
  }

  handleError(error: HttpErrorResponse) {
    const errors = this.errorMessageService.handleErrorMessageWithFields(error);
    this.errorFields = errors.errorFields;
    this.errorMessages = errors.errorMessages;
    this.scrollToTopService.scrollToTop();
  }

  routeToDatatargets(): void {
    this.router.navigate(['applications', this.applicationId.toString()]);
  }

  onCoordinateKey(event: any) {
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(0, event.target.maxLength);
    }
  }

  getDatatarget(id: number) {
    this.datatargetSubscription = this.datatargetService
      .get(id)
      .subscribe((response: Datatarget) => {
        this.datatarget = response;
      });
  }

  showSavedSnack() {
    this.saveSnackService.showSavedSnack();
  }

  private setDataSetExcists() {
    this.opendatadkService.get().subscribe((response) => {
      this.dataSetExcists = response.dataset.length === 0 ? false : true;
    });
  }

  private shouldShowMailDialog(): Observable<any> {
    return new Observable((observer) => {
      if (
        !this.dataSetExcists &&
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

  ngOnDestroy(): void {
    if (this.relationSubscription) {
      this.relationSubscription.unsubscribe();
    }
    if (this.applicationSubscription) {
      this.applicationSubscription.unsubscribe();
    }
    if (this.datatargetSubscription) {
      this.datatargetSubscription.unsubscribe();
    }
    if (this.payloadDecoderSubscription) {
      this.payloadDecoderSubscription.unsubscribe();
    }
  }

  private mapToDatatargetDevicePayload(
    dto: PayloadDeviceDatatargetGetByDataTargetResponse
  ) {
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
  }
}
