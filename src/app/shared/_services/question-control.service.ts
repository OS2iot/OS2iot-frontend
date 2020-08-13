import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase, QuestionBaseMulti } from 'src/app/models/question-base';


@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<string>[] ) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
  toFormGroupMulti(questionGroup: QuestionBaseMulti<any>[] ) {
    let group: any = {};

    questionGroup.forEach(questions => {
      questions.data.forEach(question => {
        group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                                : new FormControl(question.value || '');
      });
    });
    return new FormGroup(group);
  }
}