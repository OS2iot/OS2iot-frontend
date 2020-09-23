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
}
