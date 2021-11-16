import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MulticastType } from '@shared/enums/multicast-type';
import { ErrorMessageService } from '@shared/error-message.service';
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
    public scrollToTopService: ScrollToTopService
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
    this.multicastService.update(this.multicast).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl('/applications');
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    );
  }
  createMulticast(): void {
    this.multicastService.create(this.multicast).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl('/multicast-list');
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    );
  }
  routeBack(): void {
    this.router.navigate([
      'applications',
      this.applicationId.toString(),
      'multicast-list',
      this.applicationName,
    ]);
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
