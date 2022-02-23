import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PermissionResponse } from '../permission.model';
import { Subscription } from 'rxjs';
import { PermissionService } from '../permission.service';
import { Sort } from '@shared/models/sort.model';
import { environment } from '@environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss'],
})
export class PermissionListComponent implements OnInit, OnChanges {
  isLoadingResults = true;
  public pageLimit = environment.tablePageSize;
  public selectedSortId = 1;

  public permissions: PermissionResponse[];
  permissionSubscription: Subscription;

  constructor(
    public translate: TranslateService,
    private titleService: Title,
    private permissionService: PermissionService
  ) {
    translate.use('da');
  }
  ngOnChanges(): void {
    this.getPermissions();
  }

  ngOnInit(): void {
    this.getPermissions();
    this.translate.get(['TITLE.PERMISSION'])
      .subscribe(translations => {
        this.titleService.setTitle(translations['TITLE.PERMISSION']);
    });
  }

  getPermissions() {
    this.permissionSubscription = this.permissionService
      .getPermissions()
      .subscribe((response) => {
        this.permissions = response.data;
        this.isLoadingResults = false;
      });
  }

  deletePermission(id: number) {
    this.permissionService.deletePermission(id).subscribe((response) => {
      if (response.ok && response.body.affected > 0) {
        this.getPermissions();
      }
    });
  }
}
