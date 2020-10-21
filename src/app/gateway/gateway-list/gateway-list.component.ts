import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MapCoordinates } from '@shared/components/map/map-coordinates.model';
import { Sort } from '@shared/models/sort.model';

@Component({
  selector: 'app-gateway-list',
  templateUrl: './gateway-list.component.html',
  styleUrls: ['./gateway-list.component.scss']
})
export class GatewayListComponent implements OnInit {

  public coordinateList: [MapCoordinates];
  public showmap = false;
  public pageLimit = 10;
  public selectedSortId = 1;
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

  showMap(event) {
    if (event.index === 1) {
      this.showmap = true;
    }
  }

  getCoordinateList() {
    return [new MapCoordinates()];
  }
}
