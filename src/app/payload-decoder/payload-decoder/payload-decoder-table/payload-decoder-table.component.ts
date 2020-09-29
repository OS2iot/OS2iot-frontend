import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { PayloadDecoder } from 'src/app/payload-decoder/payload-decoder.model';
import { Subscription } from 'rxjs';
import { PayloadDecoderService } from '@app/payload-decoder/payload-decoder.service';
import { Sort } from '@shared/models/sort.model';

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
  subscription: Subscription;

  constructor(
    private payloadDecoderService: PayloadDecoderService
  ) { }

  ngOnInit(): void {
    this.getPayloadDecoders();
  }

  getPayloadDecoders() {
    this.subscription = this.payloadDecoderService.getMultiple()
      .subscribe(
        (response) => {
          this.payloadDecoders = response.data;
        });
  }

  ngOnChanges() {
    this.getPayloadDecoders();
  }

  deletePayloadDecoder(id: number) {
    console.log('delete:', id);
    this.payloadDecoderService.delete(id).subscribe((response) => {
      if (response.ok) {
        this.getPayloadDecoders();
      }
    });
  }

  prevPage() {
    if (this.pageOffset) { this.pageOffset--; }
    this.getPayloadDecoders();
  }

  nextPage() {
    if (this.pageOffset < this.pageTotal) { this.pageOffset++; }
    this.getPayloadDecoders();
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
