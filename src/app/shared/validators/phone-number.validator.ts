import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

const phoneNumberRegex = /[-+0-9]{6,}/;

export const isPhoneNumberValid = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = phoneNumberRegex.test(control.value);
    return !isValid ? { invalidPhoneNumber: { value: control.value } } : null;
  };
};
