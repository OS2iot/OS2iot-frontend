import { Component, OnInit } from '@angular/core';
import { Gateway } from 'src/app/models/gateway';
import { Subscription } from 'rxjs';
import { Sort } from 'src/app/models/sort';
import { ChirpstackGatewayService } from 'src/app/shared/_services/chirpstack-gateway.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
<<<<<<< HEAD
import { BackButton } from 'src/app/models/back-button';
import { QuickActionButton } from 'src/app/models/quick-action-button';
=======
>>>>>>> 3ee7b3c843dc961636720e3d5594eb6b515a1f20

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent implements OnInit {

  public gatewaySubscription: Subscription;
  public gateway: Gateway;
<<<<<<< HEAD
  public backButton: BackButton = {label: '', routerLink: '/mine-lora-gateways'};
=======
>>>>>>> 3ee7b3c843dc961636720e3d5594eb6b515a1f20
  private id: string;
  public pageLimit: number = 10;
  public pageOffset: number = 0;
  public pageTotal: number;
  public selectedSortId: number = 6;
  public selectedSortObject: Sort = {
      id: 6,
      dir: 'DESC',
      col: 'createdAt',
      label: 'SORT.CREATED-DESCENDING',
  };
  public sort: Sort[] = [
    {
        id: 1,
        dir: 'ASC',
        col: 'name',
        label: 'SORT.NAME-ASCENDING',
    },
    {
        id: 2,
        dir: 'DESC',
        col: 'name',
        label: 'SORT.NAME-DESCENDING',
    },
    {
        id: 3,
        dir: 'ASC',
        col: 'updatedAt',
        label: 'SORT.UPDATED-ASCENDING',
    },
    {
        id: 4,
        dir: 'DESC',
        col: 'updatedAt',
        label: 'SORT.UPDATED-DESCENDING',
    },
    {
        id: 5,
        dir: 'ASC',
        col: 'createdAt',
        label: 'SORT.CREATED-ASCENDING',
    },
    {
        id: 6,
        dir: 'DESC',
        col: 'createdAt',
        label: 'SORT.CREATED-DESCENDING',
    },
    {
        id: 7,
        dir: 'ASC',
        col: 'createdAt',
        label: 'SORT.APPLICATION-ASCENDING',
    },
    {
        id: 8,
        dir: 'DESC',
        col: 'createdAt',
        label: 'SORT.APPLICATION-DESCENDING',
    },
    {
        id: 9,
        dir: 'ASC',
        col: 'createdAt',
        label: 'SORT.BATTERY-ASCENDING',
    },
    {
        id: 10,
        dir: 'DESC',
        col: 'createdAt',
        label: 'SORT.BATTERY-DESCENDING',
    },
  ];
<<<<<<< HEAD
  public buttons: QuickActionButton[] = [
    {
        label: 'GEN.EDIT',
        type: 'edit',
    },
];
=======
>>>>>>> 3ee7b3c843dc961636720e3d5594eb6b515a1f20

  constructor(
      private gatewayService: ChirpstackGatewayService,
      private route: ActivatedRoute,
      public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.bindGateway(this.id);
        }
<<<<<<< HEAD
    this.translate.get(['NAV.MY-LORA-GATEWAYS'])
    .subscribe(translations => {
        this.backButton.label = translations['NAV.MY-LORA-GATEWAYS'];
    });
  }

  bindGateway(id: string): void {
    this.gatewayService.get(id).subscribe((result: any) => {
        this.gateway = result.result[0];
=======
  }

  bindGateway(id: string): void {
    this.gatewayService.get(id).subscribe((gateway) => {
        this.gateway = gateway.gateway;
>>>>>>> 3ee7b3c843dc961636720e3d5594eb6b515a1f20
        console.log('gateway', this.gateway);
    });
  }
  updatePageLimit(limit: any) {
    console.log(limit);
  }

  changeSort(sortId: number) {
      for (let i = 0; i < this.sort.length; i++) {
          const elem = this.sort[i];
          if (elem.id == sortId) {
              this.selectedSortObject = elem;
          }
      }
  }

  ngOnDestroy() {
      if (this.gatewaySubscription) {
          this.gatewaySubscription.unsubscribe();
      }
  }
}
