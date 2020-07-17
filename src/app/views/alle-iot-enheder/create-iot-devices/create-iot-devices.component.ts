import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from 'src/app/models/back-button';

@Component({
    selector: 'app-create-iot-devices',
    templateUrl: './create-iot-devices.component.html',
    styleUrls: ['./create-iot-devices.component.scss'],
})
export class CreateIotDevicesComponent implements OnInit {
    public backButton: BackButton = {
        label: '',
        routerLink: '/alle-iot-enheder',
    };
    public multiPage: boolean = false;
    public title: string = '';
    public sectionTitle: string = '';
    public submitButton: string = '';

    constructor(public translate: TranslateService) {
        translate.use('da');
    }

    ngOnInit() {
        this.translate
            .get([
                'NAV.ALL-IOT-DEVICES',
                'FORM.CREATE-NEW-IOT-DEVICE',
                'IOT-DEVICE.CREATE',
            ])
            .subscribe((translations) => {
                this.backButton.label = translations['NAV.ALL-IOT-DEVICES'];
                this.title = translations['FORM.CREATE-NEW-IOT-DEVICE'];
                this.submitButton = translations['IOT-DEVICE.CREATE'];
            });
    }
}
