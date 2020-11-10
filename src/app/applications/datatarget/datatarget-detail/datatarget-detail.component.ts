import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DatatargetResponse } from '@applications/datatarget/datatarget-response.model';
import { PayloadDeviceDatatargetGetByDataTarget } from '@app/payload-decoder/payload-device-data.model';
import { PayloadDeviceDatatargetService } from '@app/payload-decoder/payload-device-datatarget.service';
import { BackButton } from '@shared/models/back-button.model';
import { DatatargetService } from '../datatarget.service';
import { Location } from '@angular/common';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';

@Component({
    selector: 'app-datatarget-detail',
    templateUrl: './datatarget-detail.component.html',
    styleUrls: ['./datatarget-detail.component.scss']
})
export class DatatargetDetailComponent implements OnInit, OnDestroy {

    public datatargetSubscription: Subscription;
    public datatarget: DatatargetResponse;
    public backButton: BackButton = { label: '', routerLink: '/datatarget-list' };
    public dataTargetRelations: PayloadDeviceDatatargetGetByDataTarget[];
    private deleteDialogSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private deleteDialogService: DeleteDialogService,
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
        this.deleteDialogSubscription = this.deleteDialogService.showSimpleDeleteDialog().subscribe(
            (response) => {
              if (response) {
                this.datatargetService.delete(this.datatarget.id).subscribe((response) => {
                });
                this.location.back();
              } else {
                console.log(response);
              }
            }
          );
    }

    getDatatargetRelations(id: number) {
        this.datatargetRelationServicer.getByDataTarget(id)
            .subscribe((response) => {
                this.dataTargetRelations = response.data;
            });
    }

    ngOnDestroy(): void {
        if (this.deleteDialogSubscription) {
            this.deleteDialogSubscription.unsubscribe();
        }
    }

}
