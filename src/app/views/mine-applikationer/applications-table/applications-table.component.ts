import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApplicationsTableRowComponent } from '../applications-table-row/applications-table-row.component';
import { Subscription, Observable } from 'rxjs';
import { RestService } from 'src/app/shared/_services/rest.service';
import { TranslateService } from '@ngx-translate/core';
import { Application } from 'src/app/models/application';

@Component({
    selector: 'app-applications-table',
    templateUrl: './applications-table.component.html',
    styleUrls: ['./applications-table.component.scss'],
})
export class ApplicationsTableComponent implements OnInit, OnDestroy {
    private applicationsSubscription: Subscription;
    public applications: Observable<Application[]>;
    private pageLimit: number = 10;
    private pageOffset: number = 0;

    constructor(
        private restService: RestService,
        public translate: TranslateService
    ) {
      translate.use('da');
    }

    ngOnInit() {
        this.getApplications();
    }

    getApplications(): void {
        this.applicationsSubscription = this.restService
            .get('application', {
                limit: this.pageLimit,
                offset: this.pageOffset,
            })
            .subscribe((applications) => {
                this.applications = applications.data;
            });
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.applicationsSubscription.unsubscribe();
    }
}
