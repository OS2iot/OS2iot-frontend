import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { QuestionControlService } from '../../_services/question-control.service';
import { RestService } from '../../_services/rest.service';

import { QuestionBase } from '../question-base';
import { Application } from 'src/app/models/application';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationService } from '../../_services/application.service';

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
    private id: number;

    constructor(
        private qcs: QuestionControlService,
        private route: ActivatedRoute,
        public translate: TranslateService,
        private router: Router,
        private applicationService: ApplicationService,
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
        this.applicationService.get(id)
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
            this.postApplication(this.payLoad);
        }
    }

    updateApplication(id: number): void {
        this.applicationService.update(this.payLoad, id)
            .subscribe((response) => {
                if (response.ok) {
                    this.router.navigateByUrl('/mine-applikationer');
                }
            });
    }

    postApplication(payload): void {
        this.applicationService.post(payload)
            .subscribe((response) => {
                console.log(response);
                if (response.ok) {
                    this.router.navigateByUrl('/mine-applikationer');
                }
            });
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
