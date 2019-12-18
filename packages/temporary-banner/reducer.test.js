import deepFreeze from 'deep-freeze';
import reducer, { initialState } from './reducer';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = initialState;
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('stores enabledApplicationModes data when enabledApplicationModes rpc request is successful', () => {
    const stateAfter = {
      ...initialState,
      enabledApplicationModes: [
        {
          state: 'enabled',
          tag: 'ios-in-app-subscriptions-enabled',
        },
      ],
    };
    const action = {
      type: 'enabledApplicationModes_FETCH_SUCCESS',
      result: {
        enabledApplicationModes: [
          { state: 'enabled', tag: 'ios-in-app-subscriptions-enabled' },
        ],
      },
    };
    deepFreeze(action);
    expect(reducer(initialState, action)).toEqual(stateAfter);
  });
});
