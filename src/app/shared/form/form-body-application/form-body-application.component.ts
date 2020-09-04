import { Component, OnInit, Input, OnDestroy, ErrorHandler } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { RestService } from '../../services/rest.service';

import { Application } from 'src/app/models/application';
import { ApplicationService } from '../../services/application.service';
import { HttpErrorResponse, HttpDownloadProgressEvent } from '@angular/common/http';

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

    application = new Application();
    model = new User();

    constructor(
        private restService: RestService,
        private applicationService: ApplicationService,
        private route: ActivatedRoute,
        public translate: TranslateService,
        private router: Router
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
                this.application = application;
            });
    }

    onSubmit(): void {
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
                    this.router.navigateByUrl('/my-applications');
                },
                (error: HttpErrorResponse) => {
                    this.handleError(error)
                }
            );
    }

    postApplication(): void {
        this.applicationService
            .createApplication(this.application)
            .subscribe(
                (response) => {
                    console.log(response);
                    this.router.navigateByUrl('/my-applications');
                },
                (error: HttpErrorResponse) => {
                    this.handleError(error)
                }
            );
    }

    private handleError(error: HttpErrorResponse) {
        this.errorFields = [];
        this.errorMessages = [];
        
        // Temp fix till we standardise backend error handling
        if(error.error?.message[0]?.property) {
            this.externalError(error)
        } else {
            this.backendError(error)
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
        this.errorFields.push('name')
    }

    routeBack(): void {
        this.router.navigateByUrl('/my-applications');
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        if (this.applicationsSubscription) {
            this.applicationsSubscription.unsubscribe();
        }
    }
}
