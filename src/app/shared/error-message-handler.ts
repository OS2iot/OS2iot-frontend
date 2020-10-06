import { HttpErrorResponse } from '@angular/common/http';

export class ErrorMessageHandler {

    public handleError(error: HttpErrorResponse): string[] {
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
}
