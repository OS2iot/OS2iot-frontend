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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-multicast-edit',
  templateUrl: './multicast-edit.component.html',
  styleUrls: ['./multicast-edit.component.scss'],
})
export class MulticastEditComponent implements OnInit {
  public title: string;
  public multicastId: number;
  public errorMessages: any;
  private multicastSubscription: Subscription;
  public errorFields: string[];
  @Input() submitButton: string;
  public backButtonTitle: string;
  public multicast: Multicast = new Multicast();
  private counter: number;
  private applicationId: number;
  private applicationName: string;
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
        const multicastId = +this.route.snapshot.paramMap.get('multicastId');
        if (multicastId !== 0) {
          this.title = translations['FORM.EDIT-MULTICAST'];
        } else {
          this.title = translations['FORM.CREATE-NEW-MULTICAST'];
        }
        this.submitButton = translations['MULTICAST.SAVE'];
        this.backButtonTitle = translations['NAV.MULTICAST'];
      });

    this.multicastId = +this.route.snapshot.paramMap.get('multicastId');
    this.applicationId = +this.route.snapshot.paramMap.get('id');
    this.applicationName = this.route.snapshot.paramMap.get('name');

    if (this.multicastId !== 0) {
      this.getMulticast(this.multicastId);
    }
  }
  onSubmit(): void {
    this.counter = 0;
    if (this.multicastId) {
      this.updateMulticast();
    } else {
      this.createMulticast();
    }
  }

  getMulticast(id: number) {
    this.multicastSubscription = this.multicastService
      .get(id)
      .subscribe((response: Multicast) => {
        this.multicast = response;
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
    this.multicast.applicationId = this.applicationId;
    this.multicastService.update(this.multicast).subscribe(
      (response) => {
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
    this.multicast.applicationId = this.applicationId;
    this.multicastService.create(this.multicast).subscribe(
      (response) => {
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
  keyPressAlphaNumeric(event) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9]/.test(inp)) {
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
