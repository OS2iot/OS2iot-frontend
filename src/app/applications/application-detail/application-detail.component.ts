import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '@applications/application.model';
import { ApplicationService } from '@applications/application.service';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { DeviceType } from '@shared/enums/device-type';
import { BackButton } from '@shared/models/back-button.model';
import { DropdownButton } from '@shared/models/dropdown-button.model';
import { MeService } from '@shared/services/me.service';
import { Subscription } from 'rxjs';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-application',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.scss'],
})
export class ApplicationDetailComponent implements OnInit, OnDestroy {
  @Output() deleteApplication = new EventEmitter();
  public applicationsSubscription: Subscription;
  public application: Application;
  public backButton: BackButton = { label: '', routerLink: '/applications' };
  public id: number;
  public pageLimit = environment.tablePageSize;
  public dropdownButton: DropdownButton;
  public errorMessage: string;
  public canEdit = false;

  constructor(
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    public translate: TranslateService,
    public router: Router,
    private meService: MeService,
    private titleService: Title,
    private deleteDialogService: DeleteDialogService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.bindApplication(this.id);
      this.dropdownButton = {
        label: '',
        editRouterLink: '../../edit-application/' + this.id,
        isErasable: true,
      };      
    }

    this.translate
      .get([
        'NAV.APPLICATIONS',
        'APPLICATION-TABLE-ROW.SHOW-OPTIONS',
        'TITLE.APPLICATION',
      ])
      .subscribe((translations) => {
        this.backButton.label = translations['NAV.APPLICATIONS'];
        this.dropdownButton.label =
          translations['APPLICATION-TABLE-ROW.SHOW-OPTIONS'];
        this.titleService.setTitle(translations['TITLE.APPLICATION']);
      });
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite);
  }

  onDeleteApplication() {
    this.deleteDialogService
      .showApplicationDialog(this.application)
      .subscribe((response) => {
        if (response) {
          this.applicationService
            .deleteApplication(this.application.id)
            .subscribe((response) => {
              if (response.ok && response.body.affected > 0) {
                console.log(
                  'delete application with id:' + this.application.id.toString()
                );
                this.router.navigate(['applications']);
              } else {
                this.errorMessage = response?.error?.message;
              }
            });
        } else {
          console.log(response);
        }
      });
  }

  bindApplication(id: number): void {
    this.applicationsSubscription = this.applicationService
      .getApplication(id)
      .subscribe((application) => {
        this.application = application;
      });
  }

  ngOnDestroy() {
    if (this.applicationsSubscription) {
      this.applicationsSubscription.unsubscribe();
    }
  }
}
