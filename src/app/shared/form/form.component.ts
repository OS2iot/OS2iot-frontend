import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { IotDeviceQuestionsService } from '../_services/iot-device-questions.service';
import { ApplicationQuestionsService } from '../_services/application-questions.service';

import { BackButton } from 'src/app/models/back-button';
import { QuestionBase, QuestionBaseMulti } from 'src/app/models/question-base';
import { Application } from 'src/app/models/application';
import { LoraGatewayQuestionService } from '../_services/lora-gateway-question.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers:  [IotDeviceQuestionsService, ApplicationQuestionsService]
})
export class FormComponent implements OnInit {
  @Input() backButton: BackButton;
  @Input() formType: 'application' | 'iotDevice' | 'loraGateway';
  @Input() title: string;
  @Input() submitButton: string;
  @Input() application: Application;

  applicationQuestions$: Observable<QuestionBase<any>[]>;
  iotDeviceQuestions$: Observable<QuestionBaseMulti<any>[]>;
  loraGatewayQuestions$: Observable<QuestionBase<any>[]>;

  constructor(
    iotService: IotDeviceQuestionsService,
    applicationService: ApplicationQuestionsService,
    loraGatewayService: LoraGatewayQuestionService,
    ) { 
      this.applicationQuestions$ = applicationService.getQuestions();
      this.iotDeviceQuestions$ = iotService.getQuestions();
      this.loraGatewayQuestions$ = loraGatewayService.getQuestions();
  }

  ngOnInit(): void {
  }

}
