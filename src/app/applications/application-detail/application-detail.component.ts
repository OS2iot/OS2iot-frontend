import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '@applications/application.model';
import { ApplicationService } from '@applications/application.service';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from '@shared/models/back-button.model';
import { QuickActionButton } from '@shared/models/quick-action-button.model';
import { Sort } from '@shared/models/sort.model';
import { Subscription } from 'rxjs';

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
    private id: number;
    public pageLimit = 10;
    public selectedSortId = 1;
    public selectedSortObject: Sort = {
        id: 1,
        dir: 'ASC',
        col: 'name',
        label: 'SORT.NAME-ASCENDING',
    };
    public sort: Sort[] = [
        {
            id: 1,
            dir: 'ASC',
            col: 'name',
            label: 'SORT.NAME-ASCENDING',
        },
        {
            id: 2,
            dir: 'DESC',
            col: 'name',
            label: 'SORT.NAME-DESCENDING',
        },
        {
            id: 3,
            dir: 'DESC',
            col: 'active',
            label: 'SORT.ACTIVE-DESCENDING',
        },
        {
            id: 4,
            dir: 'ASC',
            col: 'active',
            label: 'SORT.ACTIVE-ASCENDING',
        },
    ];
    public buttons: QuickActionButton[] = [
        {
            label: 'APPLICATION.DELETE',
            type: 'delete',
        },
        {
            label: 'GEN.EDIT',
            type: 'edit',
        },
    ];
    public description: string;
    public name: string;
    public pageOffset = 0;
    public pageTotal: number;
    public iotDevices: IotDevice[] = [];

    constructor(
        private applicationService: ApplicationService,
        private route: ActivatedRoute,
        public translate: TranslateService,
        public router: Router
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
        const id = this.application.id;
        this.applicationService.deleteApplication(id).subscribe((response) => {
            if (response.ok && response.body.affected > 0) {
                this.deleteApplication.emit(id);
            }
        });
        this.router.navigate(['applications']);
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

    updatePageLimit(limit: any) {
        console.log(limit);
    }

    changeSort(sortId: number) {
        for (let i = 0; i < this.sort.length; i++) {
            const elem = this.sort[i];
            if (elem.id == sortId) {
                this.selectedSortObject = elem;
            }
        }
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        if (this.applicationsSubscription) {
            this.applicationsSubscription.unsubscribe();
        }
    }
}
