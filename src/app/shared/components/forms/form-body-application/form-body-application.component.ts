import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { RestService } from '@shared/services/rest.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationRequest, Application } from '@applications/application.model';
import { ApplicationService } from '@applications/application.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';


export class User {
    public name: string;
    public email: string;
    public password: string;
    public hobbies: string;
}

@Component({
    selector: 'app-form-body-application',
    templateUrl: './form-body-application.component.html',
    styleUrls: ['./form-body-application.component.scss']
})
export class FormBodyApplicationComponent implements OnInit, OnDestroy {
    @Input() submitButton: string;
    public payLoad = '';
    public applicationsSubscription: Subscription;
    public errorMessage: string;
    public errorMessages: any;
    public errorFields: string[];
    public formFailedSubmit: boolean = false;
    private id: number;

    application = new ApplicationRequest();
    model = new User();

    constructor(
        private restService: RestService,
        private applicationService: ApplicationService,
        private route: ActivatedRoute,
        public translate: TranslateService,
        private router: Router,
        private sharedVariableService: SharedVariableService
    ) { }

    ngOnInit(): void {
        this.translate.use('da');
        this.id = +this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.getApplication(this.id);
        }
    }

    getApplication(id: number): void {
        this.applicationsSubscription = this.restService
            .get('application', {}, id)
            .subscribe((application: Application) => {
                this.application = new ApplicationRequest();
                this.application.name = application.name;
                this.application.description = application.description;
                this.application.organizationId = application.belongsTo.id;
            });
    }

    onSubmit(): void {
        this.application.organizationId = this.sharedVariableService.getSelectedOrganisationId();
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
                (response) => {
                    console.log(response);
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
