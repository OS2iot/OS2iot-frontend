import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Sort } from 'src/app/models/sort';
import { PayloadDecoder } from 'src/app/models/payload-decoder';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payload-decoder-table',
  templateUrl: './payload-decoder-table.component.html',
  styleUrls: ['./payload-decoder-table.component.scss']
})
export class PayloadDecoderTableComponent implements OnInit, OnChanges, OnDestroy {

  @Input() pageLimit: number;
  @Input() selectedSortObject: Sort;
  public payloadDecoders: PayloadDecoder[];
  public pageOffset = 0;
  public pageTotal: number;

  private payloaddecordersSubscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.payloadDecoders = [{name: 'test', id: 2, decodingFunction: '{"res":"ser"}'}];
  }

  ngOnChanges() {
    this.getPayloadDecoders();
}

  deletePayloadDecoder(id: number) {
    return;
  }

  prevPage() {
      if (this.pageOffset) { this.pageOffset--; }
      this.getPayloadDecoders();
  }

  nextPage() {
      if (this.pageOffset < this.pageTotal) this.pageOffset++;
      this.getPayloadDecoders();
  }

  getPayloadDecoders(): void {
    return;
}

  ngOnDestroy() {
      // prevent memory leak by unsubscribing
      if (this.payloaddecordersSubscription) {
          this.payloaddecordersSubscription.unsubscribe();
      }
  }

}
