import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { BackButton } from '@shared/models/back-button.model';
import { DropdownButton } from '@shared/models/dropdown-button.model';
import { Subscription } from 'rxjs';
import { Multicast } from '../multicast.model';
import { Location } from '@angular/common';
import { MulticastService } from '../multicast.service';
import { SnackService } from '@shared/services/snack.service';
import { Downlink } from '@applications/iot-devices/downlink.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessageService } from '@shared/error-message.service';
import { MatDialog } from '@angular/material/dialog';
import { DownlinkDialogComponent } from '@applications/iot-devices/iot-device-detail/downlink/downlink-dialog/downlink-dialog.component';
import { keyPressedHex } from '@shared/constants/regex-constants';

@Component({
  selector: 'app-multicast-detail',
  templateUrl: './multicast-detail.component.html',
  styleUrls: ['./multicast-detail.component.scss'],
})
export class MulticastDetailComponent implements OnInit {
  public multicast: Multicast;
  public backButton: BackButton = { label: '', routerLink: '/multicast-list' };
  private deleteDialogSubscription: Subscription;
  public dropdownButton: DropdownButton;
  public formFailedSubmit: boolean = false;
  private applicationId: number;
  public downlink = new Downlink();
  @Input() errorMessages: string[];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private deleteDialogService: DeleteDialogService,
    private location: Location,
    private multicastService: MulticastService,
    private translate: TranslateService,
    private snackService: SnackService,
    private errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.errorMessages = [];
    const id: number = +this.route.snapshot.paramMap.get('multicastId');
    if (id) {
      this.getMulticast(id);
      this.dropdownButton = {
        label: '',
        editRouterLink: '../../multicast-edit/' + id,
        isErasable: true,
      };
      this.applicationId = +this.route.snapshot.paramMap.get('id');
    }
    this.translate
      .get(['GEN.BACK', 'MULTICAST-TABLE-ROW.SHOW-OPTIONS'])
      .subscribe((translations) => {
        this.backButton.label = translations['GEN.BACK'];
        this.dropdownButton.label =
          translations['MULTICAST-TABLE-ROW.SHOW-OPTIONS'];
      });
  }

  getMulticast(id: number) {
    this.multicastService.get(id).subscribe((multicast: Multicast) => {
      this.multicast = multicast;
      this.setBackButton(this.applicationId);
    });
  }

  private setBackButton(applicationId: number) {
    this.backButton.routerLink = ['applications', applicationId.toString()];
  }

  // Class-B:
  //only if classB can be used
  // canShowPeriodicity(): boolean {
  //   if (this.multicast.groupType === MulticastType.ClassB) {
  //     return true;
  //   } else return false;
  // }

  onDeleteMulticast() {
    this.deleteDialogSubscription = this.deleteDialogService
      .showSimpleDialog()
      .subscribe((response) => {
        if (response) {
          this.multicastService
            .delete(this.multicast.id)
            .subscribe((response) => {
              if (response.status !== 0) {
                this.showDeletedSnack();
                this.location.back();
              } else {
                this.showFailSnack();
              }
            });
        } else {
        }
      });
  }

  showDeletedSnack(): void {
    this.snackService.showDeletedSnack();
  }

  showFailSnack(): void {
    this.snackService.showFailSnack();
  }
  showQueueSnack(): void {
    this.snackService.showInQueueSnack();
  }
  keyPressHexadecimal(event) {
    // make sure only hexadecimal can be typed in input with adresses.
    keyPressedHex(event);
  }

  private handleError(error: HttpErrorResponse) {
    const errors = this.errorMessageService.handleErrorMessageWithFields(error);
    this.errorMessages = errors.errorFields;
    this.errorMessages = errors.errorMessages;
  }

  clickDownlink() {
    if (this.validateHex(this.downlink.data)) {
      this.multicastService
        .multicastGet(this.multicast.id)
        .subscribe((response: any) => {
          if (response.totalCount > 0) {
            this.openDownlinkDialog();
          } else {
            this.startDownlink();
          }
        });
    }
  }
  openDownlinkDialog() {
    const dialog = this.dialog.open(DownlinkDialogComponent, {});

    dialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.startDownlink();
      }
    });
  }

  private startDownlink() {
    this.errorMessages = [];
    this.multicastService
      .multicastPost(this.downlink, this.multicast.id)
      .subscribe(
        () => {
          this.showQueueSnack();
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  private validateHex(input: string): boolean {
    const isHexinput = /^[a-fA-F\d]+$/.test(input);

    if (isHexinput) {
      return true;
    } else {
      this.addToErrorMessage('MULTICAST.DOWNLINK.NO-PORT-OR-PAYLOAD');
      return false;
    }
  }

  addToErrorMessage(text: string) {
    this.translate.get([text]).subscribe((translations) => {
      this.errorMessages.push(translations[text]);
    });
  }

  ngOnDestroy(): void {
    this.deleteDialogSubscription?.unsubscribe();
  }
}
