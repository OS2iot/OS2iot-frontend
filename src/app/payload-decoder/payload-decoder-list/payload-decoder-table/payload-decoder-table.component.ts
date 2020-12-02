import { Component, OnInit, OnDestroy, OnChanges, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { PayloadDecoder } from 'src/app/payload-decoder/payload-decoder.model';
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
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { DialogModel } from '@shared/models/dialog.model';

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
  public dataSource = new MatTableDataSource<PayloadDecoder>();
  public payloadDecoders: PayloadDecoder[];
  payloadDecoder: PayloadDecoder;
  resultsLength = 0;
  isLoadingResults = true;
  deletePayloadDecoder = new EventEmitter();
  private subscription: Subscription;
  organizations: Organisation[];
  deleteDialogSubscription: Subscription;
  errorTitle: string;
  errorMessage: string;

  constructor(
    private payloadDecoderService: PayloadDecoderService,
    private meService: MeService,
    private sharedVariableService: SharedVariableService,
    private deleteDialogService: DeleteDialogService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getPayloadDecoders();
    this.organizations = this.sharedVariableService.getOrganizationInfo();
    this.translateService
      .get(['PAYLOAD-DECODER.DELETE-FAILED'])
      .subscribe((translations) => {
        this.errorTitle = translations['PAYLOAD-DECODER.DELETE-FAILED'];
      });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getPayloadDecoders() {
    this.subscription = this.payloadDecoderService.getMultiple()
      .subscribe(
        (response) => {
          this.payloadDecoders = response;
          this.setCanEdit();
          this.dataSource = new MatTableDataSource<PayloadDecoder>(this.payloadDecoders);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = tableSorter;
          this.isLoadingResults = false;
        });
  }

  getPayloadDecodersWith(orgId: number) {
    this.subscription = this.payloadDecoderService.getMultiple(orgId)
      .subscribe(
        (response: PayloadDecoder[]) => {
          this.payloadDecoders = response;
          this.setCanEdit();
          this.dataSource = new MatTableDataSource<PayloadDecoder>(this.payloadDecoders);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = tableSorter;
          this.isLoadingResults = false;
        });
  }

  setCanEdit() {
    this.payloadDecoders.forEach(
      (payloadDecoder) => {
        payloadDecoder.canEdit = this.meService.canWriteInTargetOrganization(payloadDecoder.organizationId);
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
    this.deleteDialogSubscription = this.deleteDialogService.showSimpleDialog().subscribe(
      (response) => {
        if (response) {
          this.payloadDecoderService.delete(element.id).subscribe(
            (response) => {
              if (response.ok) {
                this.getPayloadDecoders();
              } else {
                this.deleteDialogSubscription = this.deleteDialogService.showSimpleDialog(
                  response.error.message,
                  false,
                  false,
                  true,
                  this.errorTitle).subscribe();
              }
            },
          );
        } else {
          console.log(response);
        }
      }
    );
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.deleteDialogSubscription) {
      this.deleteDialogSubscription.unsubscribe();
    }
  }

}
