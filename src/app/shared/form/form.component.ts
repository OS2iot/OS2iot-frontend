import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { QuestionService } from '../_services/question.service';

import { QuestionBase, QuestionBaseMulti } from './question-base';

import { BackButton } from 'src/app/models/back-button';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers:  [QuestionService]
})
export class FormComponent implements OnInit {
  @Input() backButton: BackButton;
  @Input() formType: 'application' | 'iotDevice';
  @Input() title: string;
  @Input() submitButton: string;

  applicationQuestions$: Observable<QuestionBase<any>[]>;
  iotDeviceQuestions$: Observable<QuestionBaseMulti<any>[]>;

  constructor(service: QuestionService) { 
    this.applicationQuestions$ = service.getApplicationQuestions();
    this.iotDeviceQuestions$ = service.getIotDeviceQuestions();
  }

  ngOnInit(): void {

  }

}
