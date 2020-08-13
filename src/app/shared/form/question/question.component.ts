import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { QuestionBase } from 'src/app/models/question-base';
import { Application } from 'src/app/models/application';
import { Subscription } from 'rxjs';
import { ApplicationService } from '../../_services/application.service';

@Component({
    selector: 'div[app-question]',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
    @Input() question: QuestionBase<string>;
    @Input() form: FormGroup;
    @Input() applicationId?: number;

    public selectedDropdownId: number;
    public applications: Application[];

    private applicationsSubscription: Subscription;

    constructor(
        private applicationService: ApplicationService,
        public translate: TranslateService
    ) {
        translate.use('da');
    }

    ngOnInit() {
        if (this.question.controlType === 'applicationsDropdown' && !this.question.options.length
        ) {
            this.getApplications();
        }
    }

    getApplications(): void {
        this.applicationsSubscription = this.applicationService
            .getApplications(0, 0, 'ASC', 'name')
            .subscribe((applications) => {
                applications.data.forEach((application) => {
                    if (this.applicationId && this.applicationId == application.id) {
                        console.log('must be selected', application.id);
                        this.selectedDropdownId = application.id;
                        this.question.options.push({
                            key: application.id.toString(),
                            value: application.name,
                            selected: true
                        });
                    } else {
                        this.question.options.push({
                            key: application.id.toString(),
                            value: application.name,
                            selected: false
                        });
                    }
                });
            });
    }

    get isValid() {
        return this.form.controls[this.question.key].valid;
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        if (this.applicationsSubscription) {
            this.applicationsSubscription.unsubscribe();
        }
    }
}
