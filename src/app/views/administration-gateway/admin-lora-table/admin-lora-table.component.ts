import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { Sort } from 'src/app/models/sort';
import { Subscribable, Subscription, Observable } from 'rxjs';
import { ChirpstackGatewayService } from 'src/app/shared/_services/chirpstack-gateway.service';
import { TranslateService } from '@ngx-translate/core';
import { Gateway } from 'src/app/models/gateway';

@Component({
  selector: 'app-admin-lora-table',
  templateUrl: './admin-lora-table.component.html',
  styleUrls: ['./admin-lora-table.component.scss']
})
export class AdminLoraTableComponent implements OnInit, OnChanges, OnDestroy {
  
  @Input() pageLimit: number;
  @Input() selectedSortObject: Sort;
  public gateways: Observable<Gateway[]>;
  public pageOffset: number = 0;
  public pageTotal: number;

  private gatewaySubscription: Subscription;
  
  constructor(
    private chirpstackGatewayService: ChirpstackGatewayService,
    public translate: TranslateService) { 
      this.translate.use('da')
    }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log('pageLimit', this.pageLimit);
    console.log('selectedSortId', this.selectedSortObject);
    this.getLoraGateways()
  }

  getLoraGateways(): void {
      this.gatewaySubscription = this.chirpstackGatewayService.get(
        null, {
            limit: this.pageLimit,
            offset: this.pageOffset * this.pageLimit,
            sort: this.selectedSortObject.dir,
            orderOn: this.selectedSortObject.col
        })
        .subscribe( 
          (gateways) => {
            this.gateways = gateways.result
            if (this.pageLimit) {
              console.log(gateways.result);
              this.pageTotal = Math.ceil(gateways.count / this.pageLimit);
          }
        }
      )
  }

  deleteGateway(id: string) {
    console.log('delete')
    this.chirpstackGatewayService.delete(id).subscribe((response) => {
      if (response.ok && response.body.affected > 0) {
          this.getLoraGateways();
      }
  });
  }

  prevPage() {
      if (this.pageOffset) this.pageOffset--;
      this.getLoraGateways();
  }

  nextPage() {
      if (this.pageOffset < this.pageTotal) this.pageOffset++;
      this.getLoraGateways();
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    if (this.gatewaySubscription) {
        this.gatewaySubscription.unsubscribe();
    }
}

}
