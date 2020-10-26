import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DatatargetResponse } from '@applications/datatarget/datatarget-response.model';
import { PayloadDeviceDatatargetGetByDataTarget } from '@app/payload-decoder/payload-device-data.model';
import { PayloadDeviceDatatargetService } from '@app/payload-decoder/payload-device-datatarget.service';
import { BackButton } from '@shared/models/back-button.model';
import { DatatargetService } from '../datatarget.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-datatarget-detail',
    templateUrl: './datatarget-detail.component.html',
    styleUrls: ['./datatarget-detail.component.scss']
})
export class DatatargetDetailComponent implements OnInit {

    public datatargetSubscription: Subscription;
    public datatarget: DatatargetResponse;
    public backButton: BackButton = { label: '', routerLink: '/datatarget-list' };
    public dataTargetRelations: PayloadDeviceDatatargetGetByDataTarget[];

    constructor(
        private route: ActivatedRoute,
        private location: Location,
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

    onDeleteDatatarget() {
        const id = this.datatarget.id;
        this.datatargetService.delete(id).subscribe((response) => {
        });
        this.location.back();
    }

    getDatatargetRelations(id: number) {
        this.datatargetRelationServicer.getByDataTarget(id)
            .subscribe((response) => {
                this.dataTargetRelations = response.data;
            });
    }

}
