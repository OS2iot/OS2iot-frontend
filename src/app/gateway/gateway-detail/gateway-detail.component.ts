import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChirpstackGatewayService } from 'src/app/shared/services/chirpstack-gateway.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BackButton } from '@shared/models/back-button.model';
import { Gateway, GatewayStats } from '../gateway.model';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { MeService } from '@shared/services/me.service';

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
    private deleteDialogSubscription: Subscription;

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
        return {
            longitude: this.gateway.location.longitude,
            latitude: this.gateway.location.latitude,
            draggable: false,
            editEnabled: false,
            useGeolocation: false
        };
    }

    bindGateway(id: string): void {
        this.gatewayService.get(id).subscribe((result: any) => {
            result.gateway.tagsString = JSON.stringify(result.gateway.tags);
            this.gateway = result.gateway;
            this.canEdit()
            this.gatewayStats = result.stats;
            this.gatewayStats.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            this.dataSource = new MatTableDataSource<GatewayStats>(this.gatewayStats);
            this.dataSource.paginator = this.paginator;
            console.log('gateway', this.gateway);
        });
    }

    canEdit() {
        this.meService.canWriteInTargetOrganization(this.gateway.organizationID)
          .subscribe(
            (response) => {
              this.gateway.canEdit = response;
            }
          );
      }

    onDeleteGateway() {
        this.deleteDialogSubscription = this.deleteDialogService.showSimpleDeleteDialog().subscribe(
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
