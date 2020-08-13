import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { QuestionBase } from 'src/app/models/question-base';
import { RadioImageQuestion } from 'src/app/models/question-radiobutton';
import { TextboxMediumQuestion, NumberboxSmallQuestion } from 'src/app/models/question-textbox';
import { DropdownApplicationsQuestion } from 'src/app/models/question-dropdown';

@Injectable({
  providedIn: 'root'
})
export class IotDeviceQuestionsService {

  getQuestions() {
    let FORM_STEP_1: QuestionBase<string>[] = [
      new RadioImageQuestion({
        key: 'type',
        label: 'FORM.TRANSMISSION_PROTOCOL_TEXT',
        labelShow: false,
        required: true,
        options: [
          {key: 'SIGFOX',  value: 'Sigfox', selected: false, image: 'assets/images/Sigfox_Logo.png'},
          {key: 'NBIOT',  value: 'NB-IoT', selected: false, image: 'assets/images/nbiot.png'},
          {key: 'LORAWAN',   value: 'LoRaWAN', selected: false, image: 'assets/images/lora.png'},
          {key: 'GENERIC_HTTP', value: 'GEN.HTTP', selected: false, image: 'assets/images/iot.png'}
        ],
        order: 1
      }),

    ];

    let FORM_STEP_2: QuestionBase<string>[] = [
      new TextboxMediumQuestion({
        key: 'name',
        label: 'QUESTION.GIVE-DEVICE-NAME',
        required: true,
        placeholder: 'QUESTION.DEVICE-NAME-PLACEHOLDER',
        order: 2
      }),

      new DropdownApplicationsQuestion({
        key: 'applicationId',
        label: 'QUESTION.CHOOSE-APPLICATION',
        required: true,
        options: [],
        order: 2
      }),
    ];

    let FORM_STEP_3: QuestionBase<string>[] = [
      new TextboxMediumQuestion({
        key: 'comment',
        label: 'IOTDEVICE.COMMENT',
        required: false,
        placeholder: 'QUESTION.EXTRA-COMMENT-PLACEHOLDER',
        order: 3
      }),

      new NumberboxSmallQuestion({
        key: 'longitude',
        label: 'IOTDEVICE.LONGITUDE',
        required: false,
        order: 4,
        type: 'number',
        placeholder: '00'
      }),

      new NumberboxSmallQuestion({
        key: 'latitude',
        label: 'IOTDEVICE.LATITUDE',
        required: false,
        order: 5,
        type: 'number',
        placeholder: '00'
      }),

      new TextboxMediumQuestion({
        key: 'commentOnLocation',
        label: 'QUESTION.LOCATION-DESCRIPTION',
        required: false,
        placeholder: 'QUESTION.LOCATION-DESCRIPTION-PLACEHOLDER',
        order: 6
      })
    ];

    const questions = [
      { label: 'IOTDEVICE.HEADING.PROTOCOL', data: FORM_STEP_1.sort((a, b) => a.order - b.order) },
      { label: 'IOTDEVICE.HEADING.BASIC', data: FORM_STEP_2.sort((a, b) => a.order - b.order) },
      { label: 'IOTDEVICE.HEADING.OPTIONAL', data: FORM_STEP_3.sort((a, b) => a.order - b.order) }
    ];

    return of(questions);
  }
}
