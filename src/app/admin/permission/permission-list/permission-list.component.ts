import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Sort } from '@app/models/sort';
import { TranslateService } from '@ngx-translate/core';
import { PermissionResponse } from '../permission.model';
import { Subscribable, Subscription } from 'rxjs';
import { PermissionService } from '../../../shared/services/permission.service';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss'],
})
export class PermissionListComponent implements OnInit, OnChanges {
  public pageLimit = 10;
  public sort: Sort[] = [
    {
      id: 1,
      dir: 'ASC',
      col: 'updatedAt',
      label: 'SORT.UPDATED-ASCENDING',
    },
    {
      id: 2,
      dir: 'DESC',
      col: 'updatedAt',
      label: 'SORT.UPDATED-DESCENDING',
    },
    {
      id: 3,
      dir: 'ASC',
      col: 'createdAt',
      label: 'SORT.CREATED-ASCENDING',
    },
    {
      id: 4,
      dir: 'DESC',
      col: 'createdAt',
      label: 'SORT.CREATED-DESCENDING',
    },
    {
      id: 5,
      dir: 'ASC',
      col: 'name',
      label: 'SORT.NAME-ASCENDING',
    },
    {
      id: 6,
      dir: 'DESC',
      col: 'name',
      label: 'SORT.NAME-DESCENDING',
    },
  ];
  public selectedSortId = 1;
  public selectedSortObject: Sort = {
    id: 6,
    dir: 'DESC',
    col: 'name',
    label: 'SORT.NAME-DESCENDING',
  };

  public permissions: PermissionResponse[];
  permissionSubscription: Subscription;

  constructor(
    public translate: TranslateService,
    private permissionService: PermissionService
  ) {
    translate.use('da');
  }
  ngOnChanges(): void {
    this.getPermissions();
  }

  ngOnInit(): void {
    this.getPermissions();
  }

  getPermissions() {
    this.permissionSubscription = this.permissionService
      .getPermissions()
      .subscribe((response) => {
        this.permissions = response.data;
      });
  }

  deletePermission(id: number) {
    console.log("list")
    this.permissionService.deletePermission(id).subscribe((response) => {
      if (response.ok && response.body.affected > 0) {
        this.getPermissions();
      }
    });
  }

  // updatePageLimit(limit: any) {
  //   console.log(limit);
  // }

  // changeSort(sortId: number) {
  //   for (let i = 0; i < this.sort.length; i++) {
  //     const elem = this.sort[i];
  //     if (elem.id === sortId) {
  //       this.selectedSortObject = elem;
  //     }
  //   }
  // }
}
