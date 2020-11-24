import { Component, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Organisation } from '@app/admin/organisation/organisation.model';
import { TranslateService } from '@ngx-translate/core';
import { Sort } from '@shared/models/sort.model';
import { ChirpstackGatewayService } from '@shared/services/chirpstack-gateway.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Gateway, GatewayResponseMany } from '../gateway.model';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { MeService } from '@shared/services/me.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';


@Component({
  selector: 'app-gateway-list',
  templateUrl: './gateway-list.component.html',
  styleUrls: ['./gateway-list.component.scss']
})
export class GatewayListComponent implements OnInit, OnChanges, OnDestroy {
  isLoadingResults = true;
  selectedOrg: number;

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
  organisations: Organisation[];
  orgSubscribtion: Subscription;

  private deleteDialogSubscription: Subscription;
  public pageOffset = 0;
  public pageTotal: number;

  constructor(
    public translate: TranslateService,
    private chirpstackGatewayService: ChirpstackGatewayService,
    private deleteDialogService: DeleteDialogService,
    private meService: MeService,
    private sharedVariableService: SharedVariableService) {
    translate.use('da');
    moment.locale('da');
  }

  ngOnInit(): void {
    this.getGateways();
    this.organisations = this.sharedVariableService.getOrganizationInfo();
  }

  ngOnChanges() {
  }

  public filterGatewayByOrgId(event: number) {
    this.selectedOrg = event;
    if (event) {
      this.getGateway(event);
    } else {
      this.getGateways();
    }
  }

  private getGateways(): void {
    this.gatewaySubscription = this.chirpstackGatewayService.getMultiple(
      {
        limit: this.pageLimit,
        offset: this.pageOffset * this.pageLimit,
        sort: this.selectedSortObject.dir,
        orderOn: this.selectedSortObject.col,
      }
    )
      .subscribe(
        (gateways: GatewayResponseMany) => {
          this.gateways = gateways.result;
          this.mapToCoordinateList();
          this.setCanEdit();
          this.isLoadingResults = false;
        }
      );
  }

  private getGateway(orgId: number): void {
    this.gatewaySubscription = this.chirpstackGatewayService.getMultiple(
      {
        limit: this.pageLimit,
        offset: this.pageOffset * this.pageLimit,
        sort: this.selectedSortObject.dir,
        orderOn: this.selectedSortObject.col,
        organizationId: orgId,
      }
    )
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
      if (this.selectedOrg) {
        this.getGateway(this.selectedOrg);
      } else {
        this.getGateways();
      }
      this.showmap = true;
    }
  }

  private mapToCoordinateList() {
    const tempcoordinateList = [];
    this.gateways.map(
      gateway => tempcoordinateList.push(
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
      ),
    );
    this.coordinateList = tempcoordinateList;
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
