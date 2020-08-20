import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { QuestionControlService } from '../../_services/question-control.service';
import { RestService } from '../../_services/rest.service';

import { Application } from 'src/app/models/application';
import { QuestionBase } from 'src/app/models/question-base';
import { ApplicationService } from '../../_services/application.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-form-body-application',
    templateUrl: './form-body-application.component.html',
    styleUrls: ['./form-body-application.component.scss'],
    providers: [QuestionControlService],
})
export class FormBodyApplicationComponent implements OnInit, OnDestroy {
    @Input() questions: QuestionBase<string>[] = [];
    @Input() submitButton: string;
    public form: FormGroup;
    public payLoad = '';
    public applicationsSubscription: Subscription;
    public errorMessage: string;
    public errorMessages: any;
    public errorFields: string[];
    private id: number;

    constructor(
        private qcs: QuestionControlService,
        private restService: RestService,
        private applicationService: ApplicationService,
        private route: ActivatedRoute,
        public translate: TranslateService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.translate.use('da');
        this.form = this.qcs.toFormGroup(this.questions);
        this.id = +this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.getApplication(this.id);
        }
    }

    getApplication(id: number): void {
        this.applicationsSubscription = this.restService
            .get('application', {}, id)
            .subscribe((application: Application) => {
                this.form.controls['name'].setValue(application.name);
                this.form.controls['description'].setValue(
                    application.description
                );
            });
    }

    onSubmit(): void {
        this.payLoad = JSON.stringify(this.form.getRawValue());

        if (this.id) {
            this.updateApplication(this.id);
        } else {
            this.postApplication();
        }
    }

    updateApplication(id: number): void {
        this.restService
            .replace('application', JSON.stringify(this.form.getRawValue()), id)
            .subscribe((response) => {
                if (response.ok) {
                    this.router.navigateByUrl('/mine-applikationer');
                } else {
                    // TODO: MESSAGE SHOW ERRORS
                }
            });
    }

    postApplication(): void {
        this.applicationService
            .createApplication(JSON.stringify(this.form.getRawValue()))
            .subscribe(
                (response) => {
                    console.log(response);
                    this.router.navigateByUrl('/mine-applikationer');
                },
                (error: HttpErrorResponse) => {
                    console.log('not ok', error.error);
                    this.errorFields = [];
                    this.errorMessages = [];
                    error.error.message.forEach((err) => {
                        this.errorFields.push(err.property);
                        console.log('is array', Object.values(err.constraints));
                        this.errorMessages = this.errorMessages.concat(
                            Object.values(err.constraints)
                        );
                    });

                    console.log('questions', this.questions);
                    this.questions.forEach((question) => {
                        this.errorFields.includes(question.key) ? (question.error = true) : (question.error = false);
                    });
                    console.log('errorFields', this.errorFields);
                }
            );
    }

    routeBack(): void {
        this.router.navigateByUrl('/mine-applikationer');
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        if (this.applicationsSubscription) {
            this.applicationsSubscription.unsubscribe();
        }
    }
}
