import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@shared/models/sort.model';
import { OrganisationService } from '@app/admin/organisation/organisation.service';
import { Subscription } from 'rxjs';
import { OrganisationResponse } from '../../organisation.model';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { tableSorter } from '@shared/helpers/table-sorting.helper';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from '@environments/environment';

@Component({
    selector: 'app-organisation-tabel',
    templateUrl: './organisation-tabel.component.html',
    styleUrls: ['./organisation-tabel.component.scss'],
})
export class OrganisationTabelComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Input() selectedSortObject: Sort;
    displayedColumns: string[] = ['name', 'applications', 'menu'];
    public dataSource = new MatTableDataSource<OrganisationResponse>();
    isLoadingResults = true;
    public organisations: OrganisationResponse[];
    public pageOffset = 0;
    public resultsLength = 0;
    public pageTotal: number;
    subscription: Subscription;
    deleteOrganisation = new EventEmitter();
    private deleteDialogSubscription: Subscription;
    public pageSize = environment.tablePageSize;

    constructor(
        private organisationService: OrganisationService,
        private deleteDialogService: DeleteDialogService) { }

    ngOnInit(): void {
        this.getOrganisations();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.dataSource.sortingDataAccessor = tableSorter;
                this.isLoadingResults = false;
                this.resultsLength = this.organisations.length;
            });
    }

    clickDelete(element: any) {
        this.deleteDialogSubscription = this.deleteDialogService.showSimpleDialog().subscribe(
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
