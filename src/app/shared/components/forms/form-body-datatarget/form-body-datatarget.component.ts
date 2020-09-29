import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PayloadDecoderResponse } from '@app/payload-decoder/payload-decoder.model';
import { DatatargetResponse } from '@applications/datatarget/datatarget-response.model';
import { Datatarget } from '@applications/datatarget/datatarget.model';
import { DatatargetService } from '@applications/datatarget/datatarget.service';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { PayloadDecoderService } from '@app/payload-decoder/payload-decoder.service';
import { PayloadDeviceDatatarget, PayloadDeviceDatatargetGetByDataTargetResponse } from '@app/payload-decoder/payload-device-data.model';
import { PayloadDeviceDatatargetService } from '@app/payload-decoder/payload-device-datatarget.service';
import { Application } from '@applications/application.model';
import { ApplicationService } from '@applications/application.service';

@Component({
  selector: 'app-form-body-datatarget',
  templateUrl: './form-body-datatarget.component.html',
  styleUrls: ['./form-body-datatarget.component.scss']
})
export class FormBodyDatatargetComponent implements OnInit, OnDestroy {
  @Input() submitButton: string;
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
  public application: Application;
  public devices: IotDevice[];
  public payloadDecoders = [];

  payloadDeviceDatatarget: PayloadDeviceDatatarget[];
  newDynamic: any = {};

  constructor(
    private route: ActivatedRoute,
    public translate: TranslateService,
    private datatargetService: DatatargetService,
    private location: Location,
    private applicationService: ApplicationService,
    private payloadDecoderService: PayloadDecoderService,
    private payloadDeviceDataTargetService: PayloadDeviceDatatargetService
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.datatargetid = +this.route.snapshot.paramMap.get('datatargetId');
    this.applicationId = +this.route.snapshot.paramMap.get('id');
    if (this.datatargetid !== 0) {
      this.getDatatarget(this.datatargetid);
      this.getPayloadDeviceDatatarget(this.datatargetid);
    }
    if (this.applicationId !== 0) {
      this.getDevices();
    }
    this.getPayloadDecoders();
    console.log(this.devices, this.payloadDecoders);
  }

  addRow() {
    if (!this.payloadDeviceDatatarget) {
      this.payloadDeviceDatatarget = [];
    }
    this.payloadDeviceDatatarget.push({ id: null, iotDeviceIds: [], payloadDecoderId: null, dataTargetId: this.datatargetid });
  }

  deleteRow(index) {
    if (this.payloadDeviceDatatarget.length === 0) {
    } else if (this.payloadDeviceDatatarget[index]?.id === null) {
      this.payloadDeviceDatatarget.splice(index, 1);
    } else {
      this.payloadDeviceDataTargetService.delete(this.payloadDeviceDatatarget[index].id)
        .subscribe((response) => {
          this.payloadDeviceDatatarget.splice(index, 1);
        });
    }
  }

  onSubmit(): void {
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
    this.datatargetService.update(this.datatarget)
      .subscribe(
        (datatargetResponse: DatatargetResponse) => {
          this.datatarget = this.mapToDatatarget(datatargetResponse);
        },
        (error: HttpErrorResponse) => {
          this.handleError(error);
          this.formFailedSubmit = true;
        }
      );
  }

  addPayloadDeviceDatatarget() {
    this.payloadDeviceDatatarget.forEach((relation) => {
      if (relation.id) {
        this.payloadDeviceDataTargetService.put(relation).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            this.handleError(error);
          }
        );
      } else {
        this.payloadDeviceDataTargetService.post(relation).subscribe(
          (res: any) => {
            console.log(res);
          },
          (error) => {
            this.handleError(error);
          }
        );
      }
    });
  }

  getPayloadDeviceDatatarget(id: number) {
    this.relationSubscription = this.payloadDeviceDataTargetService
      .getByDataTarget(id)
      .subscribe((response: PayloadDeviceDatatargetGetByDataTargetResponse) => {
        this.mapToDatatargetDevicePayload(response);
      });
  }

  createDatatarget() {
    this.datatarget.applicationId = this.applicationId;
    this.datatargetService.create(this.datatarget)
      .subscribe((response) => {
        this.datatargetid = response.id;
        this.datatarget.id = response.id;
      },
        (error: HttpErrorResponse) => {
          this.handleError(error);
          this.formFailedSubmit = true;
        });

  }

  getDevices(): void {
    this.applicationSubscription = this.applicationService.getApplication(this.applicationId)
      .subscribe((application: Application) => {
        this.devices = application.iotDevices;
      });
  }

  public selectAllDevices(index: number) {
    console.log(this.payloadDeviceDatatarget[0].iotDeviceIds);
    this.payloadDeviceDatatarget[index].iotDeviceIds = this.devices.map(device => device.id);
  }

  public deSelectAllDevices(index: number) {
    console.log(this.payloadDeviceDatatarget[0].iotDeviceIds);
    this.payloadDeviceDatatarget[index].iotDeviceIds = [];
  }

  getPayloadDecoders() {
    this.payloadDecoderSubscription = this.payloadDecoderService.getMultiple()
      .subscribe((response: PayloadDecoderResponse) => {
        this.payloadDecoders = response.data;
      });
  }

  handleError(error: HttpErrorResponse) {
    this.errorFields = [];
    this.errorMessages = [];
    if (typeof error.error.message === 'string') {
      this.errorMessages.push(error.error.message);
    } else {
      error.error.message.forEach((err) => {
        this.errorFields.push(err.property);
        this.errorMessages = this.errorMessages.concat(
          Object.values(err.constraints)
        );
      });
    }
  }

  routeBack(): void {
    this.location.back();
  }

  onCoordinateKey(event: any) {
    console.log(event.target.value);
    console.log(event.target.maxLength);
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(
        0,
        event.target.maxLength
      );
    }
  }

  getDatatarget(id: number) {
    this.datatargetSubscription = this.datatargetService
      .get(id)
      .subscribe((datatargetResponse: DatatargetResponse) => {
        this.datatarget = this.mapToDatatarget(datatargetResponse);
      });
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

  private mapToDatatargetDevicePayload(dto: PayloadDeviceDatatargetGetByDataTargetResponse) {
    this.payloadDeviceDatatarget = [];
    dto.data.forEach(
      (element) => {
        this.payloadDeviceDatatarget.push({
          id: element.id,
          iotDeviceIds: element.iotDevices.map((x) => x.id),
          payloadDecoderId: element.payloadDecoder?.id,
          dataTargetId: element.dataTarget.id
        });
      }
    );
  }

  private mapToDatatarget(data: DatatargetResponse): Datatarget {
    const dt: Datatarget = {
      id: data.id,
      name: data.name,
      timeout: data.timeout,
      type: data.type,
      url: data.url,
      authorizationHeader: null,
      applicationId: data.application.id
    };
    return dt;
  }

}
