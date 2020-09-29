import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PermissionResponse } from '../../permission.model';


@Component({
  selector: 'app-permission-tabel',
  templateUrl: './permission-tabel.component.html',
  styleUrls: ['./permission-tabel.component.scss'],
})
export class PermissionTabelComponent implements OnInit {
  @Input() permissions: PermissionResponse[];
  @Output() deletePermission = new EventEmitter();

  constructor(public translate: TranslateService) {
    translate.use('da');
  }

  ngOnInit(): void { }

  tableDeletePermission(id: number) {
    console.log("table")
    this.deletePermission.emit(id);
  }
}
