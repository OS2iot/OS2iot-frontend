import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Application } from 'src/app/models/application';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
    selector: 'tr[app-applications-table-row]',
    templateUrl: './applications-table-row.component.html',
    styleUrls: ['./applications-table-row.component.scss'],
})
export class ApplicationsTableRowComponent implements OnInit {
    @Input() application: Application;

    @Output() deleteApplication = new EventEmitter();

    constructor(
      public translate: TranslateService,
      private router: Router
      ) {
        translate.use('da');
    }

    ngOnInit(): void {}

    clickDelete() {
        this.deleteApplication.emit(this.application.id);
    }

    navigateToEditPage() {
        this.router.navigate(['edit-application', this.application.id]);
    }
}
