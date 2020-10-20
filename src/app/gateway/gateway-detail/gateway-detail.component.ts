import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChirpstackGatewayService } from 'src/app/shared/services/chirpstack-gateway.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BackButton } from '@shared/models/back-button.model';
import { Gateway, GatewayStats } from '../gateway.model';
import { getJSDocThisTag } from 'typescript';
import { MapCoordinates } from '@app/map/map-coordinates.model';

@Component({
    selector: 'app-gateway-detail',
    templateUrl: './gateway-detail.component.html',
    styleUrls: ['./gateway-detail.component.scss']
})
export class GatewayDetailComponent implements OnInit, OnDestroy, AfterViewInit {

    public gatewaySubscription: Subscription;
    public gateway: Gateway;
    public backButton: BackButton = { label: '', routerLink: '/gateways' };
    private id: string;
    private gatewayStats: GatewayStats[];
    displayedColumns: string[] = ['rxPacketsReceived', 'txPacketsEmitted', 'txPacketsReceived'];
    public dataSource = new MatTableDataSource<GatewayStats>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private gatewayService: ChirpstackGatewayService,
        private route: ActivatedRoute,
        private translate: TranslateService,
    ) { }

    ngOnInit(): void {
        this.translate.use('da');
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.bindGateway(this.id);
        }
        this.translate.get(['NAV.LORA-GATEWAYS'])
            .subscribe(translations => {
                this.backButton.label = translations['NAV.LORA-GATEWAYS'];
            });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getCoordinates() {
        return [{
            longitude: this.gateway.location.longitude,
            latitude: this.gateway.location.latitude,
            draggable: false
        }];
    }

    bindGateway(id: string): void {
        this.gatewayService.get(id).subscribe((result: any) => {
            result.gateway.tagsString = JSON.stringify(result.gateway.tags);
            this.gateway = result.gateway;
            this.gatewayStats = result.stats;
            this.dataSource = new MatTableDataSource<GatewayStats>(this.gatewayStats);
            console.log('gateway', this.gateway);
        });
    }

    ngOnDestroy() {
        if (this.gatewaySubscription) {
            this.gatewaySubscription.unsubscribe();
        }
    }
}
