import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../question-base';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
    @Input() question: QuestionBase<string>;
    @Input() form: FormGroup;

    placeholder: string;

    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
        this.translate.use('da');
      }
      
      get isValid() {
          return this.form.controls[this.question.key].valid;
      }
}
