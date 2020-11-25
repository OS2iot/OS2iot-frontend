import { Component, OnInit, OnDestroy, OnChanges, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { PayloadDecoderBodyResponse } from 'src/app/payload-decoder/payload-decoder.model';
import { Subscription } from 'rxjs';
import { PayloadDecoderService } from '@app/payload-decoder/payload-decoder.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tableSorter } from '@shared/helpers/table-sorting.helper';
import { MeService } from '@shared/services/me.service';
import { environment } from '@environments/environment';
import { Organisation } from '@app/admin/organisation/organisation.model';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

@Component({
  selector: 'app-payload-decoder-table',
  templateUrl: './payload-decoder-table.component.html',
  styleUrls: ['./payload-decoder-table.component.scss']
})
export class PayloadDecoderTableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'payload-decoder-id', 'organizationID', 'menu'];
  public pageSize = environment.tablePageSize;
  public dataSource = new MatTableDataSource<PayloadDecoderBodyResponse>();
  public payloadDecoders: PayloadDecoderBodyResponse[];
  payloadDecoder: PayloadDecoderBodyResponse;
  resultsLength = 0;
  isLoadingResults = true;
  deletePayloadDecoder = new EventEmitter();
  private subscription: Subscription;
  organizations: Organisation[];

  constructor(
    private payloadDecoderService: PayloadDecoderService,
    private meService: MeService,
    private sharedVariableService: SharedVariableService
  ) { }

  ngOnInit(): void {
    this.getPayloadDecoders();
    this.organizations = this.sharedVariableService.getOrganizationInfo();
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
          this.setCanEdit();
          this.dataSource = new MatTableDataSource<PayloadDecoderBodyResponse>(this.payloadDecoders);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = tableSorter;
          this.isLoadingResults = false;
        });
  }

  getPayloadDecodersWith(orgId: number) {
    this.subscription = this.payloadDecoderService.getMultiple(orgId)
      .subscribe(
        (response) => {
          this.payloadDecoders = response.data;
          this.setCanEdit();
          this.dataSource = new MatTableDataSource<PayloadDecoderBodyResponse>(this.payloadDecoders);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = tableSorter;
          this.isLoadingResults = false;
        });
  }

  setCanEdit() {
    this.payloadDecoders.forEach(
      (payloadDecoder) => {
        payloadDecoder.canEdit = this.meService.canWriteInTargetOrganization(payloadDecoder.organization?.id);
      }
    );
  }

  public filterByOrgId(event: number) {
    if (event) {
      this.getPayloadDecodersWith(event);
    } else {
      this.getPayloadDecoders();
    }
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
