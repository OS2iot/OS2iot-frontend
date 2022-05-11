import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { MeService } from '@shared/services/me.service';
import { SnackService } from '@shared/services/snack.service';
import { merge, Observable, Subscription, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Multicast, MulticastData } from '../multicast.model';
import { MulticastService } from '../multicast.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-multicast-table',
  templateUrl: './multicast-table.component.html',
  styleUrls: ['./multicast-table.component.scss'],
})
export class MulticastTableComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['groupName', 'groupType', 'menu'];
  multicasts: Multicast[] = [];
  resultsLength = 0;
  public canEdit = false;
  @Input() isLoadingResults = true;
  public pageSize = environment.tablePageSize;
  public pageOffset = 0;
  public applicationId: number;

  private multicastSubscription: Subscription;
  private deleteDialogSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private deleteDialogService: DeleteDialogService,
    private multicastService: MulticastService,
    private meService: MeService,
    public translate: TranslateService,
    public snackService: SnackService
  ) {
    translate.use('da');
  }

  ngOnInit(): void {
    this.applicationId = +Number(this.route.parent.snapshot.paramMap.get('id'));
    this.canEdit = this.meService.hasAccessToTargetOrganization(
      OrganizationAccessScope.ApplicationWrite
    );
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const multicasts = this.getMulticasts(
            this.sort.active,
            this.sort.direction
          );
          return multicasts;
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          if (data.ok === false) {
            this.snackService.showLoadFailSnack();
          }
          this.isLoadingResults = false;
          this.resultsLength = data.count;

          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe((data) => (this.multicasts = data));
  }

  getMulticasts(
    orderByColumn: string,
    orderByDirection: string
  ): Observable<MulticastData> {
    if (this.applicationId) {
      return this.multicastService.getMulticastsByApplicationId(
        this.paginator.pageSize,
        this.paginator.pageIndex * this.paginator.pageSize,
        orderByDirection,
        orderByColumn,
        this.applicationId
      );
    }
  }

  deleteMulticast(multicast: Multicast) {
    this.deleteDialogSubscription = this.deleteDialogService
      .showSimpleDialog()
      .subscribe((response) => {
        if (response) {
          // if user presses "yes, delete", then delete the multicast.
          this.multicastService.delete(multicast.id).subscribe((response) => {
            if (response.ok && response.body.affected > 0) {
              // if deleted succesfully, get the new array of multicasts and show a succesful snack.
              this.paginator.page.emit({
                pageIndex: this.paginator.pageIndex,
                pageSize: this.paginator.pageSize,
                length: this.resultsLength,
              });
              this.snackService.showDeletedSnack();
            } else {
              this.snackService.showFailSnack();
            }
          });
        }
      });
  }
  ngOnDestroy() {
    this.multicastSubscription?.unsubscribe();
    this.deleteDialogSubscription?.unsubscribe();
  }
}
