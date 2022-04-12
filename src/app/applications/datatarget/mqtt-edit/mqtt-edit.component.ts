import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '@applications/application.model';
import { ApplicationService } from '@applications/application.service';
import { MqttAuthenticationType } from '@applications/enums/mqtt-authentication-type.enum';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import {
  PayloadDeviceDatatarget,
  PayloadDeviceDatatargetGetByDataTargetResponse,
} from '@payload-decoder/payload-device-data.model';
import { PayloadDeviceDatatargetService } from '@payload-decoder/payload-device-datatarget.service';
import { DataTargetType } from '@shared/enums/datatarget-type';
import { ErrorMessageService } from '@shared/error-message.service';
import { ScrollToTopService } from '@shared/services/scroll-to-top.service';
import { SnackService } from '@shared/services/snack.service';
import { Subscription } from 'rxjs';
import { Datatarget, MqttDataTarget } from '../datatarget.model';
import { DatatargetService } from '../datatarget.service';

@Component({
  selector: 'app-mqtt-edit',
  templateUrl: './mqtt-edit.component.html',
  styleUrls: ['./mqtt-edit.component.scss'],
})
export class MqttEditComponent implements OnInit {
  public errorMessages: string[];
  public errorFields: string[];
  public formFailedSubmit = false;
  public datatarget: MqttDataTarget = new MqttDataTarget();
  public datatargetId: number;
  private applicationId: number;
  private datatargetSubscription: Subscription;
  private applicationSubscription: Subscription;
  private relationSubscription: Subscription;
  private payloadDeviceDatatarget: PayloadDeviceDatatarget[];
  public devices: IotDevice[];
  private counter: number;
  // TODO: Unused?
  public authenticationMethod: MqttAuthenticationType;
  public faQuestionCircle = faQuestionCircle;
  MqttAuthenticationType = MqttAuthenticationType;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
    private datatargetService: DatatargetService,
    private payloadDeviceDatatargetService: PayloadDeviceDatatargetService,
    private snackService: SnackService,
    private errorMessageService: ErrorMessageService,
    private scrollToTopService: ScrollToTopService
  ) {}

  ngOnInit(): void {
    this.authenticationMethod = MqttAuthenticationType.UsernamePassword;
    this.datatargetId = +this.route.snapshot.paramMap.get('datatargetId');
    this.applicationId = +this.route.snapshot.paramMap.get('id');

    if (this.datatargetId !== 0) {
      this.getDatatarget(this.datatargetId);
      this.getPayloadDeviceDatatarget(this.datatargetId);
    }
    if (this.applicationId !== 0) {
      this.getDevices();
    }
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
        this.devices = application.iotDevices;
      });
  }

  getPayloadDeviceDatatarget(id: number) {
    this.relationSubscription = this.payloadDeviceDatatargetService
      .getByDataTarget(id)
      .subscribe((response: PayloadDeviceDatatargetGetByDataTargetResponse) => {
        this.mapToDatatargetDevicePayload(response);
      });
  }

  // TODO: Duplicate code
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

  onSubmit(): void {
    this.counter = 0;
    if (this.datatargetId) {
      this.updateDatatarget();
      this.addPayloadDeviceDatatarget();
    } else {
      this.createDatatarget();
    }
  }

  private updateDatatarget(): void {
    this.counter =
      1 +
      (this.payloadDeviceDatatarget?.length
        ? this.payloadDeviceDatatarget?.length
        : 0);
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
    this.counter -= 1;
    if (this.counter <= 0 && !this.formFailedSubmit) {
      this.snackService.showSavedSnack();
      this.routeToDatatargets();
    }
  }
}
