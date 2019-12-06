import deepFreeze from 'deep-freeze';
import { actionTypes as asyncDataFetchActions } from '@bufferapp/async-data-fetch';
import reducer from './reducer';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = {
      loggedIn: false,
    };
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle LOGIN_SUCCESS action type', () => {
    const stateAfter = {
      loggedIn: true,
    };
    const action = {
      type: `login_${asyncDataFetchActions.FETCH_SUCCESS}`,
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle `logout_FETCH_START` actionType', () => {
    const stateBefore = {
      loggedIn: true,
    };
    const stateAfter = {
      loggedIn: false,
    };
    const action = {
      type: `logout_${asyncDataFetchActions.FETCH_START}`,
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle login_FETCH_FAIL actionType', () => {
    const stateBefore = {
      loggedIn: true,
    };
    const stateAfter = {
      loggedIn: false,
    };
    const action = {
      type: `login_${asyncDataFetchActions.FETCH_FAIL}`,
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
