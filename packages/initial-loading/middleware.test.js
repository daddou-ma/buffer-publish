import {
  actions as asyncDataFetchActions,
  actionTypes as asyncDataFetchActionTypes,
} from '@bufferapp/async-data-fetch';

import middleware from './middleware';

describe('middleware', () => {
  const next = jest.fn();
  it('if user has publishBeta feature it should dispatch savePublishBetaRedirect', () => {
    const dispatch = jest.fn();
    const initialLoading = {
      hasPublishBeta: true,
      hasPublishBetaRedirect: false,
      hasNewPublish: false,
    };
    const store = {
      dispatch,
      getState: () => ({
        initialLoading,
      }),
    };
    const action = {
      type: `user_${asyncDataFetchActionTypes.FETCH_SUCCESS}`,
    };
    middleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
    expect(store.dispatch).toBeCalledWith(
      asyncDataFetchActions.fetch({
        name: 'savePublishBetaRedirect',
      })
    );
  });

  it("if user doesn't have `hasNewPublish` they should be redirected to classic Buffer", () => {
    const dispatch = jest.fn();
    window.location.replace = jest.fn();
    const initialLoading = {
      hasPublishBeta: false,
      hasPublishBetaRedirect: false,
      hasNewPublish: false,
    };
    const store = {
      dispatch,
      getState: () => ({
        initialLoading,
      }),
    };
    const action = {
      type: `user_${asyncDataFetchActionTypes.FETCH_SUCCESS}`,
    };
    middleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
    expect(window.location.replace).toHaveBeenCalledWith(
      'https://local.buffer.com/app'
    );
  });
});
