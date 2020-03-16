import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import deepFreeze from 'deep-freeze';
import reducer from './reducer';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = {
      loading: true,
      features: [],
      planName: 'free',
      defaultPlan: 'free',
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
      planName: 'pro',
      defaultPlan: 'free',
    };
    const action = {
      type: `features_${dataFetchActionTypes.FETCH_SUCCESS}`,
      result: features,
    };
    const stateAfter = {
      ...features,
      loading: false,
      isBusinessUser: false,
      isFreeUser: false,
      isProUser: true,
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });
});
