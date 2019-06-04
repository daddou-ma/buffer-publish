import ValidationResult from './ValidationResult';

class ValidationSuccess extends ValidationResult {
  constructor() {
    super(true);
  }
}

export default ValidationSuccess;
