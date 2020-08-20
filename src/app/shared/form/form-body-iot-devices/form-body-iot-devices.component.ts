import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { QuestionControlService } from '../../_services/question-control.service';

import { Application } from 'src/app/models/application';
import { IotDevice } from 'src/app/models/iot-device';
import { QuestionBaseMulti } from 'src/app/models/question-base';
import { Subscription } from 'rxjs';
import { IoTDeviceService } from '../../_services/iot-device.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-form-body-iot-devices',
    templateUrl: './form-body-iot-devices.component.html',
    styleUrls: ['./form-body-iot-devices.component.scss'],
    providers: [QuestionControlService],
})
export class FormBodyIotDevicesComponent implements OnInit {
    @Input() questions: QuestionBaseMulti<any>[] = [];
    @Input() submitButton: string;
    @Input() application: Application;
    public form: FormGroup;
    public payLoad = '';
    public deviceSubscription: Subscription;
    public id: number;
    public errorMessages: any;
    public errorFields: string[];

    constructor(
        private qcs: QuestionControlService,
        private route: ActivatedRoute,
        public translate: TranslateService,
        private router: Router,
        private iotDeviceService: IoTDeviceService
    ) {}

    ngOnInit(): void {
        this.translate.use('da');
        this.form = this.qcs.toFormGroupMulti(this.questions);
        this.id = +this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.getDevice(this.id);
        }
    }

    getDevice(id: number): void {
        this.deviceSubscription = this.iotDeviceService
            .getIoTDevice(id)
            .subscribe((device: IotDevice) => {
                // TODO: fill out fields
            });
    }

    onSubmit(): void {
        const createdIOTDevice = this.iotDeviceService.createIoTDevice(
            this.form.getRawValue(),
            this.application.id
        );
        createdIOTDevice.subscribe(
            () => {
                this.router.navigate([
                    'mine-applikationer/application',
                    this.application.id,
                ]);
            },
            (error: HttpErrorResponse) => {
                this.errorFields = [];
                this.errorMessages = [];
                error.error.message.forEach((err) => {
                    this.errorFields.push(err.property);
                    this.errorMessages = this.errorMessages.concat(
                        Object.values(err.constraints)
                    );
                });

                this.questions.forEach((questionField) => {
                    questionField.data.forEach((question) => {
                        this.errorFields.includes(question.key) ? (question.error = true) : (question.error = false);
                    });
                });
            }
        );
    }

    routeBack(): void {
        this.router.navigateByUrl('/mine-applikationer');
    }
}
