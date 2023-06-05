import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorMessage } from './models/error-message.model';
import { nameof } from '@shared/helpers/type.helper';
import { IotDevice } from '@applications/iot-devices/iot-device.model';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  public handleErrorMessage(err: HttpErrorResponse): string[] {
    let errorMessages = [];
    if (typeof err.error.message === 'string') {
      errorMessages.push(err.error.message);
    } else if (err.error.chirpstackError) {
      errorMessages.push(err.error.chirpstackError.message);
    } else {
      err.error.message.forEach((err) => {
        if (err.property === 'lorawanSettings') {
          err.children.forEach((element) => {
            errorMessages = errorMessages.concat(
              Object.values(element.constraints)
            );
          });
        } else {
          errorMessages.push(Object.values(err.constraints));
        }
      });
    }
    return errorMessages;
  }

  public handleErrorMessageWithFields(
    error: HttpErrorResponse | Pick<HttpErrorResponse, 'error'>
  ): ErrorMessage {
    const errors: ErrorMessage = { errorFields: [], errorMessages: [] };
    if (typeof error.error === 'string') {
      errors.errorMessages.push(error.error);
    } else if (
      typeof error.error?.error === 'string' &&
      !Array.isArray(error.error?.message)
    ) {
      errors.errorMessages.push(error.error.error);
    } else if (typeof error.error?.message === 'string') {
      errors.errorMessages.push(error.error.message);
    } else {
      error.error.message.forEach((err) => {
        if (err.children.length > 0) {
          this.handleNestedErrorFields(err.children, errors);
        } else if (err.message) {
          errors.errorFields.push(err.field);
          errors.errorMessages.push(err.message);
        } else if (err.constraints) {
          errors.errorFields.push(err.property);
          errors.errorMessages = errors.errorMessages.concat(
            Object.values(err.constraints)
          );
        }
      });
    }
    return errors;
  }

  private handleNestedErrorFields(errorChildren: any, errors: ErrorMessage) {
    errorChildren.forEach((error) => {
      if (error.constraints) {
        errors.errorFields.push(
          error.property === 'openDataDkDataset'
            ? 'openDataDkDataset.' + error.property
            : error.property
        );
        errors.errorMessages = errors.errorMessages.concat(
          Object.values(error.constraints)
        );
      } else if (error.children) {
        this.handleNestedErrorFields(error.children, errors);
      }
    });
  }
}
