import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormModule } from "@shared/components/forms/form.module";
import { SharedModule } from "@shared/shared.module";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { MeService } from "@shared/services/me.service";
import { ApplicationService } from "@applications/application.service";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PayloadDeviceDatatarget } from "@payload-decoder/payload-device-data.model";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { DatatargetService } from "@app/datatarget/datatarget.service";
import { Subscription } from "rxjs";
import { Datatarget } from "@app/datatarget/datatarget-models/datatarget.model";
import { PayloadDecoderMinimal } from "@payload-decoder/payload-decoder.model";
import { PayloadDecoderService } from "@payload-decoder/payload-decoder.service";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { DatatargetConnectionService } from "@payload-decoder/datatarget-connection.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { SnackService } from "@shared/services/snack.service";
import { ErrorMessageService } from "@shared/error-message.service";

@Component({
  selector: "app-datatarget-connection-edit",
  imports: [FormModule, SharedModule, FormsModule, MatOption, MatSelect, MatSlideToggle],
  templateUrl: "./datatarget-connection-edit.component.html",
  styleUrl: "./datatarget-connection-edit.component.scss",
})
export class DatatargetConnectionEditComponent implements OnInit, OnDestroy {
  public canEdit = false;
  public connection: PayloadDeviceDatatarget = new PayloadDeviceDatatarget();
  public dataTargets: Datatarget[] = [];
  public payloadDecoders: PayloadDecoderMinimal[] = [];
  public iotDevices: IotDevice[] = [];
  public errorMessages: any;
  public errorFields: string[];

  private subscriptions: Subscription[] = [];

  private applicationId: number;
  private organizationId: number;
  private dataTargetConnectionId: number;

  constructor(
    private meService: MeService,
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedVariables: SharedVariableService,
    private dataTargetService: DatatargetService,
    private payloadDecoderService: PayloadDecoderService,
    private connectionService: DatatargetConnectionService,
    private snackService: SnackService,
    private errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.dataTargetConnectionId = +this.route.snapshot.paramMap.get("connectionId");
    this.applicationId = +this.route.snapshot.paramMap.get("id");
    this.organizationId = this.sharedVariables.getSelectedOrganisationId();
    this.canEdit = this.meService.hasAccessToTargetOrganization(
      OrganizationAccessScope.ApplicationWrite,
      undefined,
      this.applicationId
    );
    this.getDataTargets();
    this.getPayloadDecoders();
    this.getIotDevices();
    if (this.dataTargetConnectionId) {
      this.getDataTargetConnection(this.dataTargetConnectionId);
    }
    this.connection.defaultConnection = false;
  }

  getDataTargetConnection(id: number) {
    const subscription = this.connectionService.getById(id).subscribe(connection => {
      this.connection = {
        id: connection.id,
        iotDeviceIds: connection.iotDevices.map(d => d.id),
        payloadDecoderId: connection.payloadDecoder.id,
        dataTargetId: connection.dataTarget.id,
        defaultConnection: connection.defaultConnection,
        applicationId: connection.application.id,
      };
    });

    this.subscriptions.push(subscription);
  }

  getDataTargets() {
    const subscription = this.dataTargetService.getByOrganizationId(this.organizationId, 1000, 0).subscribe(data => {
      this.dataTargets = data.data;
    });
    this.subscriptions.push(subscription);
  }

  getPayloadDecoders() {
    const subscription = this.payloadDecoderService.getMinimal().subscribe(payloadDecoders => {
      this.payloadDecoders = payloadDecoders.data;
    });
    this.subscriptions.push(subscription);
  }

  getIotDevices() {
    const subscription = this.applicationService.getApplication(this.applicationId).subscribe(application => {
      this.iotDevices = application.iotDevices.sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }));
    });
    this.subscriptions.push(subscription);
  }

  onSubmit() {
    this.connection.applicationId = this.applicationId;
    if (this.dataTargetConnectionId) {
      this.updateConnection();
    } else {
      this.createConnection();
    }
  }

  compareId(o1: { id: number } | undefined, o2: { id: number } | undefined): boolean {
    return o1?.id === o2?.id;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s?.unsubscribe());
  }

  public routeBack() {
    this.router.navigate(["applications", this.applicationId, "data-targets"]);
  }

  private handleError(error: HttpErrorResponse) {
    const errors = this.errorMessageService.handleErrorMessageWithFields(error);
    this.errorFields = errors.errorFields;
    this.errorMessages = errors.errorMessages;
  }

  private updateConnection() {
    this.connectionService.put(this.connection).subscribe({
      next: () => {
        this.snackService.showSavedSnack();
        this.routeBack();
      },
      error: (error: HttpErrorResponse) => {
        this.snackService.showFailSnack();
        this.handleError(error);
      },
    });
  }

  private createConnection() {
    this.connectionService.post(this.connection).subscribe({
      next: () => {
        this.snackService.showSavedSnack();
        this.routeBack();
      },
      error: (error: HttpErrorResponse) => {
        this.snackService.showFailSnack();
        this.handleError(error);
      },
    });
  }
}
