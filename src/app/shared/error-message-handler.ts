import { HttpErrorResponse } from '@angular/common/http';

export class ErrorMessageHandler {

    public handleErrorMessage(error: HttpErrorResponse): string[] {
        let errorMessages = [];
        if (typeof error.error.message === 'string') {
          errorMessages.push(error.error.message);
        } else {
          error.error.message.forEach( (err) => {
            if (err.property === 'lorawanSettings') {
              err.children.forEach( (element) => {
                errorMessages = errorMessages.concat(
                  Object.values(element.constraints)
                );
              });
            } else {
              errorMessages.push(
                Object.values(err.constraints)
              );
            }
          });
        }
        return errorMessages;
  }

  public handleErrorMessageWithFields(error: HttpErrorResponse): ErrorMessage {
    const errors: ErrorMessage = {errorFields: [], errorMessages: []};
    if (typeof error.error.message === 'string') {
      errors.errorMessages.push(error.error.message);
    } else {
        error.error.message.forEach((err) => {
            if (err.property === 'lorawanSettings' || err.property === 'sigfoxSettings') {
                err.children.forEach(element => {
                  errors.errorFields.push(element.property);
                  errors.errorMessages = errors.errorMessages.concat(
                        Object.values(element.constraints)
                    );
                });
            } else if (err.message) {
              errors.errorFields.push(err.field);
              errors.errorMessages.push(err.message);
            } else {
              errors.errorFields.push(err.property);
              errors.errorMessages = errors.errorMessages.concat(
                    Object.values(err.constraints)
                );
            }
        });
    }
    return errors;
  }
}

export class ErrorMessage {
  public errorFields = [];
  public errorMessages = [];
  constructor(errorMessage = [], errorFields = []) {
    this.errorFields = errorFields;
    this.errorMessages = errorMessage;
  }
}
