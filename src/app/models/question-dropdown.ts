import { QuestionBase } from './question-base';

export class DropdownQuestion extends QuestionBase<string> {
    controlType = 'dropdown';
    options: { key: string; value: string; selected: boolean }[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}

export class DropdownApplicationsQuestion extends QuestionBase<string> {
    controlType = 'applicationsDropdown';
    options: { key: string; value: string; selected: boolean }[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}
