import { Injectable } from '@angular/core';

import { of } from 'rxjs';

import { QuestionBase } from 'src/app/models/question-base';
import { TextboxMediumQuestion, TextareaMediumQuestion } from 'src/app/models/question-textbox';

@Injectable({
  providedIn: 'root'
})
export class ApplicationQuestionsService {

  getQuestions() {
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
}
