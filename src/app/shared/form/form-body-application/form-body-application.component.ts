import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { QuestionControlService } from '../../_services/question-control.service';
import { RestService } from '../../_services/rest.service';

import { QuestionBase } from '../question-base';
import { Application } from 'src/app/models/application';
import { TranslateService } from '@ngx-translate/core';
import { HttpResponse } from '@angular/common/http';

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
        private restService: RestService,
        private route: ActivatedRoute,
        public translate: TranslateService,
        private router: Router
    ) {}

    ngOnInit() {
      this.translate.use('da');
        this.id = +this.route.snapshot.paramMap.get('id');
        this.form = this.qcs.toFormGroup(this.questions);
        if (this.id) {
            this.getApplications(this.id);
        }
    }

    getApplications(id: number): void {
        this.applicationsSubscription = this.restService
            .get('application', {}, id)
            .subscribe((application: Application) => {
                this.form.controls['name'].setValue(application.name);
                this.form.controls['description'].setValue(application.description);
            });
    }

    onSubmit() {
        this.payLoad = JSON.stringify(this.form.getRawValue());

        if (this.id) {
            this.updateApplication(this.id);
        } else {
            this.postApplication();
        }
    }

    updateApplication(id: number) {
        this.restService
            .replace('application', JSON.stringify(this.form.getRawValue()), id)
            .subscribe((response) => {
              if (response.ok) {
                this.router.navigateByUrl('/mine-applikationer');
              }
            });
    }

    postApplication() {
        this.restService
            .create('application', JSON.stringify(this.form.getRawValue()))
            .subscribe((response) => {
              console.log(response);
              if (response.ok) {
                this.router.navigateByUrl('/mine-applikationer');
              }
            });
    }

    routeBack() {
      this.router.navigateByUrl('/mine-applikationer');
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        if (this.applicationsSubscription) {
            this.applicationsSubscription.unsubscribe();
        }
    }
}

//TODO: navigate to mine applikatione rafter succesfull create or update