import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '@applications/application.model';
import { ApplicationService } from '@applications/application.service';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import {
  faQuestionCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  PayloadDecoder,
  PayloadDecoderMappedResponse,
} from '@payload-decoder/payload-decoder.model';
import { PayloadDecoderService } from '@payload-decoder/payload-decoder.service';
import {
  PayloadDeviceDatatarget,
  PayloadDeviceDatatargetGetByDataTargetResponse,
} from '@payload-decoder/payload-device-data.model';
import { PayloadDeviceDatatargetService } from '@payload-decoder/payload-device-datatarget.service';
import { DeleteDialogComponent } from '@shared/components/delete-dialog/delete-dialog.component';
import { DataTargetType } from '@shared/enums/datatarget-type';
import { ErrorMessageService } from '@shared/error-message.service';
import { ScrollToTopService } from '@shared/services/scroll-to-top.service';
import { SnackService } from '@shared/services/snack.service';
import { Subscription } from 'rxjs';
import { DatatargetEdit } from '../datatarget-edit/datatarget-edit';
import { Datatarget } from '../datatarget.model';
import { DatatargetService } from '../datatarget.service';

@Component({
  selector: 'app-mqtt-edit',
  templateUrl: './mqtt-edit.component.html',
  styleUrls: ['./mqtt-edit.component.scss'],
})
// TODO: Most of the code is duplicated from other datatarget edit components.
// Same applies to the html file. One solution is extending a base datatarget-edit component
export class MqttEditComponent implements DatatargetEdit, OnInit, OnDestroy {
  public errorMessages: string[];
  public errorFields: string[];
  public formFailedSubmit = false;
  public datatarget: Datatarget = new Datatarget();
  public datatargetId: number;
  private applicationId: number;
  private datatargetSubscription: Subscription;
  private applicationSubscription: Subscription;
  private relationSubscription: Subscription;
  private payloadDecoderSubscription: Subscription;
  public payloadDecoders: PayloadDecoder[] = [];
  public payloadDeviceDatatarget: PayloadDeviceDatatarget[];
  public devices: IotDevice[];
  private activeApiCalls: number;
  faTimesCircle = faTimesCircle;
  faQuestionCircle = faQuestionCircle;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
    private datatargetService: DatatargetService,
    private payloadDecoderService: PayloadDecoderService,
    private payloadDeviceDatatargetService: PayloadDeviceDatatargetService,
    private dialog: MatDialog,
    private snackService: SnackService,
    private errorMessageService: ErrorMessageService,
    private scrollToTopService: ScrollToTopService
  ) {}

  ngOnInit(): void {
    this.datatargetId = +this.route.snapshot.paramMap.get('datatargetId');
    this.applicationId = +this.route.snapshot.paramMap.get('id');
    this.datatarget.type = DataTargetType.MQTT;

    if (this.datatargetId !== 0) {
      this.getDatatarget(this.datatargetId);
      this.getPayloadDeviceDatatarget(this.datatargetId);
    }
    if (this.applicationId !== 0) {
      this.getDevices();
    }
    this.getPayloadDecoders();
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

  private handleError(error: HttpErrorResponse) {
    const errors = this.errorMessageService.handleErrorMessageWithFields(error);
    this.errorFields = errors.errorFields;
    this.errorMessages = errors.errorMessages;
    this.scrollToTopService.scrollToTop();
  }

  routeToDatatargets(): void {
    this.router.navigate(['applications', this.applicationId.toString()]);
  }

  getDatatarget(id: number) {
    this.datatargetSubscription = this.datatargetService
      .get(id)
      .subscribe((response: Datatarget) => {
        this.datatarget = response;
      });
  }

  getDevices(): void {
    this.applicationSubscription = this.applicationService
      .getApplication(this.applicationId)
      .subscribe((application: Application) => {
        this.devices = application.iotDevices.sort((a, b) =>
          a.name.localeCompare(b.name, 'en', { numeric: true })
        );
      });
  }

  getPayloadDeviceDatatarget(id: number) {
    this.relationSubscription = this.payloadDeviceDatatargetService
      .getByDataTarget(id)
      .subscribe((response: PayloadDeviceDatatargetGetByDataTargetResponse) => {
        this.mapToDatatargetDevicePayload(response);
      });
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

  public selectAllDevices(index: number) {
    this.payloadDeviceDatatarget[index].iotDeviceIds = this.devices.map(
      (device) => device.id
    );
  }

  public deselectAllDevices(index: number) {
    this.payloadDeviceDatatarget[index].iotDeviceIds = [];
  }

  public addRow() {
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
      this.payloadDeviceDatatargetService
        .delete(this.payloadDeviceDatatarget[index].id)
        .subscribe(() => {
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

  private resetErrors() {
    this.errorFields = [];
    this.errorMessages = undefined;
    this.formFailedSubmit = false;
    this.activeApiCalls = 0;
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

  private updateDatatarget(): void {
    this.activeApiCalls += 1;
    this.datatargetService.update(this.datatarget).subscribe(
      (response: Datatarget) => {
        this.datatarget = response;
        this.countToRedirect();
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
        this.formFailedSubmit = true;
      }
    );
  }

  private createDatatarget(): void {
    this.datatarget.applicationId = this.applicationId;
    this.datatargetService.create(this.datatarget).subscribe(
      (response: Datatarget) => {
        this.datatargetId = response.id;
        this.datatarget = response;
        this.snackService.showSavedSnack();
        this.routeToDatatargets();
      },
      (error: HttpErrorResponse) => {
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
      this.activeApiCalls += 1;

      if (relation.id) {
        this.payloadDeviceDatatargetService.put(relation).subscribe(
          () => {
            this.countToRedirect();
          },
          (error) => {
            this.handleError(error);
          }
        );
      } else {
        this.payloadDeviceDatatargetService.post(relation).subscribe(
          () => {
            this.countToRedirect();
          },
          (error) => {
            this.handleError(error);
          }
        );
      }
    });
  }

  private countToRedirect() {
    this.activeApiCalls -= 1;
    if (this.activeApiCalls <= 0 && !this.formFailedSubmit) {
      this.snackService.showSavedSnack();
      this.routeToDatatargets();
    }
  }

  ngOnDestroy(): void {
    this.relationSubscription?.unsubscribe();
    this.applicationSubscription?.unsubscribe();
    this.datatargetSubscription?.unsubscribe();
    this.payloadDecoderSubscription?.unsubscribe();
  }
}
