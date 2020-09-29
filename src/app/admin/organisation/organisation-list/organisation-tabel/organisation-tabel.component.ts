import { Component, Input, OnInit } from '@angular/core';
import { Sort } from '@shared/models/sort.model';
import { OrganisationService } from '@app/admin/organisation/organisation.service';
import { Subscription } from 'rxjs';
import { OrganisationResponse } from '../../organisation.model';

@Component({
    selector: 'app-organisation-tabel',
    templateUrl: './organisation-tabel.component.html',
    styleUrls: ['./organisation-tabel.component.scss'],
})
export class OrganisationTabelComponent implements OnInit {
    @Input() pageLimit: number;
    @Input() selectedSortObject: Sort;
    public organisations: OrganisationResponse[];
    public pageOffset = 0;
    public pageTotal: number;
    subscription: Subscription;

    constructor(private organisationService: OrganisationService) { }

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
    }

    getOrganisations() {
        this.subscription = this.organisationService
            .getMultiple()
            .subscribe((response) => {
                this.organisations = response.data;
            });
    }

    deleteOrganisation(id: number) {
        console.log('delete:', id);
        this.organisationService.delete(id).subscribe((response) => {
            if (response.ok) {
                this.getOrganisations();
            }
        });
    }
}
