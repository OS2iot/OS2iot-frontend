import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { ApplicationService } from 'src/app/shared/services/application.service';

import { Application } from 'src/app/models/application';
import { Sort } from 'src/app/models/sort';

@Component({
    selector: 'app-applications-table',
    templateUrl: './applications-table.component.html',
    styleUrls: ['./applications-table.component.scss'],
})
export class ApplicationsTableComponent implements OnInit, OnChanges, OnDestroy {
    @Input() pageLimit: number;
    @Input() selectedSortObject: Sort;
    public applications: Application[];
    public pageOffset = 0;
    public pageTotal: number;

    private applicationsSubscription: Subscription;

    constructor(
        public translate: TranslateService,
        private applicationService: ApplicationService
    ) {
        translate.use('da');
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.getApplications();
    }

    getApplications(): void {
        this.applicationsSubscription = this.applicationService
            .getApplications(
                this.pageLimit,
                this.pageOffset * this.pageLimit,
                this.selectedSortObject.dir,
                this.selectedSortObject.col
            )
            .subscribe((applications) => {
                this.applications = applications.data;
                if (this.pageLimit) {
                    this.pageTotal = Math.ceil(applications.count / this.pageLimit);
                }
            });
    }

    deleteApplication(id: number) {
        this.applicationService.deleteApplication(id).subscribe((response) => {
            if (response.ok && response.body.affected > 0) {
                this.getApplications();
            }
        });
    }

    prevPage() {
        if (this.pageOffset) { this.pageOffset--; }
        this.getApplications();
    }

    nextPage() {
        if (this.pageOffset < this.pageTotal) { this.pageOffset++; }
        this.getApplications();
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        if (this.applicationsSubscription) {
            this.applicationsSubscription.unsubscribe();
        }
    }
}
