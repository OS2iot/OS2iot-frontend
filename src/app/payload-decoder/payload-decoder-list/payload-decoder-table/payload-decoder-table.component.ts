import { Component, OnInit, OnDestroy, OnChanges, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { PayloadDecoder } from 'src/app/payload-decoder/payload-decoder.model';
import { Subscription } from 'rxjs';
import { PayloadDecoderService } from '@app/payload-decoder/payload-decoder.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tableSorter } from '@shared/helpers/table-sorting.helper';

@Component({
  selector: 'app-payload-decoder-table',
  templateUrl: './payload-decoder-table.component.html',
  styleUrls: ['./payload-decoder-table.component.scss']
})
export class PayloadDecoderTableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'payload-decoder-id', 'menu'];
  public dataSource = new MatTableDataSource<PayloadDecoder>();
  public payloadDecoders: PayloadDecoder[];
  payloadDecoder: PayloadDecoder;
  resultsLength = 0;
  isLoadingResults = true;
  deletePayloadDecoder = new EventEmitter();
  private subscription: Subscription;

  constructor(
    private payloadDecoderService: PayloadDecoderService
  ) { }

  ngOnInit(): void {
    this.getPayloadDecoders();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getPayloadDecoders() {
    this.subscription = this.payloadDecoderService.getMultiple()
      .subscribe(
        (response) => {
          this.payloadDecoders = response.data;
          this.dataSource = new MatTableDataSource<PayloadDecoder>(this.payloadDecoders);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = tableSorter;
          this.isLoadingResults = false;
        });
  }

  ngOnChanges() {
    this.getPayloadDecoders();
  }

  clickDelete(element: any) {
    this.payloadDecoderService.delete(element.id).subscribe((response) => {
      if (response.ok) {
        this.deletePayloadDecoder.emit(element.id);
        this.getPayloadDecoders();
      }
    });
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
