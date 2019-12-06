import { actionTypes as notificationActionTypes } from '@bufferapp/notifications';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actionTypes } from './reducer';
import middleware from './middleware';

const getStateWithSelectedUser = () => ({
  profileSidebar: {
    selectedProfileId: 1234,
  },
});

describe('middleware', () => {
  const next = jest.fn();
  const dispatch = jest.fn();

  it('should export middleware', () => {
    expect(middleware).toBeDefined();
  });

  it('should fetch mobileReminder', () => {
    const action = {
      type: actionTypes.POST_MOBILE_REMINDER,
      updateId: 1234,
    };
    middleware({ dispatch, getState: getStateWithSelectedUser })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      dataFetchActions.fetch({
        name: 'mobileReminder',
        args: { updateId: 1234 },
      })
    );
  });

  it('should trigger a notification if mobile reminder is successfully sent', () => {
    const RPC_NAME = 'mobileReminder';
    const action = dataFetchActions.fetchSuccess({
      name: RPC_NAME,
    });
    middleware({ dispatch, getState: getStateWithSelectedUser })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining({
        type: notificationActionTypes.CREATE_NOTIFICATION,
        notificationType: 'success',
        message:
          'A push notification to your connected mobile devices has been sent so you can post to Instagram!',
      })
    );
  });
});
