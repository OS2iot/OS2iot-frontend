import { Injectable }       from '@angular/core';

import { of } from 'rxjs';

import { QuestionBase } from '../form/question-base';
import { DropdownQuestion } from '../form/question-dropdown';
import { TextareaMediumQuestion, TextboxMediumQuestion } from '../form/question-textbox';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class QuestionService {

  getApplicationQuestions() {
    let questions: QuestionBase<string>[] = [

      // new DropdownQuestion({
      //   key: 'brave',
      //   label: 'Bravery Rating',
      //   options: [
      //     {key: 'solid',  value: 'Solid'},
      //     {key: 'great',  value: 'Great'},
      //     {key: 'good',   value: 'Good'},
      //     {key: 'unproven', value: 'Unproven'}
      //   ],
      //   order: 3
      // }),

      new TextboxMediumQuestion({
        key: 'name',
        label: 'QUESTION.GIVE-APPLICATION-NAME',
        required: true,
        placeholder: 'QUESTION.APPLICATION-NAME-PLACEHOLDER',
        order: 1,
        new: 15
      }),
      
      new TextareaMediumQuestion({
        key: 'description',
        label: 'QUESTION.GIVE-APPLICATION-DESCRIPTION',
        required: false,
        type: 'text',
        placeholder: 'QUESTION.APPLICATION-DESCRIPTION-PLACEHOLDER',
        order: 2,
        new: 19
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  getIotDeviceQuestions() {
    let questions: QuestionBase<string>[] = [

      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),

      new TextboxMediumQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),

      new TextboxMediumQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}