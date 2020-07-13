import deepFreeze from 'deep-freeze';
import reducer, { actions, initialState, actionTypes } from './reducer';

describe('reducer', () => {
  // Tests the default case in the reducer switch statement
  it('should initialize default state', () => {
    const action = {
      type: '',
    };
    // Protects state and actions from mutation
    deepFreeze(initialState);
    deepFreeze(action);

    // When state is undefined, it's supposed to return initial state
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  // Test action creators:
  describe('action creators', () => {
    it('creates a START_SUBSCRIPTION action', () => {
      const expectedAction = {
        type: actionTypes.START_SUBSCRIPTION,
      };
      expect(actions.handleStartSubscription()).toEqual(expectedAction);
    });
  });
});
