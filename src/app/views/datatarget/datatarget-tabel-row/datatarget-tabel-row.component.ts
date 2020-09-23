import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Datatarget } from 'src/app/models/datatarget';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tr[app-datatarget-tabel-row]',
  templateUrl: './datatarget-tabel-row.component.html',
  styleUrls: ['./datatarget-tabel-row.component.scss']
})
export class DatatargetTableRowComponent implements OnInit {

  @Input() datatarget: Datatarget;
  @Output() deleteDatatarget = new EventEmitter();

  private alertMessage: string;

  constructor(
    private translate: TranslateService,
    private router: Router) {
      translate.use('da');
    }

  ngOnInit(): void {
  }

  clickDelete() {
    this.deleteDatatarget.emit(this.datatarget.id);
  }

}
