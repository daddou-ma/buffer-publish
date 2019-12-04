import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import middleware from './middleware';
import { actionTypes } from './reducer';

describe('middleware', () => {
  const dispatch = jest.fn();
  const next = jest.fn();
  window.location = jest.fn();

  it('exports middleware', () => {
    expect(middleware).toBeDefined();
  });

  it('fetches readMessage when CONNECT_SOCIAL_ACCOUNT_ONBOARDING', () => {
    const action = {
      type: actionTypes.CONNECT_SOCIAL_ACCOUNT_ONBOARDING,
    };
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      dataFetchActions.fetch({
        name: 'readMessage',
        args: {
          message: 'user_saw_onboarding_page',
        },
      })
    );
  });

  it('fetches readMessage when SKIP_STEP_ONBOARDING', () => {
    const action = {
      type: actionTypes.SKIP_STEP,
    };
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      dataFetchActions.fetch({
        name: 'readMessage',
        args: {
          message: 'user_saw_onboarding_page',
        },
      })
    );
  });
});
