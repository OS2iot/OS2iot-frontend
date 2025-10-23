import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MulticastType } from "@shared/enums/multicast-type";
import { ErrorMessageService } from "@shared/error-message.service";
import { SnackService } from "@shared/services/snack.service";
import { ScrollToTopService } from "@shared/services/scroll-to-top.service";
import { ReplaySubject, Subject, Subscription } from "rxjs";
import { Multicast } from "../multicast.model";
import { MulticastService } from "../multicast.service";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { ApplicationService } from "@applications/application.service";
import { keyPressedHex } from "@shared/constants/regex-constants";
import { UntypedFormControl } from "@angular/forms";
import { takeUntil } from "rxjs/operators";

@Component({
    selector: "app-multicast-edit",
    templateUrl: "./multicast-edit.component.html",
    styleUrls: ["./multicast-edit.component.scss"],
    standalone: false
})
export class MulticastEditComponent implements OnInit, OnDestroy {
  public title: string;
  public multicastId: number;
  public errorMessages: unknown;
  private multicastSubscription: Subscription;
  public searchDevices: UntypedFormControl = new UntypedFormControl();
  public errorFields: string[];
  public iotDevices: IotDevice[] = [];
  @Input() submitButton: string;
  public backButtonTitle: string;
  public multicast: Multicast = new Multicast();
  private applicationId: number;
  private onDestroy = new Subject<void>();
  public formFailedSubmit = false;
  public multicastTypes: string[] = Object.values(MulticastType);
  // Class-B: { public periodicities: number[] = [2, 4, 8, 16, 32, 64, 128]; // used for classB if it has to be used in the future }
  public deviceCtrl: UntypedFormControl = new UntypedFormControl();
  public deviceFilterCtrl: UntypedFormControl = new UntypedFormControl();
  public filteredDevicesMulti: ReplaySubject<IotDevice[]> = new ReplaySubject<IotDevice[]>(1);

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private multicastService: MulticastService,
    private errorMessageService: ErrorMessageService,
    private scrollToTopService: ScrollToTopService,
    private snackService: SnackService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.multicastId = +this.route.snapshot.paramMap.get("multicastId");
    this.applicationId = +this.route.snapshot.paramMap.get("id");

    this.translate
      .get(["FORM.CREATE-NEW-MULTICAST", "FORM.EDIT-MULTICAST", "MULTICAST.SAVE", "NAV.MULTICAST", "GEN.BACK"])
      .subscribe(translations => {
        if (this.multicastId) {
          this.title = translations["FORM.EDIT-MULTICAST"];
        } else {
          this.title = translations["FORM.CREATE-NEW-MULTICAST"];
        }
        this.submitButton = translations["MULTICAST.SAVE"];
        this.backButtonTitle = translations["GEN.BACK"];
      });

    this.getApplication(this.applicationId);

    if (this.multicastId) {
      // If edit is pressed, then get the specific multicast.
      this.getMulticast(this.multicastId);
    }

    this.deviceFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.filterDevicesMulti();
    });
  }

  private filterDevicesMulti() {
    if (!this.iotDevices) {
      return;
    }
    // get the search keyword
    let search = this.deviceFilterCtrl?.value?.trim();
    if (!search) {
      this.filteredDevicesMulti.next(this.iotDevices.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    const filtered = this.iotDevices.filter(device => {
      return device.name.toLocaleLowerCase().indexOf(search) > -1;
    });
    this.filteredDevicesMulti.next(filtered);
  }

  onSubmit(): void {
    if (this.multicastId) {
      // if already created, only update
      this.updateMulticast();
    } else {
      // else create new
      this.createMulticast();
    }
  }

  getMulticast(id: number) {
    this.multicastSubscription = this.multicastService.get(id).subscribe((response: Multicast) => {
      this.multicast = response; // gets the multicast and set's local multicast. Used when update.
      this.deviceCtrl.setValue(this.multicast.iotDevices);
    });
  }

  getApplication(id: number) {
    this.applicationService.getApplication(id).subscribe(application => {
      this.iotDevices = application.iotDevices ?? [];
      this.filteredDevicesMulti.next(this.iotDevices.slice());
    });
  }

  // only if classB can be used
  // showPeriodicity(): boolean {
  //   if (this.multicast.groupType === MulticastType.ClassB) {
  //     return true;
  //   } else return false;
  // }

  updateMulticast(): void {
    this.resetErrors();
    this.multicast.applicationID = this.applicationId;

    this.multicastService.update(this.multicast).subscribe(
      () => {
        this.snackService.showUpdatedSnack();
        this.routeBack();
      },
      (error: HttpErrorResponse) => {
        this.snackService.showFailSnack();
        this.handleError(error);
        this.formFailedSubmit = true;
      }
    );
  }
  createMulticast(): void {
    this.resetErrors();
    this.multicast.applicationID = this.applicationId;

    this.multicastService.create(this.multicast).subscribe(
      () => {
        this.snackService.showSavedSnack();
        this.routeBack();
      },
      (error: HttpErrorResponse) => {
        this.snackService.showFailSnack();
        this.handleError(error);
        this.formFailedSubmit = true;
      }
    );
  }
  public compare(o1: IotDevice | undefined, o2: IotDevice | undefined): boolean {
    return o1?.id === o2?.id;
  }

  selectAll() {
    this.multicast.iotDevices = this.iotDevices;
  }
  unSelectAll() {
    this.multicast.iotDevices = [];
  }

  routeBack(): void {
    this.router.navigate(["applications", this.applicationId.toString()]);
  }
  keyPressHexadecimal(event) {
    keyPressedHex(event);
  }
  private resetErrors() {
    this.errorFields = [];
    this.errorMessages = undefined;
    this.formFailedSubmit = false;
  }
  handleError(error: HttpErrorResponse) {
    const errors = this.errorMessageService.handleErrorMessageWithFields(error);
    this.errorFields = errors.errorFields;
    this.errorMessages = errors.errorMessages;
    this.scrollToTopService.scrollToTop();
  }
  ngOnDestroy(): void {
    this.multicastSubscription?.unsubscribe();
  }
}
