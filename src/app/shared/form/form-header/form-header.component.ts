import { Component, OnInit, Input } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { BackButton } from 'src/app/models/back-button';
import { QuestionBaseMulti } from '../question-base';
import { Step } from 'src/app/models/step';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit {
  @Input() questions: QuestionBaseMulti<string>[] = [];
  @Input() backButton: BackButton;
  @Input() formType: 'application' | 'iotDevice';
  @Input() title: string;
  public steps: Step[] = [];
  public stepTitle: string = '';
  public activeStep: string = '';

  constructor(public translate: TranslateService) {
    translate.use('da');
  }

  ngOnInit(): void {
    if (this.formType === 'iotDevice') {
      for (let i = 0; i < this.questions.length; i++) {
        const question = this.questions[i]; 
        this.steps.push({label: question.label, step: 1 + i, id: 'step-' + (1 + i)});
      }
      this.activeStep = this.steps[0].id;
      this.stepTitle = this.steps[0].label;
      console.log('steps', this.steps);
    }
  }

}
