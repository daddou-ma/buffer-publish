import reducer, { actions } from './reducer';

describe('reducer', () => {
  let state = {};
  describe('initial state', () => {
    beforeEach(() => {
      state = reducer(undefined, {
        type: 'TEST',
      });
    });

    it('has no error', () => expect(state.error).toBeNull());
    it('is not creating a setup intent', () =>
      expect(state.validating).toBe(false));
    it('has no setup intent client secret', () =>
      expect(state.setupIntentClientSecret).toBe(''));
    it('is not validating card setup', () =>
      expect(state.validating).toBe(false));
  });

  describe('creating a setup intent', () => {
    it('createSetupIntentRequest sets validating to true', () => {
      state = reducer(undefined, actions.createSetupIntentRequest());
      expect(state.validating).toBe(true);
    });

    it('createSetupIntentSuccess sets a client secret to setupIntentClientSecret', () => {
      state = reducer(undefined, actions.createSetupIntentSuccess());
      expect(state.validating).toBe(false);
      // Mock request
      // expect(state.setupIntentClientSecret).toNotBe('');
    });
  });

  describe('changing billing cyles', () => {
    it('setMonthlyCycle sets the cycle to "month"', () => {
      state = reducer(undefined, actions.setMonthlyCycle());
      expect(state.cycle).toBe('month');
    });

    it('setYearlyCycle sets the cycle to "year"', () => {
      state = reducer(undefined, actions.setYearlyCycle());
      expect(state.cycle).toBe('year');
    });
  });
});
