import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionResponse } from '@app/admin/permission/permission.model';

@Component({
  selector: 'tr[app-permission-row]',
  templateUrl: './permission-row.component.html',
  styleUrls: ['./permission-row.component.scss'],
})
export class PermissionRowComponent implements OnInit {
  @Input() permission: PermissionResponse;
  @Output() innerDeletePermission = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  clickDelete() {
    this.innerDeletePermission.emit(this.permission.id);
  }

  routeToPermissions() {
    this.router.navigate(['admin/permissions', this.permission.id]);
  }
}
