import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import deepFreeze from 'deep-freeze';
import reducer from './reducer';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = {
      loading: true,
      features: [],
      planName: 'free',
    };
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });
  it('should save feature into state', () => {
    const features = {
      features: {
        show_stuff: true,
        not_here: false,
      },
    };
    const action = {
      type: `features_${dataFetchActionTypes.FETCH_SUCCESS}`,
      result: features,
    };
    const stateAfter = {
      ...features,
      loading: false,
      planName: 'free',
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });
  it('saves user plan into state', () => {
    const stateBefore = {
      features: ['feature1'],
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
      features: ['feature1'],
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
