class ValidationResults {
  constructor(results) {
    this.results = results;
  }

  getErrorMessages() {
    const messages = [];
    for (let i = 0; i < this.results.length; i += 1) {
      const result = this.results[i];
      if (result.isInvalid()) {
        messages.push(result.message);
      }
    }
    return messages;
  }

  isInvalid() {
    for (let i = 0; i < this.results.length; i += 1) {
      const result = this.results[i];

      if (result.isInvalid()) {
        return true;
      }
    }
    return false;
  }

  isValid() {
    return !this.isInvalid();
  }
}

export default ValidationResults;
