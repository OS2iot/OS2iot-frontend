import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from 'src/app/models/back-button';
import { ApplicationService } from 'src/app/shared/_services/application.service';
import { Application } from 'src/app/models/application';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-create-iot-devices',
    templateUrl: './create-iot-devices.component.html',
    styleUrls: ['./create-iot-devices.component.scss'],
})
export class CreateIotDevicesComponent implements OnInit {
    public backButton: BackButton = {
        label: '',
        routerLink: '',
    };
    public multiPage: boolean = false;
    public title: string = '';
    public sectionTitle: string = '';
    public submitButton: string = '';
    public application: Application;
    private applicationId: number;

    constructor(
        public translate: TranslateService,
        private route: ActivatedRoute,
        private applicationService: ApplicationService
        ) {
        translate.use('da');
    }

    ngOnInit() {
        this.applicationId = +this.route.snapshot.paramMap.get('id');
        if (this.applicationId) {
            this.bindApplication(this.applicationId);
        }

        this.translate
            .get([
                'FORM.CREATE-NEW-IOT-DEVICE',
                'IOT-DEVICE.CREATE',
            ])
            .subscribe((translations) => {
                this.title = translations['FORM.CREATE-NEW-IOT-DEVICE'];
                this.submitButton = translations['IOT-DEVICE.CREATE'];
            });
    }

    bindApplication(applicationId: number) {
        this.applicationService
            .getApplication(applicationId)
            .subscribe((application) => {
                this.application = application;
                this.backButton.label = application.name;
                this.backButton.routerLink = ['/mine-applikationer/application', application.id.toString()];
            });
    }
}
