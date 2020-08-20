import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { IotDeviceQuestionsService } from '../_services/iot-device-questions.service';
import { ApplicationQuestionsService } from '../_services/application-questions.service';

import { BackButton } from 'src/app/models/back-button';
import { QuestionBase, QuestionBaseMulti } from 'src/app/models/question-base';
import { Application } from 'src/app/models/application';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers:  [IotDeviceQuestionsService, ApplicationQuestionsService]
})
export class FormComponent implements OnInit {
  @Input() backButton: BackButton;
  @Input() formType: 'application' | 'iotDevice';
  @Input() title: string;
  @Input() submitButton: string;
  @Input() application: Application;

  applicationQuestions$: Observable<QuestionBase<any>[]>;
  iotDeviceQuestions$: Observable<QuestionBaseMulti<any>[]>;

  constructor(
    iotService: IotDeviceQuestionsService,
    applicationService: ApplicationQuestionsService,
    ) { 
    this.applicationQuestions$ = applicationService.getQuestions();
    this.iotDeviceQuestions$ = iotService.getQuestions();
  }

  ngOnInit(): void {
  }

}
