import { Injectable }       from '@angular/core';

import { of } from 'rxjs';

import { QuestionBase, QuestionBaseMulti } from '../form/question-base';
import { DropdownQuestion, DropdownQuestionGetOptions } from '../form/question-dropdown';
import { TextareaMediumQuestion, TextboxMediumQuestion, NumberboxSmallQuestion } from '../form/question-textbox';
import { TranslateService } from '@ngx-translate/core';
import { RadioQuestion } from '../form/question-radiobutton';

@Injectable()
export class QuestionService {

  getApplicationQuestions() {
    let questions: QuestionBase<string>[] = [

      new TextboxMediumQuestion({
        key: 'name',
        label: 'QUESTION.GIVE-APPLICATION-NAME',
        required: true,
        placeholder: 'QUESTION.APPLICATION-NAME-PLACEHOLDER',
        order: 1
      }),
      
      new TextareaMediumQuestion({
        key: 'description',
        label: 'QUESTION.GIVE-APPLICATION-DESCRIPTION',
        required: false,
        type: 'text',
        placeholder: 'QUESTION.APPLICATION-DESCRIPTION-PLACEHOLDER',
        order: 2
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  getIotDeviceQuestions() {
    let FORM_STEP_1: QuestionBase<string>[] = [
      new RadioQuestion({
        key: 'type',
        label: '',
        labelShow: false,
        required: true,
        options: [
          {key: 'GENERIC_HTTP',  value: 'Sigfox'},
          {key: 'GENERIC_HTTP',  value: 'NB-IoT'},
          {key: 'GENERIC_HTTP',   value: 'LoRaWAN'},
          {key: 'GENERIC_HTTP', value: '4G'},
          {key: 'GENERIC_HTTP', value: 'WiFi'}
        ],
        order: 1,
        text: 'FORM.TRANSMISSION_PROTOCOL_TEXT'
      }),
    ];

    let FORM_STEP_2: QuestionBase<string>[] = [
      new TextboxMediumQuestion({
        key: 'name',
        label: 'QUESTION.GIVE-DEVICE-NAME',
        required: true,
        placeholder: 'QUESTION.DEVICE-NAME-PLACEHOLDER',
        order: 1
      }),

      new DropdownQuestionGetOptions({
        key: 'application',
        label: 'QUESTION.ADD-APPLICATION',
        required: true,
        options: [],
        order: 2
      }),
    ];

    let FORM_STEP_3: QuestionBase<string>[] = [
      new NumberboxSmallQuestion({
        key: 'longitude',
        label: 'QUESTION.LONGITUDE',
        value: 'longitude',
        required: false,
        order: 1
      }),

      new NumberboxSmallQuestion({
        key: 'latitude',
        label: 'QUESTION.LATITUDE',
        value: 'latitude',
        required: false,
        order: 2
      }),

      new TextboxMediumQuestion({
        key: 'commentOnLocation',
        label: 'QUESTION.LOCATION-DESCRIPTION',
        required: false,
        placeholder: 'QUESTION.LOCATION-DESCRIPTION-PLACEHOLDER',
        order: 3
      }),

      new TextboxMediumQuestion({
        key: 'comment',
        label: 'QUESTION.EXTRA-COMMENT',
        required: false,
        placeholder: 'QUESTION.EXTRA-COMMENT-PLACEHOLDER',
        order: 4
      })
    ];

    const questions = [
      { label: 'QUESTION.TRANSMISSION-PROTOCOL', data: FORM_STEP_1.sort((a, b) => a.order - b.order), buttons: [{type: 'continue', text: 'FORM.CONTINUE'}, {type: 'back', text: 'GEN.CANCEL'}] },
      { label: 'QUESTION.BASIC-INFO', data: FORM_STEP_2.sort((a, b) => a.order - b.order), buttons: [{type: 'continue', text: 'FORM.CONTINUE'}, {type: 'back', text: 'GEN.BACK'}] },
      { label: 'QUESTION.LOCATION', data: FORM_STEP_3.sort((a, b) => a.order - b.order), buttons: [{type: 'continue', text: 'FORM.CONTINUE'}, {type: 'back', text: 'GEN.BACK'}] },
      // { label: 'QUESTION.EXTRA', data: FORM_STEP_4.sort((a, b) => a.order - b.order) },
      { label: 'QUESTION.REVIEW-AND-SUBMIT', data: [], buttons: [{type: 'submit', text: 'FORM.SUBMIT'}, {type: 'back', text: 'GEN.BACK'}] }
    ];

    return of(questions);
  }
}