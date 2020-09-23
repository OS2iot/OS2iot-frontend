import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackButton } from '@app/models/back-button';
import { QuickActionButton } from '@app/models/quick-action-button';
import { TranslateService } from '@ngx-translate/core';
import { PermissionService } from '@shared/services/permission.service';
import { Subscription } from 'rxjs';
import { PermissionResponse } from '../permission.model';

@Component({
  selector: 'app-permission-detail',
  templateUrl: './permission-detail.component.html',
  styleUrls: ['./permission-detail.component.scss']
})
export class PermissionDetailComponent implements OnInit {
  permission: PermissionResponse;
  permissions: PermissionResponse[];
  public backButton: BackButton = {
    label: '',
    routerLink: '/admin/permissions',
  };
  public buttons: QuickActionButton[] = [
    {
      label: 'PERMISSIONS.DELETE',
      type: 'delete',
    },
    {
      label: 'PERMISSIONS.EDIT',
      type: 'edit',
    },
  ];
  id: number;
  subscription: Subscription;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private permissionService: PermissionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.id = +this.route.snapshot.paramMap.get('permission-id');
    if (this.id > 0) {
      this.getPermission(this.id);
    }
    this.translate.get(['NAV.PERMISSIONS'])
      .subscribe(translations => {
        this.backButton.label = translations['NAV.PERMISSIONS'];
      });
  }

  private getPermission(id: number) {
    this.subscription = this.permissionService
      .getPermission(id)
      .subscribe((response) => {
        this.permission = response;
      });
  }

  onDeletePermission() {
    this.permissionService.deletePermission(this.id).subscribe((response) => {
      if (response.ok && response.body.affected > 0) {
        this.router.navigate(['admin/permissions']);
      }
    });
  }

  onEditPermission() {
    this.router.navigate(['edit-permission'], { relativeTo: this.route });
  }

}
