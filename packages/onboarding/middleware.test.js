import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import middleware from './middleware';
import { actionTypes } from './reducer';

describe('middleware', () => {
  const dispatch = jest.fn();
  const next = jest.fn();

  test('should export middleware', () => {
    expect(middleware)
      .toBeDefined();
  });

  test('should fetch readMessage when CONNECT_SOCIAL_ACCOUNT', () => {
    const action = {
      type: actionTypes.CONNECT_SOCIAL_ACCOUNT,
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch({
        name: 'readMessage',
        args: {
          message: 'user_saw_onboarding_page',
        },
      }));
  });

  test('should fetch readMessage when SKIP_STEP', () => {
    const action = {
      type: actionTypes.SKIP_STEP,
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch({
        name: 'readMessage',
        args: {
          message: 'user_saw_onboarding_page',
        },
      }));
  });
});
