import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { PayloadDecoder } from 'src/app/payload-decoder/payload-decoder.model';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PayloadDecoderService } from '@app/payload-decoder/payload-decoder.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BackButton } from '@shared/models/back-button.model';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { ApplicationService } from '@applications/application.service';
import { Application } from '@applications/application.model';
import * as _ from 'lodash';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { MatSelectChange } from '@angular/material/select';
import { IoTDeviceService } from '@applications/iot-devices/iot-device.service';
import { DeviceModelService } from '@app/device-model/device-model.service';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-payload-decoder-edit',
  templateUrl: './payload-decoder-edit.component.html',
  styleUrls: ['./payload-decoder-edit.component.scss']
})
export class PayloadDecoderEditComponent implements OnInit {
  faExchangeAlt = faExchangeAlt;

  editorJavaScriptOptions = { theme: 'vs', language: 'javascript', autoIndent: true, roundedSelection: true, };
  editorJsonOptions = { theme: 'vs', language: 'json', autoIndent: true, roundedSelection: true, minimap: { enabled: false } };
  payloadData: string = 'Vælg en enhed først';
  metadata: string = 'Vælg en enhed først';
  codeOutput: string = 'Tryk test koden for at decode payload og metadata';

  payloadDecoder = new PayloadDecoder();
  payloadDecoderBody: string;
  public errorMessage: string;
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  public form: FormGroup;
  public backButton: BackButton = { label: '', routerLink: '/payload-decoder' };
  public title = '';
  public submitButton = '';
  id: number;
  subscription: Subscription;
  public applicationsSubscription: Subscription;
  public applications: Application[];
  public application: Application;
  public iotDevices: IotDevice[];
  public iotDevice: IotDevice;
  public name: string;
  public pageLimit = 10;
  public pageTotal: number;
  public pageOffset = 0;
  public deviceSubscription: Subscription;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private payloadDecoderService: PayloadDecoderService,
    private location: Location,
    private applicationService: ApplicationService,
    private globalService: SharedVariableService,
    private iotDeviceService: IoTDeviceService,
    private deviceModelService: DeviceModelService
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.translate.get(['NAV.PAYLOAD-DECODER', 'FORM.EDIT-PAYLOAD-DECODER', 'PAYLOAD-DECODER.SAVE'])
      .subscribe(translations => {
        this.backButton.label = translations['NAV.PAYLOAD-DECODER'];
        this.title = translations['FORM.EDIT-PAYLOAD-DECODER'];
        this.submitButton = translations['PAYLOAD-DECODER.SAVE'];
      });
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id > 0) {
      this.getPayloadDecoder(this.id);
    } else {
      this.payloadDecoderBody = new PayloadDecoder().decodingFunction;
    }
    this.globalService.getValue().subscribe((organisationId) => {
      this.getApplications(organisationId);
    });
  }

  private getPayloadDecoder(id: number) {
    this.subscription = this.payloadDecoderService.getOne(id)
      .subscribe(
        (response) => {
          this.payloadDecoder = response;
          this.payloadDecoderBody = response.decodingFunction;
        });
  }

  decodePayloadFunction(payloadFunction: string, rawMetadata: string, rawPayload: string) {
    const innerMetadata = JSON.stringify(rawMetadata);
    const innerPayloadData = JSON.stringify(rawPayload);
    const innerPayloadFunction = payloadFunction;


    console.log('return: ' + innerMetadata + innerPayloadData);
  }

  getCurrentOrganisationId(): number {
    return this.globalService.getSelectedOrganisationId();
  }

  getApplications(orgId?: number): void {
    this.applicationsSubscription = this.applicationService
      .getApplications(
        this.pageLimit,
        this.pageOffset * this.pageLimit,
        null,
        null,
        orgId ? orgId : this.getCurrentOrganisationId()
      )
      .subscribe((applications) => {
        this.applications = applications.data;
        if (this.pageLimit) {
          this.pageTotal = Math.ceil(applications.count / this.pageLimit);
        }
      });
  }

  getDevices(event: MatSelectChange): void {
    this.applicationsSubscription = this.applicationService.getApplication(event.value)
      .subscribe((application: Application) => {
        this.iotDevices = application.iotDevices;

      });
  }

  getDevice(event: MatSelectChange): void {
    this.deviceSubscription = this.iotDeviceService
      .getIoTDevice(event.value)
      .subscribe((device: IotDevice) => {
        this.payloadData = JSON.stringify(device.latestReceivedMessage.rawData, null, 4);
        this.getDeviceModel(device);
      });
  }

  removeUnwantedMetaData(device: IotDevice) {
    device.latestReceivedMessage = undefined;
    device.receivedMessagesMetadata = undefined;
    device.deviceModelId = undefined;
    return device;
  }

  getDeviceModel(device: IotDevice) {
    this.deviceModelService.get(device.deviceModelId).subscribe(
      (response) => {
        device.deviceModel = response;
        this.metadata = JSON.stringify(this.removeUnwantedMetaData(device), null, 4);
      }
    );
  }

  private create(): void {
    this.payloadDecoderService.post(this.payloadDecoder)
      .subscribe(
        (response) => {
          //console.log(response);
          this.routeBack();
        },
        (error: HttpErrorResponse) => {
          this.showError(error);
        }
      );
  }

  private update(): void {
    this.payloadDecoderService.put(this.payloadDecoder, this.id)
      .subscribe(
        (response) => {
          this.routeBack();
        },
        (error) => {
          this.showError(error);
        });
  }

  onSubmit(): void {
    this.payloadDecoder.decodingFunction = this.payloadDecoderBody;
    if (this.payloadDecoder.id) {
      this.update();
    } else {
      this.create();
    }
  }

  scrollToTop(): void {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }

  private showError(error: HttpErrorResponse) {
    this.errorFields = [];
    this.errorMessages = [];
    if (error.error?.message?.length > 0) {
      error.error.message.forEach((err) => {
        this.errorFields.push(err.property);
        this.errorMessages = this.errorMessages.concat(
          Object.values(err.constraints)
        );
      });
    } else {
      this.errorMessage = error.message;
    }
    this.formFailedSubmit = true;
    this.scrollToTop();
  }

  routeBack(): void {
    this.location.back();
  }

}
