import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { PayloadDecoder } from 'src/app/payload-decoder/payload-decoder.model';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PayloadDecoderService } from '@app/payload-decoder/payload-decoder.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BackButton } from '@shared/models/back-button.model';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { ApplicationService } from '@applications/application.service';
import { Application } from '@applications/application.model';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { MatSelectChange } from '@angular/material/select';
import { IoTDeviceService } from '@applications/iot-devices/iot-device.service';
import { DeviceModelService } from '@app/device-model/device-model.service';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { TestPayloadDecoder } from '@payload-decoder/test-payload-decoder.model';
import { TestPayloadDecoderService } from '@payload-decoder/test-payload-decoder.service';
import { SnackService } from '@shared/services/snack.service';
import { ErrorMessageService } from '@shared/error-message.service';
import { ScrollToTopService } from '@shared/services/scroll-to-top.service';
import { environment } from '@environments/environment';
import { MeService } from '@shared/services/me.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-payload-decoder-edit',
  templateUrl: './payload-decoder-edit.component.html',
  styleUrls: ['./payload-decoder-edit.component.scss']
})
export class PayloadDecoderEditComponent implements OnInit {
  faExchangeAlt = faExchangeAlt;

  editorJavaScriptOptions = { theme: 'vs', language: 'javascript', autoIndent: true, roundedSelection: true, };
  payloadData = '';
  metadata = '';
  payloadDataErrorMessage = '';
  metadataErrorMessage = '';
  metadataInvalidJSONMessage: string;
  payloadInvalidJSONMessage: string;
  codeOutput = '';
  testPayloadDecoder = new TestPayloadDecoder();
  editorJsonOptions = { theme: 'vs', language: 'json', autoIndent: true, roundedSelection: true, minimap: { enabled: false } };
  editorJsonOutpuOptions = { theme: 'vs', language: 'json', autoIndent: true, roundedSelection: true, minimap: { enabled: false }, readOnly: true };

