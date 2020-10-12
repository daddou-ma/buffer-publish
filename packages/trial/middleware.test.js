import { actionTypes as notificationActionTypes } from '@bufferapp/notifications';
import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import middleware from './middleware';

describe('trial middleware', () => {
  it('should fetch organnizationsData if startTrial is successful', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: `startTrial_${dataFetchActionTypes.FETCH_SUCCESS}`,
    };
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining({
        type: 'INIT_ORGANIZATIONS',
      })
    );
  });
  describe('should trigger notification', () => {
    it('when a pro trial is succesfully started', () => {
      const next = jest.fn();
      const dispatch = jest.fn();
      const action = dataFetchActions.fetchSuccess({
        name: 'startTrial',
      });
      middleware({ dispatch })(next)(action);
      expect(next).toBeCalledWith(action);
      expect(dispatch).toBeCalledWith(
        expect.objectContaining({
          type: notificationActionTypes.CREATE_NOTIFICATION,
          notificationType: 'success',
          message: 'Awesome! You’re now starting your free 7-day Pro trial',
        })
      );
    });

    it('when a pro trial is unsuccessful', () => {
      const next = jest.fn();
      const dispatch = jest.fn();
      const action = dataFetchActions.fetchFail({
        name: 'startTrial',
      });
      middleware({ dispatch })(next)(action);
      expect(next).toBeCalledWith(action);
      expect(dispatch).toBeCalledWith(
        expect.objectContaining({
          type: notificationActionTypes.CREATE_NOTIFICATION,
          notificationType: 'error',
          message:
            'Uh oh, something went wrong. Please get in touch if this problem persists.',
        })
      );
    });
  });
});
