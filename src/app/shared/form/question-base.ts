export class QuestionBase<T> {
    value: T;
    key: string;
    label: string;
    labelShow: boolean;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
    placeholder: string;
    options: { key: string; value: string }[];

    constructor(
        options: {
            value?: T;
            key?: string;
            label?: string;
            labelShow?: boolean;
            required?: boolean;
            order?: number;
            controlType?: string;
            type?: string;
            placeholder?: string;
        } = {}
    ) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.labelShow = options.labelShow || true;
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.type = options.type || '';
        this.placeholder = options.placeholder || '';
    }
}

export class QuestionBaseMultiButton {
    type: string;
    text: string;
}


export class QuestionBaseMulti<T> {
    label: string;
    data: QuestionBase<T>[];
    buttons: QuestionBaseMultiButton[];
}
