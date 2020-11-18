import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Organisation } from '@app/admin/organisation/organisation.model';
import { OrganisationService } from '@app/admin/organisation/organisation.service';
import { TranslateService } from '@ngx-translate/core';
import { Sort } from '@shared/models/sort.model';
import { ChirpstackGatewayService } from '@shared/services/chirpstack-gateway.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Gateway, GatewayResponseMany } from '../gateway.model';
import { GatewayTableComponent } from '../gateway-table/gateway-table.component';
import { FormControl, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-gateway-list',
  templateUrl: './gateway-list.component.html',
  styleUrls: ['./gateway-list.component.scss']
})
export class GatewayListComponent implements OnInit, OnDestroy {

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  @ViewChild('select') select: MatSelect;
  allSelected = false;

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

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }
  optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
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
            id: gateway.id,
            internalOrganizationId: gateway.internalOrganizationId,
            internalOrganizationName: gateway.internalOrganizationName
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
