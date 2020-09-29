import { Component, OnInit } from '@angular/core';
import { Application } from '@applications/application.model';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from '@shared/models/back-button.model';


@Component({
    selector: 'app-iot-device-edit',
    templateUrl: './iot-device-edit.component.html',
    styleUrls: ['./iot-device-edit.component.scss'],
})
export class IotDeviceEditComponent implements OnInit {
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
