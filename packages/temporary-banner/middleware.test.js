import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import middleware from './middleware';
import { initialState } from './reducer';

describe('middleware', () => {
  const next = jest.fn();

  it('exports middleware', () => {
    expect(middleware).toBeDefined();
  });

  it('fetches enabledApplicationModes when user request is successful', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({ temporaryBanner: initialState }),
    };

    const action = dataFetchActions.fetchSuccess({
      name: 'user',
    });

    middleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
    expect(store.dispatch).toBeCalledWith(
      dataFetchActions.fetch({
        name: 'enabledApplicationModes',
        args: {
          comprehensive: true,
        },
      })
    );
  });

  it('fetches checkRemindersStatus when profile request is successful and user has IG profiles', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({ temporaryBanner: initialState }),
    };

    const action = dataFetchActions.fetchSuccess({
      name: 'profiles',
      result: [{ type: 'instagram' }, { type: 'twitter' }],
    });

    middleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
    expect(store.dispatch).toBeCalledWith(
      dataFetchActions.fetch({
        name: 'checkRemindersStatus',
      })
    );
  });

  it('does not fetch checkRemindersStatus when profile request is successful but user has no IG profiles', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({ temporaryBanner: initialState }),
    };

    const action = dataFetchActions.fetchSuccess({
      name: 'profiles',
      result: [{ type: 'twitter' }, { type: 'twitter' }],
    });

    middleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
    expect(store.dispatch).not.toBeCalledWith(
      dataFetchActions.fetch({
        name: 'checkRemindersStatus',
      })
    );
  });
});
