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
});
