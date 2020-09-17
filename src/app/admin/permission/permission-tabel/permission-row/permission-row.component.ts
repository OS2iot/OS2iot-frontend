import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PermissionResponse } from '../../permission.model';

@Component({
  selector: 'tr[app-permission-row]',
  templateUrl: './permission-row.component.html',
  styleUrls: ['./permission-row.component.scss'],
})
export class PermissionRowComponent implements OnInit {
  @Input() permission: PermissionResponse;
  @Output() innerDeletePermission = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  clickDelete() {
    console.log("row")
    this.innerDeletePermission.emit(this.permission.id);
  }
}
