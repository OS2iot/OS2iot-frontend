import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { Application } from 'src/app/models/application';
import { Sort } from 'src/app/models/sort';
import { QuickActionButton } from 'src/app/models/quick-action-button';
import { ApplicationService } from '../../shared/services/application.service';
import { BackButton } from 'src/app/models/back-button';
import { IotDevice } from '../iot-devices/iot-device.model';

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
    public applicationsSubscription: Subscription;
    public application: Application;
    public backButton: BackButton = { label: '', routerLink: '/my-applications' };
    private id: number;
    public pageLimit: number = 10;
    public selectedSortId: number = 6;
    public selectedSortObject: Sort = {
        id: 6,
        dir: 'DESC',
        col: 'createdAt',
        label: 'SORT.CREATED-DESCENDING',
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
            dir: 'ASC',
            col: 'updatedAt',
            label: 'SORT.UPDATED-ASCENDING',
        },
        {
            id: 4,
            dir: 'DESC',
            col: 'updatedAt',
            label: 'SORT.UPDATED-DESCENDING',
        },
        {
            id: 5,
            dir: 'ASC',
            col: 'createdAt',
            label: 'SORT.CREATED-ASCENDING',
        },
        {
            id: 6,
            dir: 'DESC',
            col: 'createdAt',
            label: 'SORT.CREATED-DESCENDING',
        },
        {
            id: 7,
            dir: 'ASC',
            col: 'createdAt',
            label: 'SORT.APPLICATION-ASCENDING',
        },
        {
            id: 8,
            dir: 'DESC',
            col: 'createdAt',
            label: 'SORT.APPLICATION-DESCENDING',
        },
        {
            id: 9,
            dir: 'ASC',
            col: 'createdAt',
            label: 'SORT.BATTERY-ASCENDING',
        },
        {
            id: 10,
            dir: 'DESC',
            col: 'createdAt',
            label: 'SORT.BATTERY-DESCENDING',
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
    public pageOffset: number = 0;
    public pageTotal: number;
    public iotDevices: IotDevice[] = [];

    constructor(
        private applicationService: ApplicationService,
        private route: ActivatedRoute,
        public translate: TranslateService
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

    bindApplication(id: number): void {
        this.applicationsSubscription = this.applicationService.getApplication(id).subscribe((application) => {
            this.application = application;
            this.name = application.name;
            this.description = application.description;
            if (application.iotDevices)
                this.iotDevices = application.iotDevices;
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
