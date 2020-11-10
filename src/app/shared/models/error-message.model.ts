export class ErrorMessage {
    public errorFields = [];
    public errorMessages = [];
    constructor(errorMessage = [], errorFields = []) {
      this.errorFields = errorFields;
      this.errorMessages = errorMessage;
    }
}