import { Injectable } from '@angular/core';
import { QuestionBase } from 'src/app/models/question-base';
import { TextboxMediumQuestion } from 'src/app/models/question-textbox';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoraGatewayQuestionService {

  constructor() { }

  getQuestions() {
    let questions: QuestionBase<string>[] = [
      new TextboxMediumQuestion( {
        key: 'name',
        label: 'QUESTION.GIVE-LORA-GATEWAY-NAME',
        required: true,
        placeholder: 'QUESTION-LORA-GATEWAY.NAME-PLACEHOLDER',
        order: 1
      })
    ]
    return of(questions.sort((a, b) => a.order - b.order))
  }

}
