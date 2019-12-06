import { actionTypes as notificationActionTypes } from '@bufferapp/notifications';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actionTypes } from './reducer';
import middleware from './middleware';

describe('middleware', () => {
  const next = jest.fn();
  const dispatch = jest.fn();

  it('should export middleware', () => {
    expect(middleware).toBeDefined();
  });

  it('should fetch setNotifications', () => {
    const action = {
      type: actionTypes.TOGGLE_NOTIFICATIONS,
      notifications: {},
    };
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      dataFetchActions.fetch({
        name: 'setNotifications',
        args: {},
      })
    );
  });

  it('should trigger a notification if change in notification is successfully approved', () => {
    const RPC_NAME = 'setNotifications';
    const action = dataFetchActions.fetchSuccess({
      name: RPC_NAME,
      result: {
        notice_message: "We've changed your email preferences",
      },
    });
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining({
        type: notificationActionTypes.CREATE_NOTIFICATION,
        notificationType: 'success',
        message: "We've changed your email preferences",
      })
    );
  });
});
