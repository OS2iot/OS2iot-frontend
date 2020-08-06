import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { Application } from 'src/app/models/application';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../../shared/_services/application.service';
import { TranslateService } from '@ngx-translate/core';
import { IoTDeviceService } from '../../../shared/_services/iot-device.service';

export interface StepType {
    label: string;
    fields: FormlyFieldConfig[];
}

@Component({
    selector: 'app-create-iot-device',
    templateUrl: './create-iot-device.component.html',
    styleUrls: ['./create-iot-device.component.scss'],
})
export class CreateIoTDeviceComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private applicationService: ApplicationService,
        private iotDeviceService: IoTDeviceService,
        private translate: TranslateService
    ) {}

    ngOnInit(): void {
        this.applicationId = +this.route.snapshot.paramMap.get('id');
        if (this.applicationId) {
            this.bindApplication(this.applicationId);
        }
        // Delay evaluation of further initialization until translations are loaded.
        if (this.translate.store.translations[this.translate.currentLang]) {
            this.init();
        } else {
            this.translate.onLangChange.subscribe(() => {
                this.init();
            });
        }
    }

    init(): void {
        this.changeLang(this.translate.currentLang);
        this.form = new FormArray(this.steps.map(() => new FormGroup({})));
        this.options = this.steps.map(() => <FormlyFormOptions>{});
    }

    bindApplication(applicationId: number) {
        this.applicationService
            .getApplication(applicationId)
            .subscribe((application) => {
                this.application = application;
            });
    }

    private applicationId: number;

    public application: Application;

    activedStep = 0;
    steps: StepType[];
    form: FormArray;
    options: FormlyFormOptions[];

    changeLang(lang): void {
        this.translate.use(lang).subscribe(() => {
            this.steps = [
                {
                    label: 'IOTDEVICE.HEADING.PROTOCOL',
                    fields: [
                        {
                            key: 'type',
                            type: 'radio',
                            templateOptions: {
                                label: this.translate.instant(
                                    'FORM.TRANSMISSION_PROTOCOL_TEXT'
                                ),
                                description: this.translate.instant(
                                    'FORM.TRANSMISSION_PROTOCOL_DESCRIPTION'
                                ),
                                required: true,
                                options: [
                                    { value: 'SIGFOX', label: 'Sigfox' },
                                    { value: 'NBIOT', label: 'NB-IoT' },
                                    { value: 'LORAWAN', label: 'LoRaWAN' },
                                    {
                                        value: 'GENERIC_HTTP',
                                        label: 'Generic HTTP',
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    label: 'IOTDEVICE.HEADING.BASIC',
                    fields: [
                        {
                            key: 'name',
                            type: 'input',
                            templateOptions: {
                                label: this.translate.instant('IOTDEVICE.NAME'),
                                required: true,
                            },
                        },
                    ],
                },
                {
                    label: 'IOTDEVICE.HEADING.OPTIONAL',
                    fields: [
                        {
                            key: 'comment',
                            type: 'input',
                            templateOptions: {
                                label: this.translate.instant(
                                    'IOTDEVICE.COMMENT'
                                ),
                                required: false,
                            },
                        },
                        {
                            key: 'longitude',
                            type: 'input',
                            templateOptions: {
                                label: this.translate.instant(
                                    'IOTDEVICE.LONGITUDE'
                                ),
                                type: 'number',
                                required: false,
                            },
                        },
                        {
                            key: 'latitude',
                            type: 'input',
                            templateOptions: {
                                label: this.translate.instant(
                                    'IOTDEVICE.LATITUDE'
                                ),
                                type: 'number',
                                required: false,
                            },
                        },
                        {
                            key: 'commentOnLocation',
                            type: 'input',
                            templateOptions: {
                                label: this.translate.instant(
                                    'IOTDEVICE.COMMENTONLOCATION'
                                ),
                                required: false,
                            },
                        },
                    ],
                },
            ];
        });
    }

    model = {};

    prevStep(step) {
        this.activedStep = step - 1;
    }

    nextStep(step) {
        this.activedStep = step + 1;
    }

    submit() {
        console.log(JSON.stringify(this.model));
        const createdIOTDevice = this.iotDeviceService.createIoTDevice(
            this.model,
            this.application.id
        );

        createdIOTDevice.subscribe((device) => {
            console.log(JSON.stringify(device));
            if (device.id) {
                this.router.navigate([
                    'mine-applikationer/application',
                    this.application.id,
                ]);
            } else {
                // TODO: Error handling.
            }
        });
    }
}
