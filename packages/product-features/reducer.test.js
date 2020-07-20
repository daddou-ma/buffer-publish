import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import deepFreeze from 'deep-freeze';
import reducer from './reducer';

describe('reducer', () => {
  it('initializes default state', () => {
    const stateAfter = {
      loading: true,
      planName: 'free',
    };
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });
  it('saves user plan into state', () => {
    const stateBefore = {
      loading: true,
    };
    const userData = {
      isFreeUser: false,
      isProUser: true,
      isBusinessUser: false,
      planBase: 'pro',
    };
    const action = {
      type: `user_${dataFetchActionTypes.FETCH_SUCCESS}`,
      result: userData,
    };
    const stateAfter = {
      isFreeUser: false,
      isProUser: true,
      isBusinessUser: false,
      planName: 'pro',
      loading: false,
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
