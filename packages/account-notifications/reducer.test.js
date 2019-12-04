import deepFreeze from 'deep-freeze';
import reducer, { actions, initialState, actionTypes } from './reducer';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = initialState;
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle user_FETCH_SUCCESS action type', () => {
    const stateAfter = {
      ...initialState,
      bufferTips: true,
    };
    const action = {
      type: 'user_FETCH_SUCCESS',
      result: {
        hasEmailNotifications: { bufferTips: true },
      },
      args: {},
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  describe('actions', () => {
    it('handleToggleClick triggers a TOGGLE_NOTIFICATIONS action', () => {
      const notifications = { bufferTips: true };
      expect(actions.handleToggleClick(notifications)).toEqual({
        type: actionTypes.TOGGLE_NOTIFICATIONS,
        notifications,
      });
    });
  });
});
