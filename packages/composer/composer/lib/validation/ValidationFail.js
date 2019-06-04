import ValidationResult from './ValidationResult';

class ValidationFail extends ValidationResult {
  constructor(message) {
    super(false, message);
  }
}

export default ValidationFail;
