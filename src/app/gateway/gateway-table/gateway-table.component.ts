import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ChirpstackGatewayService } from 'src/app/shared/services/chirpstack-gateway.service';
import { TranslateService } from '@ngx-translate/core';
import { Sort } from '@shared/models/sort.model';
import { Gateway } from '../gateway.model';


@Component({
  selector: 'app-gateway-table',
  templateUrl: './gateway-table.component.html',
  styleUrls: ['./gateway-table.component.scss']
})
export class GatewayTableComponent implements OnInit, OnChanges, OnDestroy {

  @Input() pageLimit: number;
  @Input() selectedSortObject: Sort;
  public gateways: Observable<Gateway[]>;
  public pageOffset = 0;
  public pageTotal: number;

  private gatewaySubscription: Subscription;

  constructor(
    private chirpstackGatewayService: ChirpstackGatewayService,
    public translate: TranslateService) {
    this.translate.use('da');
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log('pageLimit', this.pageLimit);
    console.log('selectedSortId', this.selectedSortObject);
    this.getLoraGateways();
  }

  getLoraGateways(): void {
    this.gatewaySubscription = this.chirpstackGatewayService.getMultiple(
      {
        limit: this.pageLimit,
        offset: this.pageOffset * this.pageLimit,
        sort: this.selectedSortObject.dir,
        orderOn: this.selectedSortObject.col
      })
      .subscribe(
        (gateways) => {
          this.gateways = gateways.result;
          if (this.pageLimit) {
            console.log(gateways.result);
            this.pageTotal = Math.ceil(gateways.count / this.pageLimit);
          }
        }
      );
  }

  deleteGateway(id: string) {
    console.log('delete');
    this.chirpstackGatewayService.delete(id).subscribe((response) => {
      if (response.ok && response.body.success === true) {
        this.getLoraGateways();
      }
    });
  }

  prevPage() {
    if (this.pageOffset) { this.pageOffset--; }
    this.getLoraGateways();
  }

  nextPage() {
    if (this.pageOffset < this.pageTotal) { this.pageOffset++; }
    this.getLoraGateways();
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    if (this.gatewaySubscription) {
      this.gatewaySubscription.unsubscribe();
    }
  }

}