  payloadDecoder = new PayloadDecoder();
  payloadDecoderBody: string;
  public errorMessage: string;
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  public form: FormGroup;
  public backButton: BackButton = { label: '', routerLink: '' };
  public title = '';
  public submitButton = '';
  id: number;
  subscription: Subscription;
  public applicationsSubscription: Subscription;
  public applications: Application[];
  public application: Application;
  public iotDevices: IotDevice[];
  public iotDevice: IotDevice;
  public pageLimit = environment.tablePageSize;
  public pageTotal: number;
  public pageOffset = 0;
  public deviceSubscription: Subscription;
  canEdit: boolean;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private payloadDecoderService: PayloadDecoderService,
    private testPayloadDecoderService: TestPayloadDecoderService,
    private location: Location,
    private applicationService: ApplicationService,
    private sharedVariableService: SharedVariableService,
    private iotDeviceService: IoTDeviceService,
    private deviceModelService: DeviceModelService,
    private saveSnackService: SnackService,
    private errorMessageService: ErrorMessageService,
    private scrollToTopService: ScrollToTopService,
    private meService: MeService
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.translate.get([
      'NAV.PAYLOAD-DECODER',
      'FORM.EDIT-PAYLOAD-DECODER',
      'PAYLOAD-DECODER.SAVE',
      'QUESTION.GIVE-PAYLOADDECODER-PAYLOAD-PLACEHOLDER',
      'QUESTION.GIVE-PAYLOADDECODER-METADATA-PLACEHOLDER',
      'QUESTION.GIVE-PAYLOADDECODER-PAYLOAD-ERRORMESSAGE',
      'QUESTION.GIVE-PAYLOADDECODER-METADATA-ERRORMESSAGE',
      'QUESTION.GIVE-PAYLOADDECODER-OUTPUT-PLACEHOLDER',
      'QUESTION.GIVE-PAYLOADDECODER-PAYLOAD-INVALID-JSON',
      'QUESTION.GIVE-PAYLOADDECODER-METADATA-INVALID-JSON'
    ])
      .subscribe(translations => {
        this.backButton.label = translations['NAV.PAYLOAD-DECODER'];
        this.title = translations['FORM.EDIT-PAYLOAD-DECODER'];
        this.submitButton = translations['PAYLOAD-DECODER.SAVE'];
        this.payloadData = translations['QUESTION.GIVE-PAYLOADDECODER-PAYLOAD-PLACEHOLDER'];
        this.metadata = translations['QUESTION.GIVE-PAYLOADDECODER-METADATA-PLACEHOLDER'];
        this.payloadDataErrorMessage = translations['QUESTION.GIVE-PAYLOADDECODER-PAYLOAD-ERRORMESSAGE'];
        this.metadataErrorMessage = translations['QUESTION.GIVE-PAYLOADDECODER-METADATA-ERRORMESSAGE'];
        this.codeOutput = translations['QUESTION.GIVE-PAYLOADDECODER-OUTPUT-PLACEHOLDER'];
        this.metadataInvalidJSONMessage = translations['QUESTION.GIVE-PAYLOADDECODER-METADATA-INVALID-JSON'];
        this.payloadInvalidJSONMessage = translations['QUESTION.GIVE-PAYLOADDECODER-PAYLOAD-INVALID-JSON'];
      });
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id > 0) {
      this.getPayloadDecoder(this.id);
      this.setBackButtonLink(this.id);
    } else {
      this.payloadDecoderBody = new PayloadDecoder().decodingFunction;
    }
    this.sharedVariableService.getValue().subscribe((organisationId) => {
      this.getApplications(organisationId);
    });
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite);
  }

  setBackButtonLink(payloadDecoderId: number) {
    if (payloadDecoderId) {
      this.backButton.routerLink = ['payload-decoder', 'payload-decoder-detail', this.id.toString()];
    } else {
      this.backButton.routerLink = ['payload-decoder'];
    }
  }

  private getPayloadDecoder(id: number) {
    this.subscription = this.payloadDecoderService.getOne(id)
      .subscribe(
        (response) => {
          this.payloadDecoder = response;
          this.payloadDecoderBody = response.decodingFunction;
        });
  }

  testPayloadFunction() {
    this.errorMessages = null;
    this.testPayloadDecoder.code = this.payloadDecoderBody;
    try {
      this.testPayloadDecoder.iotDeviceJsonString = JSON.parse(this.metadata);
    } catch (err) {
      // Allow the empty string as a valid input
      if (this.isMetadataDefaultOrEmpty()) {
        this.testPayloadDecoder.iotDeviceJsonString = JSON.parse('{}');
      } else {
        this.errorFields = ['metadata'];
        this.errorMessages = [this.metadataInvalidJSONMessage];
        this.formFailedSubmit = true;
        return;
      }
    }
    try {
      this.testPayloadDecoder.rawPayloadJsonString = JSON.parse(this.payloadData);
    } catch (err) {
      this.errorFields = ['payload'];
      this.errorMessages = [this.payloadInvalidJSONMessage];
      this.formFailedSubmit = true;
      return;
    }

    this.testPayloadDecoderService.post(this.testPayloadDecoder)
      .subscribe(
        (response) => {
          this.codeOutput = JSON.stringify(response, null, 4);
        },
        (error: HttpErrorResponse) => {
          this.showError(error);
        }
      );
  }

  private isMetadataDefaultOrEmpty() {
    return this.metadata.trim() === '' || this.metadata.split('\n').every(x => x.trim().startsWith('//'));
  }

  getCurrentOrganisationId(): number {
    return this.sharedVariableService.getSelectedOrganisationId();
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
      .subscribe(async (device: IotDevice) => {
        if (device.latestReceivedMessage) {
          this.payloadData = JSON.stringify(device.latestReceivedMessage.rawData, null, 4);
        } else {
          this.payloadData = this.payloadDataErrorMessage;
        }
        await this.setDeviceMetadata(device);
      });
  }

  removeUnwantedMetaData(device: IotDevice) {
    device.latestReceivedMessage = undefined;
    device.receivedMessagesMetadata = undefined;
    device.deviceModelId = undefined;
    return device;
  }

  async setDeviceMetadata(device: IotDevice) {
    if (device) {
      if (device.deviceModelId) {
        await this.deviceModelService
          .get(device.deviceModelId)
          .toPromise()
          .then((response) => {
            device.deviceModel = response;
          });
      } else {
        device.deviceModel = null;
      }

      device.deviceModelId = undefined;
      device.latestReceivedMessage = undefined;
      device.receivedMessagesMetadata = undefined;
      this.metadata = JSON.stringify(device, null, 4);
    } else {
      this.metadata = this.metadataErrorMessage;
    }
  }

  showSavedSnack() {
    this.saveSnackService.showSavedSnack();
  }

  private create(): void {
    this.payloadDecoderService.post(this.payloadDecoder)
      .subscribe(
        (response) => {
          this.routeBack();
          this.showSavedSnack();
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
          this.showSavedSnack();
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

  private showError(error: HttpErrorResponse) {
    const errorResponse = this.errorMessageService.handleErrorMessageWithFields(error);
    this.errorFields = errorResponse.errorFields;
    this.errorMessages = errorResponse.errorMessages;
    this.formFailedSubmit = true;
    this.scrollToTopService.scrollToTop();
  }

  routeBack(): void {
    this.location.back();
  }

}
