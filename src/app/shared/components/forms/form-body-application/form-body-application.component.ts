import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { RestService } from '@shared/services/rest.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationRequest, Application } from '@applications/application.model';
import { ApplicationService } from '@applications/application.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { ApplicationStatus, ApplicationStatusEntries } from '@applications/enums/status.enum';
import { FormControl } from '@angular/forms';
import { ControlledPropertyTypes } from '@app/device-model/Enums/controlled-propperty.enum';
import { ApplicationDeviceTypes, ApplicationDeviceTypeEntries } from '@shared/enums/device-type';
import { isPhoneNumberValid } from '@shared/validators/phone-number.validator';


export class User {
    public name: string;
    public email: string;
    public password: string;
    public hobbies: string;
}

interface DropdownOption {
  label: string;
  value: string | number;
}

@Component({
    selector: 'app-form-body-application',
    templateUrl: './form-body-application.component.html',
    styleUrls: ['./form-body-application.component.scss'],
})
export class FormBodyApplicationComponent implements OnInit, OnDestroy {
    @Input() submitButton: string;
    public payLoad = '';
    public applicationsSubscription: Subscription;
    public errorMessage: string;
    public errorMessages: string[];
    public errorFields: string[];
    public formFailedSubmit = false;
    private id: number;

    application = new ApplicationRequest();
    model = new User();
    statuses: DropdownOption[] = [];
    serializedStartDate = new FormControl();
    serializedEndDate = new FormControl();
    phoneCtrl: FormControl;
    controlledProperties = Object.values(ControlledPropertyTypes);
    deviceTypes: DropdownOption[] = [];
    today = new Date();

    constructor(
        private restService: RestService,
        private applicationService: ApplicationService,
        private route: ActivatedRoute,
        public translate: TranslateService,
        private router: Router,
        private sharedVariableService: SharedVariableService
    ) {
      this.fillDefaultMetadata();
      this.phoneCtrl = new FormControl(this.application.contactPhone, [isPhoneNumberValid()]);
     }

    ngOnInit(): void {
        this.translate.use('da');
        this.id = +this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.getApplication(this.id);
        }

        const statusTranslationPrefix = 'APPLICATION.STATUS.';
        const statusTranslationKeys = ApplicationStatusEntries.map((x) => `${statusTranslationPrefix}${x.key}`);
        const deviceTypeTranslationPrefix = 'IOT-DEVICE-TYPES.';
        const deviceTypeTranslationKeys = ApplicationDeviceTypeEntries.map((x) => `${deviceTypeTranslationPrefix}${x.key}`);
        this.translate
          .get([...statusTranslationKeys, ...deviceTypeTranslationKeys, deviceTypeTranslationPrefix + 'OTHER'])
          .subscribe((translations) => {
            // Populate the dropdown options with a translated label and the enum value
            const statusOptions: DropdownOption[] = ApplicationStatusEntries.map(
              (entry) => ({
                label: translations[statusTranslationPrefix + entry.key],
                value: ApplicationStatus[entry.key],
              })
            );
            this.statuses.push(...statusOptions);

            const deviceTypeOptions: DropdownOption[] = ApplicationDeviceTypeEntries.map(
              (entry) => ({
                label: translations[deviceTypeTranslationPrefix + entry.key],
                value: ApplicationDeviceTypes[entry.key],
              })
            );
            this.deviceTypes.push(...deviceTypeOptions);
          });
    }

    fillDefaultMetadata() {
      this.application.status = this.application.status ?? ApplicationStatus['NONE'];
    }

    getApplication(id: number): void {
        this.applicationsSubscription = this.restService
            .get('application', {}, id)
            .subscribe((application: Application) => {
                this.application = new ApplicationRequest();
                this.application.name = application.name;
                this.application.description = application.description;
                this.application.organizationId = application.belongsTo.id;
                this.application.status = application.status;
                this.application.startDate = application.startDate;
                this.application.endDate = application.endDate;

                if (this.application.startDate) {
                  this.serializedStartDate.setValue(
                    new Date(this.application.startDate)
                  );
                }
                if (this.application.endDate) {
                  this.serializedEndDate.setValue(
                    new Date(this.application.endDate)
                  );
                }
                this.application.category = application.category;
                this.application.owner = application.owner;
                this.application.contactPerson = application.contactPerson;
                this.application.contactEmail = application.contactEmail;
                this.application.contactPhone = application.contactPhone;
                this.phoneCtrl.setValue(application.contactPhone);
                this.application.personalData = application.personalData;
                this.application.hardware = application.hardware;
                this.application.controlledProperties = application.controlledProperties.map(
                  (ctrlProperty) => ctrlProperty.type
                );
                this.application.deviceTypes = application.deviceTypes.map(
                  (deviceType) => deviceType.type
                );

                this.fillDefaultMetadata();
            });
    }

    onSubmit(): void {
        this.application.organizationId = this.sharedVariableService.getSelectedOrganisationId();
        this.application.startDate = this.serializedStartDate.value?.toISOString();
        this.application.endDate = this.serializedEndDate.value?.toISOString();
        this.application.contactPhone = this.phoneCtrl.value ? this.phoneCtrl.value : null;

        if (this.id) {
            this.updateApplication(this.id);
        } else {
            this.postApplication();
        }
    }

    updateApplication(id: number): void {
        this.applicationService
            .updateApplication(this.application, id)
            .subscribe(
                (response) => {
                    console.log(response);
                    this.router.navigateByUrl('/applications');
                },
                (error: HttpErrorResponse) => {
                    this.handleError(error);
                }
            );
    }

    postApplication(): void {
        this.applicationService
            .createApplication(this.application)
            .subscribe(
                () => {
                    this.router.navigateByUrl('/applications');
                },
                (error: HttpErrorResponse) => {
                    this.handleError(error);
                }
            );
    }

    private handleError(error: HttpErrorResponse) {
        this.errorFields = [];
        this.errorMessages = [];

        // Temp fix till we standardise backend error handling
        if (error.error?.message[0]?.property) {
            this.externalError(error);
        } else {
            this.backendError(error);
        }

        this.formFailedSubmit = true;
    }

    externalError(error: HttpErrorResponse) {
        error.error.message.forEach((err) => {
            this.errorFields.push(err.property);
            this.errorMessages = this.errorMessages.concat(
                Object.values(err.constraints)
            );
        });
        this.formFailedSubmit = true;
    }

    backendError(error: HttpErrorResponse) {
        this.translate.get([error.error.message])
            .subscribe(translations => {
                this.errorMessages.push(translations[error.error.message]);
            });
        this.errorFields.push('name');
    }

    routeBack(): void {
        this.router.navigateByUrl('/applications');
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        if (this.applicationsSubscription) {
            this.applicationsSubscription.unsubscribe();
        }
    }
}
