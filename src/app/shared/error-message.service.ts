import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorMessage } from './models/error-message.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

    public handleErrorMessage(err: HttpErrorResponse): string[] {
        let errorMessages = [];
        if (typeof err.error.message === 'string') {
          errorMessages.push(err.error.message);
        } else if (err.error.chirpstackError) {
          errorMessages.push(err.error.chirpstackError.message);
        } else {
          err.error.message.forEach( (err) => {
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

  public handleErrorMessageWithFields(error: HttpErrorResponse | Pick<HttpErrorResponse, 'error'>): ErrorMessage {
    const errors: ErrorMessage = {errorFields: [], errorMessages: []};
    if (typeof error.error.message === 'string') {
      errors.errorMessages.push(error.error.message);
    } else {
        error.error.message.forEach((err) => {
          if (
            err.property === 'lorawanSettings' ||
            err.property === 'sigfoxSettings' ||
            err.property === 'openDataDkDataset' ||
            err.property === 'deviceProfile' ||
            err.property === 'gateway'
          ) {
            err.children.forEach((element) => {
              if (element.constraints) {
                errors.errorFields.push(err.property === 'openDataDkDataset' ? 'openDataDkDataset.'+element.property: element.property);
                errors.errorMessages = errors.errorMessages.concat(
                  Object.values(element.constraints)
                );
              } else if (element.children) {
                element.children.forEach((child) => {
                  if (child.constraints) {
                    errors.errorFields.push(err.property === 'openDataDkDataset' ? 'openDataDkDataset.'+element.property: element.property);
                    errors.errorMessages = errors.errorMessages.concat(
                      Object.values(child.constraints)
                    );
                  }
                });
              }
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
