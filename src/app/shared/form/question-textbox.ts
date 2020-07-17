import { QuestionBase } from './question-base';

export class TextboxSmallQuestion extends QuestionBase<string> {
  controlType = 'textboxsmall';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

export class TextboxMediumQuestion extends QuestionBase<string> {
  controlType = 'textboxmedium';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

export class TextboxLargeQuestion extends QuestionBase<string> {
  controlType = 'textboxlarge';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

export class TextareaSmallQuestion extends QuestionBase<string> {
  controlType = 'textareaboxsmall';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

export class TextareaMediumQuestion extends QuestionBase<string> {
  controlType = 'textareaboxmedium';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

export class TextareaLargeQuestion extends QuestionBase<string> {
  controlType = 'textareaboxlarge';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

export class NumberboxSmallQuestion extends QuestionBase<string> {
  controlType = 'decimalbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

export class NumberboxLargeQuestion extends QuestionBase<string> {
  controlType = 'coordinatebox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}