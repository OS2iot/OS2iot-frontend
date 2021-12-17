import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { PayloadDecoder } from 'src/app/payload-decoder/payload-decoder.model';
import { Subscription } from 'rxjs';
import { PayloadDecoderService } from '@app/payload-decoder/payload-decoder.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MeService } from '@shared/services/me.service';
import { environment } from '@environments/environment';
import { Organisation } from '@app/admin/organisation/organisation.model';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-payload-decoder-table',
  templateUrl: './payload-decoder-table.component.html',
  styleUrls: ['./payload-decoder-table.component.scss'],
})
export class PayloadDecoderTableComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'id', 'organizationID', 'menu'];
  public pageSize = environment.tablePageSize;

  data: PayloadDecoder[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  organizations: Organisation[];
  deleteDialogSubscription: Subscription;
  errorTitle: string;
  errorMessage: string;
  selectedOrgId?: number = null;

  constructor(
    private payloadDecoderService: PayloadDecoderService,
    private meService: MeService,
    private sharedVariableService: SharedVariableService,
    private deleteDialogService: DeleteDialogService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.organizations = this.sharedVariableService.getOrganizationInfo();
    this.translateService
      .get(['PAYLOAD-DECODER.DELETE-FAILED'])
      .subscribe((translations) => {
        this.errorTitle = translations['PAYLOAD-DECODER.DELETE-FAILED'];
      });
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getPayloadDecoders(this.sort.active, this.sort.direction);
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.count;

          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe((data) => (this.data = data));
  }

  getPayloadDecoders(orderByColumn: string, orderByDirection: string) {
    return this.payloadDecoderService.getMultiple(
      this.paginator.pageSize,
      this.paginator.pageIndex * this.paginator.pageSize,
      orderByDirection,
      orderByColumn,
      this.selectedOrgId
    );
  }

  getCanEdit(organizationId: number) {
    return this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite, organizationId);
  }

  public filterByOrgId(event: number) {
    this.selectedOrgId = event;
    this.refresh();
  }

  private refresh() {
    this.paginator.page.emit({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.resultsLength,
    });
  }

  clickDelete(element: any) {
    this.deleteDialogSubscription = this.deleteDialogService
      .showSimpleDialog()
      .subscribe((response) => {
        if (response) {
          this.payloadDecoderService
            .delete(element.id)
            .subscribe((response) => {
              if (response.ok) {
                this.refresh();
              } else {
                this.deleteDialogSubscription = this.deleteDialogService
                  .showSimpleDialog(
                    response.error.message,
                    false,
                    false,
                    true,
                    this.errorTitle
                  )
                  .subscribe();
              }
            });
        } else {
          console.log(response);
        }
      });
  }

  ngOnDestroy() {
    if (this.deleteDialogSubscription) {
      this.deleteDialogSubscription.unsubscribe();
    }
  }
}
