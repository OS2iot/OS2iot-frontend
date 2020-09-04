import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application';
import { BackButton } from 'src/app/models/back-button';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from 'src/app/shared/services/application.service';

@Component({
    selector: 'app-edit-iot-device',
    templateUrl: './edit-iot-device.component.html',
    styleUrls: ['./edit-iot-device.component.scss'],
})
export class EditIotDeviceComponent implements OnInit {
    public backButton: BackButton = {
        label: '',
        routerLink: '',
    };
    public multiPage: boolean = false;
    public title: string = '';
    public sectionTitle: string = '';
    public submitButton: string = '';
    public application: Application;

    constructor(
        public translate: TranslateService,
    ) {
        translate.use('da');
    }

    ngOnInit() {

        this.translate
            .get(['FORM.CREATE-NEW-IOT-DEVICE', 'IOT-DEVICE.CREATE'])
            .subscribe((translations) => {
                this.title = translations['FORM.CREATE-NEW-IOT-DEVICE'];
                this.submitButton = translations['IOT-DEVICE.CREATE'];
            });
    }
}
