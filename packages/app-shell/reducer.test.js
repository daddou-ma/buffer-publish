import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

import reducer, { initialState } from './reducer';

describe('reducer', () => {
  it('should return initial state', () => {
    const action = { type: 'INIT' };
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  it('should set isImpersonation to true during an impersonation session', () => {
    const action = {
      type: `globalAccount_${dataFetchActionTypes.FETCH_SUCCESS}`,
      result: { id: '0123456789', email: 'foo@wow.com', isImpersonation: true },
    };
    expect(reducer(undefined, action).isImpersonation).toBe(true);
  });
});
