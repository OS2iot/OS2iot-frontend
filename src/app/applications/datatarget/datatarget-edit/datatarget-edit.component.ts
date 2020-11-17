import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Datatarget } from '../datatarget.model';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Application } from '@applications/application.model';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { PayloadDeviceDatatarget, PayloadDeviceDatatargetGetByDataTargetResponse } from '@payload-decoder/payload-device-data.model';
import { DatatargetService } from '../datatarget.service';
import { ApplicationService } from '@applications/application.service';
import { PayloadDecoderService } from '@payload-decoder/payload-decoder.service';
import { PayloadDeviceDatatargetService } from '@payload-decoder/payload-device-datatarget.service';
import { SaveSnackService } from '@shared/services/save-snack.service';
import { MatDialog } from '@angular/material/dialog';
import { DatatargetResponse } from '../datatarget-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { PayloadDecoderResponse } from '@payload-decoder/payload-decoder.model';
import { DeleteDialogComponent } from '@shared/components/delete-dialog/delete-dialog.component';
import { DataTargetType } from '@shared/enums/datatarget-type';
import { OpenDataDkDataset } from '../opendatadk/opendatadk-dataset.model';

@Component({
  selector: 'app-datatarget-edit',
  templateUrl: './datatarget-edit.component.html',
  styleUrls: ['./datatarget-edit.component.scss']
})
export class DatatargetEditComponent implements OnInit {
  public multiPage = false;
  public title = '';
  public sectionTitle = '';
  public backButtonTitle = '';
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
  private counter: number;

  payloadDeviceDatatarget: PayloadDeviceDatatarget[];
  newDynamic: any = {};

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private datatargetService: DatatargetService,
    private location: Location,
    private applicationService: ApplicationService,
    private payloadDecoderService: PayloadDecoderService,
    private payloadDeviceDataTargetService: PayloadDeviceDatatargetService,
    private saveSnackService: SaveSnackService,
    private dialog: MatDialog
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

  private deleteRow(index) {
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

  openDeleteDialog(index) {
    const dialog = this.dialog.open(DeleteDialogComponent, {
      data: {
        showAccept: true,
        showCancel: true,
        message: 'Er du sikker på at du vil slette?'
      }
    });

    dialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteRow(index);
        console.log(`Dialog result: ${result}`);
      }
    });
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
    this.counter = this.counter === undefined ? 1 : this.counter + 1;
    this.datatargetService.update(this.datatarget)
      .subscribe(
        (datatargetResponse: DatatargetResponse) => {
          this.datatarget = this.mapToDatatarget(datatargetResponse);
          this.countToRedirect();
        },
        (error: HttpErrorResponse) => {
          this.handleError(error);
          this.formFailedSubmit = true;
        }
      );
  }

  addPayloadDeviceDatatarget() {
    this.counter = this.counter === undefined ? this.payloadDeviceDatatarget.length : this.counter + this.payloadDeviceDatatarget.length;
    this.payloadDeviceDatatarget.map(
      pdd => {
        if (pdd.payloadDecoderId === 0) {
          pdd.payloadDecoderId = null;
        }
      }
    )
    this.payloadDeviceDatatarget.forEach((relation) => {
      if (relation.id) {
        this.payloadDeviceDataTargetService.put(relation).subscribe(
          (response) => {
            console.log(response);
            this.countToRedirect();
          },
          (error) => {
            this.handleError(error);
          }
        );
      } else {
        this.payloadDeviceDataTargetService.post(relation).subscribe(
          (res: any) => {
            console.log(res);
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
    if (this.counter === 0) {
      this.showSavedSnack();
      this.routeBack();
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
    this.datatarget.applicationId = this.applicationId;
    this.datatargetService.create(this.datatarget)
      .subscribe((response) => {
        this.datatargetid = response.id;
        this.datatarget.id = response.id;
        this.showSavedSnack();
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
        this.datatarget.openDataDkDataset = datatargetResponse.openDataDk ? datatargetResponse.openDataDk : new OpenDataDkDataset();
        //this.opendatadkMockData();
      });
  }

  opendatadkMockData() {
    this.datatarget.openDataDkDataset = {
      name: "test navn",
      resourceTitle: "title",
      description: "description",
      keywords: ['key','work','now'],
      license: "testlicens",
      accessLevel: "Public",
      authorName: "Jeppe",
      authorEmail: "J",
      url: "www.dr.dk",
      acceptTerms: false
    },
    this.datatarget.type = DataTargetType.OPENDATADK;
    this.datatarget.setToOpendataDk = true;
  }

  showSavedSnack() {
    this.saveSnackService.showSavedSnack();
  }

  disableSaveButton(): boolean {
    let disable = true;
    if (!this.datatarget.setToOpendataDk) {
      disable = false;
    }
    else if(this.datatarget.openDataDkDataset?.acceptTerms) {
      disable = false
    }
    else {
      disable = true
    }
    return disable
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
          payloadDecoderId: element.payloadDecoder?.id === undefined ? 0 : element.payloadDecoder?.id,
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
      authorizationHeader: data.authorizationHeader,
      applicationId: data.application.id,
      setToOpendataDk: data.type === DataTargetType.OPENDATADK ? true : false,
      openDataDkDataset: data.openDataDk
    };
    return dt;
  }
}
