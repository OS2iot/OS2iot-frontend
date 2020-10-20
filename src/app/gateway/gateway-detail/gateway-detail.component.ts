import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChirpstackGatewayService } from 'src/app/shared/services/chirpstack-gateway.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BackButton } from '@shared/models/back-button.model';
import { Gateway, GatewayStats } from '../gateway.model';

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
    deleteGateway = new EventEmitter();

    constructor(
        private gatewayService: ChirpstackGatewayService,
        private route: ActivatedRoute,
        private translate: TranslateService,
        private router: Router,
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

    bindGateway(id: string): void {
        this.gatewayService.get(id).subscribe((result: any) => {
            result.gateway.tagsString = JSON.stringify(result.gateway.tags);
            this.gateway = result.gateway;
            this.gatewayStats = result.stats;
            this.dataSource = new MatTableDataSource<GatewayStats>(this.gatewayStats);
            console.log('gateway', this.gateway);
        });
    }

    onDeleteGateway() {
        console.log('delete');
        const id = this.gateway.id;
        this.gatewayService.delete(id).subscribe((response) => {
            if (response.ok && response.body.success === true) {
                this.deleteGateway.emit(id);

            }
        });
        this.router.navigate(['gateways']);
    }

    ngOnDestroy() {
        if (this.gatewaySubscription) {
            this.gatewaySubscription.unsubscribe();
        }
    }
}
