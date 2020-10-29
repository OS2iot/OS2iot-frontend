import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '@applications/application.model';
import { ApplicationService } from '@applications/application.service';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { TranslateService } from '@ngx-translate/core';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { BackButton } from '@shared/models/back-button.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-application',
    templateUrl: './application-detail.component.html',
    styleUrls: ['./application-detail.component.scss'],
})
export class ApplicationDetailComponent implements OnInit, OnDestroy {
    @Output() deleteApplication = new EventEmitter();
    public applicationsSubscription: Subscription;
    private deleteDialogSubscription: Subscription;
    public application: Application;
    public backButton: BackButton = { label: '', routerLink: '/applications' };
    private id: number;
    public description: string;
    public name: string;
    public iotDevices: IotDevice[] = [];

    constructor(
        private applicationService: ApplicationService,
        private route: ActivatedRoute,
        public translate: TranslateService,
        public router: Router,
        private deleteDialogService: DeleteDialogService
    ) { }

    ngOnInit(): void {
        this.id = +this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.bindApplication(this.id);
        }
        this.translate.get(['NAV.APPLICATIONS'])
            .subscribe(translations => {
                this.backButton.label = translations['NAV.APPLICATIONS'];
            });
    }

    onDeleteApplication() {
        this.deleteDialogSubscription = this.deleteDialogService.showSimpleDeleteDialog().subscribe(
            (response) => {
              if (response) {
                this.applicationService.deleteApplication(this.application.id).subscribe((response) => {
                    if (response.ok && response.body.affected > 0) {
                        console.log('delete application with id:' + this.application.id.toString());
                    }
                });
                this.router.navigate(['applications']);
              } else {
                console.log(response);
              }
            }
        );
    }

    onEditApplication() {
        this.router.navigate(['edit-application'], { relativeTo: this.route });
    }

    bindApplication(id: number): void {
        this.applicationsSubscription = this.applicationService.getApplication(id).subscribe((application) => {
            this.application = application;
            this.name = application.name;
            this.description = application.description;
            if (application.iotDevices) {
                this.iotDevices = application.iotDevices;
            }
        });
    }

    ngOnDestroy() {
        if (this.applicationsSubscription) {
            this.applicationsSubscription.unsubscribe();
        }
        if (this.deleteDialogSubscription) {
            this.deleteDialogSubscription.unsubscribe();
        }
    }
}
