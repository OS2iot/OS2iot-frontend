import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@shared/models/sort.model';
import { OrganisationService } from '@app/admin/organisation/organisation.service';
import { Subscription } from 'rxjs';
import { OrganisationResponse } from '../../organisation.model';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';

@Component({
    selector: 'app-organisation-tabel',
    templateUrl: './organisation-tabel.component.html',
    styleUrls: ['./organisation-tabel.component.scss'],
})
export class OrganisationTabelComponent implements OnInit, OnChanges, OnDestroy {
    displayedColumns: string[] = ['name', 'applications', 'menu'];
    public dataSource = new MatTableDataSource<OrganisationResponse>();

    isLoadingResults = true;

    @Input() pageLimit: number;
    @Input() selectedSortObject: Sort;
    public organisations: OrganisationResponse[];
    public pageOffset = 0;
    public pageTotal: number;
    subscription: Subscription;
    deleteOrganisation = new EventEmitter();
    private deleteDialogSubscription: Subscription;

    constructor(
        private organisationService: OrganisationService,
        private deleteDialogService: DeleteDialogService) { }

    ngOnInit(): void {
        this.getOrganisations();
    }

    ngOnChanges() {
        this.getOrganisations();
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.deleteDialogSubscription) {
            this.deleteDialogSubscription.unsubscribe();
        }
    }

    getOrganisations() {
        this.subscription = this.organisationService
            .getMultiple()
            .subscribe((response) => {
                this.organisations = response.data;
                this.dataSource = new MatTableDataSource<OrganisationResponse>(this.organisations);
                this.isLoadingResults = false;
            });
    }

    clickDelete(element: any) {
        this.deleteDialogSubscription = this.deleteDialogService.showSimpleDeleteDialog().subscribe(
            (response) => {
              if (response) {
                this.organisationService.delete(element.id).subscribe((response) => {
                    if (response.ok) {
                        this.getOrganisations();
                    }
                });
              } else {
                console.log(response);
              }
            }
          );
    }
}
