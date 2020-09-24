import { Component, OnInit } from '@angular/core';
import { QuickActionButton } from 'src/app/models/quick-action-button';
import { Sort } from 'src/app/models/sort';
import { Subscription } from 'rxjs';
import { BackButton } from 'src/app/models/back-button';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DatatargetService } from 'src/app/shared/services/datatarget.service';
import { DatatargetResponse } from 'src/app/models/datatarget-response';
import { PayloadDeviceDatatargetService } from '@shared/services/payloadDeviceDatatarget.service';
import { PayloadDeviceDatatarget, PayloadDeviceDatatargetGetByDataTarget } from '@app/models/payload-device-data';

@Component({
    selector: 'app-datatarget',
    templateUrl: './datatarget.component.html',
    styleUrls: ['./datatarget.component.scss']
})
export class DatatargetComponent implements OnInit {

    public datatargetSubscription: Subscription;
    public datatarget: DatatargetResponse;
    public backButton: BackButton = { label: '', routerLink: '/datatarget-list' };
    public pageLimit = 10;
    public selectedSortId = 6;
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
    public pageOffset: 0;
    public pageTotal: number;
    public dataTargetRelations: PayloadDeviceDatatargetGetByDataTarget[];

    constructor(
        private route: ActivatedRoute,
        private datatargetRelationServicer: PayloadDeviceDatatargetService,
        private datatargetService: DatatargetService,
        public translate: TranslateService) { }

    ngOnInit(): void {
        const id: number = +this.route.snapshot.paramMap.get('datatargetId');
        if (id) {
            this.getDatatarget(id);
            this.getDatatargetRelations(id);
        }
        this.translate.get(['NAV.MY-DATATARGET'])
            .subscribe(translations => {
                this.backButton.label = translations['NAV.MY-DATATARGET'];
            });
    }

    getDatatarget(id: number) {
        this.datatargetService.get(id)
            .subscribe((datatargetResponse: DatatargetResponse) => {
                this.datatarget = datatargetResponse;
            });
    }

    getDatatargetRelations(id: number) {
        this.datatargetRelationServicer.getByDataTarget(id)
            .subscribe( (response) => {
                this.dataTargetRelations = response.data;
            });
    }

}
