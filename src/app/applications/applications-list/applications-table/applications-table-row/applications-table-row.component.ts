import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Application } from '@applications/application.model';

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

    private alertMessage: string;

    constructor(
        public translate: TranslateService,
        private router: Router
    ) {
        translate.use('da');
    }

    ngOnInit(): void { }

    clickDelete() {
        if (!this.application.iotDevices.length) {
            this.deleteApplication.emit(this.application.id);
        } else {
            this.translate
                .get([
                    'FORM.ALERT-NO-DELETE-DEVICES',
                ])
                .subscribe((translations) => {
                    this.alertMessage = translations['FORM.ALERT-NO-DELETE-DEVICES'];
                    alert(this.alertMessage);
                });
        }
    }

    navigateToEditPage() {
        this.router.navigate(['edit-application', this.application.id]);
    }
}
