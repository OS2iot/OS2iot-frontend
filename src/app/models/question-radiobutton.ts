import { QuestionBase } from './question-base';

export class RadioQuestion extends QuestionBase<string> {
    controlType = 'radio';
    options: { key: string; value: string; selected: boolean }[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}

export class RadioImageQuestion extends QuestionBase<string> {
    controlType = 'radioImage';
    options: { key: string; value: string; image: string; selected: boolean }[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}
