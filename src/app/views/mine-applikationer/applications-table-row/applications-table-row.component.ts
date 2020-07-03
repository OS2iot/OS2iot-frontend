import { Component, OnInit, Input } from '@angular/core';
import { Application } from 'src/app/models/application';

@Component({
  selector: 'app-applications-table-row',
  templateUrl: './applications-table-row.component.html',
  styleUrls: ['./applications-table-row.component.scss']
})
export class ApplicationsTableRowComponent implements OnInit {
  @Input() application: Application;

  constructor() { }

  ngOnInit(): void {
  }

}
