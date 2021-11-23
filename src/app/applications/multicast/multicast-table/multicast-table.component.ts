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
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { MulticastType } from '@shared/enums/multicast-type';
import { tableSorter } from '@shared/helpers/table-sorting.helper';
import { MeService } from '@shared/services/me.service';
import { SnackService } from '@shared/services/snack.service';
import { Subscription } from 'rxjs';
import { multicast } from 'rxjs/operators';
import { Multicast, MulticastData } from '../multicast.model';
import { MulticastService } from '../multicast.service';

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
  dataSource = new MatTableDataSource<Multicast>();
  multicasts: Multicast[];
  resultsLength = 0;
  public canEdit = false;
  @Input() isLoadingResults: boolean = true;
  public pageSize = environment.tablePageSize;

  @Input() pageLimit: number;
  public pageOffset = 0;
  public pageTotal: number;
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
    this.getMulticast();
    this.canEdit = this.meService.canWriteInTargetOrganization();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getMulticast(): void {
    const appId: number = this.applicationId;
    if (appId) {
      this.multicastSubscription = this.multicastService
        .getByApplicationId(
          this.pageLimit,
          this.pageOffset * this.pageLimit,
          appId
        )
        .subscribe((multicasts: MulticastData) => {
          console.log(multicasts);
          this.multicasts = multicasts.data;
          this.dataSource = new MatTableDataSource<Multicast>(this.multicasts);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = tableSorter;
          this.isLoadingResults = false;
          if (this.pageLimit) {
            this.pageTotal = Math.ceil(multicasts.count / this.pageLimit);
          }
          if (multicasts.ok === false) {
            this.showLoadFailSnack();
          }
        });
    }
  }

  deleteMulticast(element: any) {
    this.deleteDialogSubscription = this.deleteDialogService
      .showSimpleDialog()
      .subscribe((response) => {
        if (response) {
          this.multicastService.delete(element.id).subscribe((response) => {
            if (response.ok && response.body.affected > 0) {
              this.getMulticast();
              this.showDeletedSnack();
            } else {
              this.showFailSnack();
            }
          });
        } else {
          console.log(response);
        }
      });
  }

  showLoadFailSnack() {
    this.snackService.showLoadFailSnack();
  }
  showFailSnack() {
    this.snackService.showFailSnack();
  }
  showDeletedSnack() {
    this.snackService.showDeletedSnack();
  }
  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    if (this.multicastSubscription) {
      this.multicastSubscription.unsubscribe();
    }
    if (this.deleteDialogSubscription) {
      this.deleteDialogSubscription.unsubscribe();
    }
  }
}
