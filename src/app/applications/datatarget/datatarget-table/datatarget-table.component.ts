import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Datatarget, DatatargetData } from '../datatarget.model';
import { DatatargetService } from '../datatarget.service';
import { Sort } from '@shared/models/sort.model';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';

@Component({
    selector: 'app-datatarget-table',
    templateUrl: './datatarget-table.component.html',
    styleUrls: ['./datatarget-table.component.scss']
})
export class DatatargetTableComponent implements OnInit, OnChanges, OnDestroy {

    @Input() pageLimit: number;
    public pageOffset = 0;
    public pageTotal: number;
    public applicationId: number;

    datatargets: Datatarget[]
    private datatargetSubscription: Subscription;
    private deleteDialogSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private deleteDialogService: DeleteDialogService,
        private datatargetService: DatatargetService,
        public translate: TranslateService) {
        translate.use('da');
    }

    ngOnInit(): void {
        this.applicationId = +Number(this.route.parent.parent.snapshot.paramMap.get('id'));
        console.log(this.applicationId);
        this.getDatatarget();
    }

    ngOnChanges() {
        this.getDatatarget();
    }

    getDatatarget(): void {
        const appId: number = this.applicationId;
        if (appId) {
            this.datatargetSubscription = this.datatargetService
                .getByApplicationId(
                    this.pageLimit,
                    this.pageOffset * this.pageLimit,
                    appId
                )
                .subscribe((datatargets: DatatargetData) => {
                    this.datatargets = datatargets.data;
                    if (this.pageLimit) {
                        this.pageTotal = Math.ceil(datatargets.count / this.pageLimit);
                    }
                });
        }

    }

    deleteDatatarget(id: number) {
        this.deleteDialogSubscription = this.deleteDialogService.showSimpleDeleteDialog().subscribe(
            (response) => {
              if (response) {
                this.datatargetService.delete(id).subscribe((response) => {
                    if (response.ok && response.body.affected > 0) {
                        this.getDatatarget();
                    }
                });
              } else {
                  console.log(response);
              }
            }
          );
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        if (this.datatargetSubscription) {
            this.datatargetSubscription.unsubscribe();
        }
        if (this.deleteDialogSubscription) {
            this.deleteDialogSubscription.unsubscribe();
        }
    }

}
