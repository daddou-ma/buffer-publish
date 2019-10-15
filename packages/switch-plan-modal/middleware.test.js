import { actions as modalActions } from '@bufferapp/publish-modals';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actionTypes as notificationActionTypes } from '@bufferapp/notifications';
import { actionTypes } from './reducer';

import middleware from './middleware';

describe('middleware', () => {
  const next = jest.fn();
  const dispatch = jest.fn();
  const getState = jest.fn(() => ({
    switchPlanModal: { source: 'source' },
  }));

  it('fetches cancelTrial and hides upgrade modal', () => {
    const action = {
      type: actionTypes.CANCEL_TRIAL,
    };
    middleware({ dispatch, getState })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch({
        name: 'cancelTrial',
      }));
    expect(dispatch)
      .toBeCalledWith(modalActions.hideUpgradeModal());
  });

  it('triggers a notification if there is an error canceling the trial', () => {
    const RPC_NAME = 'cancelTrial';
    const action = dataFetchActions.fetchFail({
      name: RPC_NAME,
      error: 'Ups',
    });
    middleware({ dispatch, getState })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(expect.objectContaining({
        type: notificationActionTypes.CREATE_NOTIFICATION,
        notificationType: 'error',
        message: 'Ups',
      }));
  });
});
