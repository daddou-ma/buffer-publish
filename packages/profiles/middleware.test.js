import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import middleware from './middleware';
import { actionTypes } from './reducer';

describe('middleware', () => {
  const next = jest.fn();

  it('exports middleware', () => {
    expect(middleware).toBeDefined();
  });

  it('fetches singleProfile when FETCH_SINGLE_PROFILE', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({ publishProfiles: [] }),
    };
    const action = {
      type: actionTypes.FETCH_SINGLE_PROFILE,
      profileId: 'id1',
      message: 'Message1',
    };
    middleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
    expect(store.dispatch).toBeCalledWith(
      dataFetchActions.fetch({
        name: 'singleProfile',
        args: {
          profileId: 'id1',
          message: 'Message1',
        },
      })
    );
  });
});
