import { Component, OnDestroy, OnInit } from '@angular/core';
import { Organisation } from '@app/admin/organisation/organisation.model';
import { OrganisationService } from '@app/admin/organisation/organisation.service';
import { TranslateService } from '@ngx-translate/core';
import { Sort } from '@shared/models/sort.model';
import { ChirpstackGatewayService } from '@shared/services/chirpstack-gateway.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Gateway, GatewayResponseMany } from '../gateway.model';
import { GatewayTableComponent } from '../gateway-table/gateway-table.component';


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
  organisation: Organisation;
  orgSubscribtion: Subscription;

  constructor(
    public translate: TranslateService,
    private chirpstackGatewayService: ChirpstackGatewayService,
    private organisationService: OrganisationService) {
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


  private getOrganisation(id: number) {
    this.orgSubscribtion = this.organisationService
      .getOne(id)
      .subscribe((response) => {
        this.organisation = response;
        console.log(response);
      });
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
            id: gateway.id,
            organisationId: gateway.organizationID,
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
