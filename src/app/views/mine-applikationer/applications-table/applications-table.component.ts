import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { ApplicationsTableRowComponent } from '../applications-table-row/applications-table-row.component';
import { Subscription, Observable } from 'rxjs';
import { RestService } from 'src/app/shared/_services/rest.service';
import { TranslateService } from '@ngx-translate/core';
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
    public applications: Observable<Application[]>;
    public pageOffset: number = 0;
    public pageTotal: number;

    private applicationsSubscription: Subscription;

    constructor(
        private restService: RestService,
        public translate: TranslateService
    ) {
        translate.use('da');
    }

    ngOnInit() {
    }

    ngOnChanges() {
        console.log('pageLimit', this.pageLimit);
        console.log('selectedSortId', this.selectedSortObject);
        this.getApplications();
    }

    getApplications(): void {
        this.applicationsSubscription = this.restService
            .get('application', {
                limit: this.pageLimit,
                offset: this.pageOffset * this.pageLimit,
                sort: this.selectedSortObject.dir,
                orderOn: this.selectedSortObject.col
            })
            .subscribe((applications) => {
                this.applications = applications.data;
                if (this.pageLimit) {
                    console.log(applications.data);
                    this.pageTotal = Math.ceil(applications.count / this.pageLimit);
                }
            });
    }

    deleteApplication(id: number) {
        this.restService.delete('application', id).subscribe((response) => {
            if (response.ok && response.body.affected > 0) {
                this.getApplications();
            }
        });
    }

    prevPage() {
        if (this.pageOffset) this.pageOffset--;
        this.getApplications();
    }

    nextPage() {
        if (this.pageOffset < this.pageTotal) this.pageOffset++;
        this.getApplications();
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.applicationsSubscription.unsubscribe();
    }
}
