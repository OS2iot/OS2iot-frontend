import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { ChirpstackGatewayService } from 'src/app/shared/services/chirpstack-gateway.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BackButton } from '@shared/models/back-button.model';
import { Gateway, GatewayStats } from '../gateway.model';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { MeService } from '@shared/services/me.service';
import { environment } from '@environments/environment';
import { DropdownButton } from '@shared/models/dropdown-button.model';
import { ChartConfiguration } from 'chart.js';

@Component({
    selector: 'app-gateway-detail',
    templateUrl: './gateway-detail.component.html',
    styleUrls: ['./gateway-detail.component.scss']
})
export class GatewayDetailComponent implements OnInit, OnDestroy, AfterViewInit {

    displayedColumns: string[] = ['rxPacketsReceived', 'txPacketsEmitted', 'txPacketsReceived'];
    private gatewayStats: GatewayStats[];
    public pageSize = environment.tablePageSize;
    public dataSource = new MatTableDataSource<GatewayStats>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public resultLength = 0;

    public gatewaySubscription: Subscription;
    public gateway: Gateway;
    public backButton: BackButton = { label: '', routerLink: ['gateways'] };
    id: string;
    deleteGateway = new EventEmitter();
    private deleteDialogSubscription: Subscription;
    public dropdownButton: DropdownButton;
    isLoadingResults = true;
    isGatewayStatusVisibleSubject = new Subject<void>();
    receivedChartData: ChartConfiguration['data'] = { datasets: [] };
    sentChartData: ChartConfiguration['data'] = { datasets: [] };

    constructor(
        private gatewayService: ChirpstackGatewayService,
        private route: ActivatedRoute,
        private translate: TranslateService,
        private router: Router,
        private meService: MeService,
        private deleteDialogService: DeleteDialogService
    ) { }

    ngOnInit(): void {
        this.translate.use('da');
        this.id = this.route.snapshot.paramMap.get('id');
        this.translate.get(['NAV.LORA-GATEWAYS'])
            .subscribe(translations => {
                this.backButton.label = translations['NAV.LORA-GATEWAYS'];
            }
            );
    }

    ngAfterViewInit() {
        if (this.id) {
            this.bindGateway(this.id);
        }
    }

    getCoordinates() {
        return {
            longitude: this.gateway.location.longitude,
            latitude: this.gateway.location.latitude,
            draggable: false,
            editEnabled: false,
            useGeolocation: false,
            markerInfo: { name: this.gateway.name, active: this.gatewayService.isGatewayActive(this.gateway), id: this.gateway.id, internalOrganizationName: this.gateway.internalOrganizationName }
        };
    }

    bindGateway(id: string): void {
        this.gatewayService.get(id).subscribe((result: any) => {
            result.gateway.tagsString = JSON.stringify(result.gateway.tags);
            this.gateway = result.gateway;
            this.gateway.canEdit = this.canEdit();
            this.gatewayStats = result.stats;
            this.gatewayStats.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            this.dataSource.data = this.gatewayStats;
            this.resultLength = this.gatewayStats.length;
            this.dataSource.paginator = this.paginator;
            this.setDropdownButton();
            this.isLoadingResults = false;

            this.isGatewayStatusVisibleSubject.next();
        });
    }

    setDropdownButton() {
        this.dropdownButton = this.canEdit() ? {
            label: 'LORA-GATEWAY-TABLE-ROW.SHOW-OPTIONS',
            editRouterLink: '../../gateway-edit/' + this.id,
            isErasable: true,
        } : null;
        this.translate.get(['LORA-GATEWAY-TABLE-ROW.SHOW-OPTIONS'])
            .subscribe(translations => {
                this.dropdownButton.label = translations['LORA-GATEWAY-TABLE-ROW.SHOW-OPTIONS'];
            }
            );
    }

    canEdit(): boolean {
        return this.meService.canWriteInTargetOrganization(this.gateway.internalOrganizationId);
    }

    onDeleteGateway() {
        this.deleteDialogSubscription = this.deleteDialogService.showSimpleDialog().subscribe(
            (response) => {
                if (response) {
                    this.gatewayService.delete(this.gateway.id).subscribe((response) => {
                        if (response.ok && response.body.success === true) {
                        }
                    });
                    this.router.navigate(['gateways']);
                } else {
                    console.log(response);
                }
            }
        );
    }

    ngOnDestroy() {
        if (this.gatewaySubscription) {
            this.gatewaySubscription.unsubscribe();
        }
        if (this.deleteDialogSubscription) {
            this.deleteDialogSubscription.unsubscribe();
        }
    }
}
