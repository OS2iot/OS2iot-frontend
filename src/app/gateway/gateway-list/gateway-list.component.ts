import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Sort } from '@shared/models/sort.model';
import { ChirpstackGatewayService } from '@shared/services/chirpstack-gateway.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Gateway, GatewayResponseMany } from '../gateway.model';

@Component({
  selector: 'app-gateway-list',
  templateUrl: './gateway-list.component.html',
  styleUrls: ['./gateway-list.component.scss']
})
export class GatewayListComponent implements OnInit, OnDestroy {

  public coordinateList = [];
  public showmap = false;
  public pageLimit = 10;
  public selectedSortId = 1;
  public gateways: Gateway[];
  private gatewaySubscription: Subscription;
  public selectedSortObject: Sort = {
    id: 1,
    dir: 'ASC',
    col: 'name',
    label: 'SORT.NAME-ASCENDING',
  };

  constructor(
    public translate: TranslateService,
    private chirpstackGatewayService: ChirpstackGatewayService) {
    translate.use('da');
    moment.locale('da');
  }

  ngOnInit(): void {
  }

  private getGateways(): void {
    this.gatewaySubscription = this.chirpstackGatewayService.getMultiple()
      .subscribe(
        (gateways: GatewayResponseMany) => {
          this.gateways = gateways.result;
          this.mapToCoordinateList();
        }
      );
  }

  showMap(event: any) {
    if (event.index === 1) {
      this.getGateways();
      this.showmap = true;
    }
  }
  private mapToCoordinateList() {
    this.gateways.map(
      gateway => this.coordinateList.push(
        {
          longitude: gateway.location.longitude,
          latitude: gateway.location.latitude,
          draggable: false,
          editEnabled: false,
          useGeolocation: false,
          markerInfo: {
            name: gateway.name,
            active: this.gatewayStatus(gateway),
            id: gateway.id
          }
        }
      )
    );
    console.log('getCoordinateList called');
  }

  ngOnDestroy(): void {
    if (this.gatewaySubscription) {
      this.gatewaySubscription.unsubscribe();
    }
  }

  gatewayStatus(gateway: Gateway): boolean {
    return this.chirpstackGatewayService.isGatewayActive(gateway);
  }
}
