import { QuestionBase } from './question-base';

export class RadioQuestion extends QuestionBase<string> {
    controlType = 'radio';
    options: { key: string; value: string }[] = [];
    text: string = '';

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}
