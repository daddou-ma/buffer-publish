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

  it('should trigger a notification if update schedule is successfully sent', () => {
    const RPC_NAME = 'updateSchedule';
    const action = dataFetchActions.fetchSuccess({
      name: RPC_NAME,
      args: {
        profileId: 'abc',
      },
    });
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining({
        type: 'FETCH',
        args: {
          profileId: 'abc',
          message: 'Awesome! Your schedule has been successfully saved.',
        },
      })
    );
  });

  it('should trigger a notification if update schedule fails', () => {
    const RPC_NAME = 'updateSchedule';
    const action = dataFetchActions.fetchFail({
      name: RPC_NAME,
      error: 'Update Schedule Failed',
    });
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining({
        type: notificationActionTypes.CREATE_NOTIFICATION,
        notificationType: 'error',
        message: 'Update Schedule Failed',
      })
    );
  });

  it('should trigger a notification if update timezone is successfully sent', () => {
    const RPC_NAME = 'updateTimezone';
    const action = dataFetchActions.fetchSuccess({
      name: RPC_NAME,
      args: {
        profileId: 'abc',
      },
    });
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining({
        type: 'FETCH',
        args: {
          profileId: 'abc',
          message: 'Awesome! Your schedule has been successfully saved.',
        },
      })
    );
  });

  it('should trigger a notification if update timezone fails', () => {
    const RPC_NAME = 'updateTimezone';
    const action = dataFetchActions.fetchFail({
      name: RPC_NAME,
      error: 'Update Timezone Failed',
    });
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining({
        type: notificationActionTypes.CREATE_NOTIFICATION,
        notificationType: 'error',
        message: 'Update Timezone Failed',
      })
    );
  });

  it('should trigger a notification if update paused schedules is successfully sent', () => {
    const RPC_NAME = 'updatePausedSchedules';
    const action = dataFetchActions.fetchSuccess({
      name: RPC_NAME,
      args: {
        profileId: 'abc',
      },
    });
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining({
        type: 'FETCH',
        args: {
          profileId: 'abc',
          message: 'Awesome! Your schedule has been successfully saved.',
        },
      })
    );
  });
});
