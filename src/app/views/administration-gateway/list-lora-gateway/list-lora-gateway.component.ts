import { Component, OnInit } from '@angular/core';
import { Sort } from 'src/app/models/sort';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-lora-gateway',
  templateUrl: './list-lora-gateway.component.html',
  styleUrls: ['./list-lora-gateway.component.scss']
})
export class ListLoraGatewayComponent implements OnInit {

  public pageLimit: number = 10;
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
    public selectedSortId: number = 1;
    public selectedSortObject: Sort = {
        id: 1,
        dir: 'ASC',
        col: 'name',
        label: 'SORT.NAME-ASCENDING',
    };

  constructor(public translate: TranslateService) {
      translate.use('da');
   }

  ngOnInit(): void {
  }
  
  updatePageLimit(limit: any) {
      console.log(limit);
  }

  changeSort(sortId: number) {
      for (let i = 0; i < this.sort.length; i++) {
          const elem = this.sort[i];
          if (elem.id == sortId) {
              this.selectedSortObject = elem;
          }
      }
  }
}
