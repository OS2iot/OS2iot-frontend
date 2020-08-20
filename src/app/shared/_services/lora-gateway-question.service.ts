import { Injectable } from '@angular/core';
import { QuestionBase } from 'src/app/models/question-base';
import { TextboxMediumQuestion, TextboxSmallQuestion, TextareaLargeQuestion, TextareaMediumQuestion, NumberboxSmallQuestion } from 'src/app/models/question-textbox';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoraGatewayQuestionService {

  constructor() { }

  getQuestions() {
    let questions: QuestionBase<string>[] = [
      new TextboxSmallQuestion( {
        key: 'name',
        label: 'QUESTION-LORA-GATEWAY.NAME',
        required: true,
        placeholder: 'QUESTION-LORA-GATEWAY.NAME-PLACEHOLDER',
        order: 1
      }),
      new TextareaMediumQuestion({
        key: 'description',
        label: 'QUESTION-LORA-GATEWAY.DESCRIPTION',
        required: true,
        type: 'test',
        placeholder: 'QUESTION-LORA-GATEWAY.DESCRIPTION-PLACEHOLDER',
        order: 2
      }),
      new TextboxSmallQuestion({
        key: 'id',
        label: 'QUESTION-LORA-GATEWAY.GATEWAYID',
        required: true,
        placeholder: 'QUESTION-LORA-GATEWAY.GATEWAYID-PLACEHOLDER',
        order: 3
      }),

      new NumberboxSmallQuestion({
        key: 'altitude',
        label: 'QUESTION-LORA-GATEWAY.ALTITUDE',
        required: false,
        order: 4,
        type: 'number',
        placeholder: 'QUESTION-LORA-GATEWAY.ALTITUDE-PLACEHOLDER'
      }),

      new NumberboxSmallQuestion({
        key: 'longitude',
        label: 'QUESTION-LORA-GATEWAY.LONGITUDE',
        required: false,
        order: 5,
        type: 'number',
        placeholder: 'QUESTION-LORA-GATEWAY.LONGITUDE-PLACEHOLDER'
      }),

      new NumberboxSmallQuestion({
        key: 'latitude',
        label: 'QUESTION-LORA-GATEWAY.LATITUDE',
        required: false,
        order: 6,
        type: 'number',
        placeholder: 'QUESTION-LORA-GATEWAY.LATITUDE-PLACEHOLDER'
      }),

      new TextareaLargeQuestion({
        key: 'metadata',
        label: 'QUESTION-LORA-GATEWAY.METADATA',
        required: false,
        type: 'text',
        placeholder: 'QUESTION-LORA-GATEWAY.METADATA-PLACEHOLDER',
        order: 7
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

}
