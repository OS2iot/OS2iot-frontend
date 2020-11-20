import { Component, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Organisation } from '@app/admin/organisation/organisation.model';
import { TranslateService } from '@ngx-translate/core';
import { Sort } from '@shared/models/sort.model';
import { ChirpstackGatewayService } from '@shared/services/chirpstack-gateway.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Gateway, GatewayResponseMany } from '../gateway.model';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { MeService } from '@shared/services/me.service';


@Component({
  selector: 'app-gateway-list',
  templateUrl: './gateway-list.component.html',
  styleUrls: ['./gateway-list.component.scss']
})
export class GatewayListComponent implements OnInit, OnChanges, OnDestroy {
  isLoadingResults = true;
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

  private deleteDialogSubscription: Subscription;
  public pageOffset = 0;
  public pageTotal: number;

  constructor(
    public translate: TranslateService,
    private chirpstackGatewayService: ChirpstackGatewayService,
    private deleteDialogService: DeleteDialogService,
    private meService: MeService) {
    translate.use('da');
    moment.locale('da');
  }

  ngOnInit(): void {
    this.getGateways();
  }

  ngOnChanges() {
    this.getGateways();
  }

  public filterGatewaysToMap(event: any) {
    console.log('this event: ' + event);
    const newFilter = [];
    this.gateways.forEach(
      (gateway: Gateway) => {
        if (gateway.internalOrganizationId === event) {
          newFilter.push({ latitude: gateway.location.latitude, longitude: gateway.location.longitude });
        }
      }
    );
    console.log(newFilter);
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
          this.setCanEdit();
          this.isLoadingResults = false;
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

  gatewayStatus(gateway: Gateway): boolean {
    return this.chirpstackGatewayService.isGatewayActive(gateway);
  }

  deleteGateway(id: string) {
    this.deleteDialogSubscription = this.deleteDialogService.showSimpleDeleteDialog().subscribe(
      (response) => {
        if (response) {
          this.chirpstackGatewayService.delete(id).subscribe((response) => {
            if (response.ok && response.body.success === true) {
              this.getGateways();
            }
          });
        } else {
          console.log(response);
        }
      }
    );
  }

  setCanEdit() {
    this.gateways.forEach(
      (gateway) => {
        gateway.canEdit = this.meService.canWriteInTargetOrganization(gateway.internalOrganizationId);
      }
    );
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    if (this.gatewaySubscription) {
      this.gatewaySubscription.unsubscribe();
    }
    if (this.deleteDialogSubscription) {
      this.deleteDialogSubscription.unsubscribe();
    }
  }

}
