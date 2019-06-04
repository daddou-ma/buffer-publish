class ValidationResult {
  constructor(isValid, message) {
    this.isValid = isValid;
    this.message = message;
  }

  isInvalid() {
    return !this.isValid;
  }
}

export default ValidationResult;
