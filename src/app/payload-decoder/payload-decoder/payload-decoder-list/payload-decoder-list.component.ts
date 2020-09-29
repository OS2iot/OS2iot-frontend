import { Component, OnInit } from '@angular/core';
import { Sort } from '@shared/models/sort.model';

@Component({
    selector: 'app-payload-decoder-list',
    templateUrl: './payload-decoder-list.component.html',
    styleUrls: ['./payload-decoder-list.component.scss']
})
export class PayloadDecoderListComponent implements OnInit {

    public pageLimit = 10;
    public sort: Sort[] = [
        {
            id: 1,
            dir: 'ASC',
            col: 'updatedAt',
            label: 'SORT.UPDATED-ASCENDING',
        },
        {
            id: 2,
            dir: 'DESC',
            col: 'updatedAt',
            label: 'SORT.UPDATED-DESCENDING',
        },
        {
            id: 3,
            dir: 'ASC',
            col: 'createdAt',
            label: 'SORT.CREATED-ASCENDING',
        },
        {
            id: 4,
            dir: 'DESC',
            col: 'createdAt',
            label: 'SORT.CREATED-DESCENDING',
        },
        {
            id: 5,
            dir: 'ASC',
            col: 'name',
            label: 'SORT.NAME-ASCENDING',
        },
        {
            id: 6,
            dir: 'DESC',
            col: 'name',
            label: 'SORT.NAME-DESCENDING',
        },
    ];
    public selectedSortId = 1;
    public selectedSortObject: Sort = {
        id: 6,
        dir: 'DESC',
        col: 'name',
        label: 'SORT.NAME-DESCENDING',
    };

    constructor() { }

    ngOnInit(): void {
    }

    updatePageLimit(limit: any) {
        console.log(limit);
    }

    changeSort(sortId: number) {
        for (let i = 0; i < this.sort.length; i++) {
            const elem = this.sort[i];
            if (elem.id === sortId) {
                this.selectedSortObject = elem;
            }
        }
    }

}
