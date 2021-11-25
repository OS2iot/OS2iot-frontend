import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MulticastType } from '@shared/enums/multicast-type';
import { ErrorMessageService } from '@shared/error-message.service';
import { SnackService } from '@shared/services/snack.service';
import { ScrollToTopService } from '@shared/services/scroll-to-top.service';
import { Subscription } from 'rxjs';
import { Multicast } from '../multicast.model';
import { MulticastService } from '../multicast.service';

@Component({
  selector: 'app-multicast-edit',
  templateUrl: './multicast-edit.component.html',
  styleUrls: ['./multicast-edit.component.scss'],
})
export class MulticastEditComponent implements OnInit {
  public title: string;
  public multicastId: string;
  public errorMessages: any;
  private multicastSubscription: Subscription;
  public errorFields: string[];
  @Input() submitButton: string;
  public backButtonTitle: string;
  public multicast: Multicast = new Multicast();
  private applicationId: number;
  public formFailedSubmit: boolean = false;
  public multicastTypes: string[] = Object.values(MulticastType);
  public periodicities: number[] = [2, 4, 8, 16, 32, 64, 128];

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    public multicastService: MulticastService,
    public errorMessageService: ErrorMessageService,
    public scrollToTopService: ScrollToTopService,
    public snackService: SnackService
  ) {}

  ngOnInit(): void {
    this.translate
      .get([
        'FORM.CREATE-NEW-MULTICAST',
        'FORM.EDIT-MULTICAST',
        'MULTICAST.SAVE',
        'NAV.MULTICAST',
      ])
      .subscribe((translations) => {
        this.multicastId = this.route.snapshot.paramMap.get('multicastId'); // the multicastId is a string, created by chirpstack. Used when in edit when update.
        this.applicationId = +this.route.snapshot.paramMap.get('id');

        if (this.multicastId !== null) {
          this.title = translations['FORM.EDIT-MULTICAST'];
        } else {
          this.title = translations['FORM.CREATE-NEW-MULTICAST'];
        }
        this.submitButton = translations['MULTICAST.SAVE'];
        this.backButtonTitle = translations['NAV.MULTICAST'];
      });

    if (this.multicastId !== null) { // If edit is pressed, then get the specific multicast.
      this.getMulticast(this.multicastId);
    }
  }
  onSubmit(): void {
    if (this.multicastId) { // if already created, only update
      this.updateMulticast();
    } else { // else create new
      this.createMulticast();
    }
  }

  getMulticast(id: string) {
    this.multicastSubscription = this.multicastService
      .get(id)
      .subscribe((response: Multicast) => {
        this.multicast = response; // gets the multicast and set's local multicast. Used when update.
      });
  }

  //only if classB can be used
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
        this.showUpdatedSnack();
        this.routeBack();
      },
      (error: HttpErrorResponse) => {
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
        this.showSavedSnack();
        this.routeBack();
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
        this.formFailedSubmit = true;
      }
    );
  }
  routeBack(): void {
    this.router.navigate(['applications', this.applicationId.toString()]);
  }
  showSavedSnack() {
    this.snackService.showSavedSnack();
  }
  showUpdatedSnack() {
    this.snackService.showUpdatedSnack();
  }
  keyPressHexadecimal(event) { // make sure only hexadecimal can be typed in input with adresses.
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-fA-F0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
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
    if (this.multicastSubscription) {
      this.multicastSubscription.unsubscribe();
    }
  }
}
