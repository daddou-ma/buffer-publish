import ValidationResults from '../../../lib/validation/ValidationResults';
import ValidationSuccess from '../../../lib/validation/ValidationSuccess';
import ValidationFail from '../../../lib/validation/ValidationFail';

describe('constructor', () => {
  it('creates the object correctly', () => {
    const validationResults = new ValidationResults([
      new ValidationSuccess(),
      new ValidationFail('error text'),
    ]);

    expect(validationResults).not.toBeNull();
  });
});

describe('isInvalid', () => {
  it('is true if there is a failed result', () => {
    const validationResults = new ValidationResults([
      new ValidationSuccess(),
      new ValidationFail('error text'),
    ]);

    expect(validationResults.isInvalid()).toBeTruthy();
  });

  it('is false if there is not a failed result', () => {
    const validationResults = new ValidationResults([
      new ValidationSuccess(),
      new ValidationSuccess(),
      new ValidationSuccess(),
      new ValidationSuccess(),
    ]);

    expect(validationResults.isInvalid()).toBeFalsy();
  });
});

describe('isValid', () => {
  it('is false if there is a failed result', () => {
    const validationResults = new ValidationResults([
      new ValidationSuccess(),
      new ValidationFail('error text'),
    ]);

    expect(validationResults.isValid()).toBeFalsy();
  });

  it('is true if there is not a failed result', () => {
    const validationResults = new ValidationResults([
      new ValidationSuccess(),
      new ValidationSuccess(),
      new ValidationSuccess(),
      new ValidationSuccess(),
    ]);

    expect(validationResults.isValid()).toBeTruthy();
  });
});

describe('getErrorMessages', () => {
  it('returns all failed results messages', () => {
    const validationResults = new ValidationResults([
      new ValidationSuccess(),
      new ValidationFail('error sample 1'),
      new ValidationFail('error sample 2'),
      new ValidationFail('error sample 3'),
      new ValidationSuccess(),
    ]);

    const expectedResult = [
      'error sample 1',
      'error sample 2',
      'error sample 3',
    ];

    expect(validationResults.getErrorMessages()).toEqual(expectedResult);
  });

  it('returns empty array if all results are valid', () => {
    const validationResults = new ValidationResults([
      new ValidationSuccess(),
      new ValidationSuccess(),
      new ValidationSuccess(),
      new ValidationSuccess(),
    ]);

    expect(validationResults.getErrorMessages()).toEqual([]);
  });
});
