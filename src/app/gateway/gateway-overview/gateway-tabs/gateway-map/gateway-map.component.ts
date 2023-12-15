import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { Gateway, GatewayResponseMany } from "@app/gateway/gateway.model";
import { Subscription } from "rxjs";
import { ChirpstackGatewayService } from "@shared/services/chirpstack-gateway.service";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { GatewayService } from "@app/gateway/gateway.service";
import { MeService } from "@shared/services/me.service";

@Component({
    selector: "app-gateway-map",
    templateUrl: "./gateway-map.component.html",
    styleUrls: ["./gateway-map.component.scss"],
})
export class GatewayMapComponent implements OnInit, OnDestroy, AfterViewInit {
    public gateways: Gateway[];
    public coordinateList = [];
    private gatewaySubscription: Subscription;
    private organizationChangeSubscription: Subscription;
    isLoadingResults = true;

    constructor(
        private chirpstackGatewayService: ChirpstackGatewayService,
        private gatewayService: GatewayService,
        private meService: MeService
    ) {}

    ngOnInit(): void {}

    ngAfterViewInit() {
        this.organizationChangeSubscription = this.gatewayService.organisationChangeSubject.subscribe(x => {
            if (x) {
                this.getGatewayWith(x);
            } else {
                this.getGateways();
            }
        });
        if (this.gatewayService.selectedOrg) {
            this.getGatewayWith(this.gatewayService.selectedOrg);
        } else {
            this.getGateways();
        }
    }

    private getGateways(): void {
        this.gatewaySubscription = this.chirpstackGatewayService
            .getMultiple({
                limit: null,
                offset: null,
                sort: null,
                orderOn: null,
            })
            .subscribe((gateways: GatewayResponseMany) => {
                this.gateways = gateways.result;
                this.mapToCoordinateList();
                this.setCanEdit();
                this.isLoadingResults = false;
            });
    }

    private getGatewayWith(orgId: number): void {
        this.gatewaySubscription = this.chirpstackGatewayService
            .getMultiple({
                limit: null,
                offset: null,
                sort: null,
                orderOn: null,
                organizationId: orgId,
            })
            .subscribe((gateways: GatewayResponseMany) => {
                this.gateways = gateways.result;
                this.mapToCoordinateList();
                this.setCanEdit();
                this.isLoadingResults = false;
            });
    }

    private mapToCoordinateList() {
        const tempcoordinateList = [];
        this.gateways.map(gateway =>
            tempcoordinateList.push({
                longitude: gateway.location.longitude,
                latitude: gateway.location.latitude,
                draggable: false,
                editEnabled: false,
                useGeolocation: false,
                markerInfo: {
                    name: gateway.name,
                    active: this.gatewayStatus(gateway),
                    id: gateway.id,
                    internalOrganizationId: gateway.organizationId,
                    internalOrganizationName: gateway.organizationName,
                },
            })
        );
        this.coordinateList = tempcoordinateList;
    }

    gatewayStatus(gateway: Gateway): boolean {
        return this.chirpstackGatewayService.isGatewayActive(gateway);
    }

    setCanEdit() {
        this.gateways.forEach(gateway => {
            gateway.canEdit = this.meService.hasAccessToTargetOrganization(
                OrganizationAccessScope.GatewayWrite,
                gateway.organizationId
            );
        });
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.gatewaySubscription?.unsubscribe();
        this.organizationChangeSubscription.unsubscribe();
    }
}
