import {
  actions as fetchActions,
  actionTypes as fetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { preferencesAppsExtras } from '@bufferapp/publish-routes';
import { LOCATION_CHANGE } from 'connected-react-router';
import { actions as notificationActions } from '@bufferapp/notifications';

import middleware from './middleware';
import { actionTypes } from './reducer';

describe('middleware', () => {
  const next = jest.fn();
  it('should call connectedApps when location change to apps and extras', () => {
    const dispatch = jest.fn();
    const store = {
      dispatch,
    };
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        location: { pathname: preferencesAppsExtras.route },
      },
    };
    middleware(store)(next)(action);
    expect(dispatch).toHaveBeenCalledWith(
      fetchActions.fetch({
        name: 'connectedApps',
      })
    );
  });

  it('should call revokeConnectedApp when the action requestRevokeApp is received', () => {
    const dispatch = jest.fn();
    const store = {
      dispatch,
    };
    const action = {
      type: actionTypes.REQUEST_REVOKE_APP,
      appId: 'app1',
    };
    middleware(store)(next)(action);
    expect(dispatch).toHaveBeenCalledWith(
      fetchActions.fetch({
        name: 'revokeConnectedApp',
        args: {
          appId: 'app1',
        },
      })
    );
  });

  it('should call createNotification when the action revokeConnectedApps_FETCH_SUCCESS is received', () => {
    const dispatch = jest.fn();
    const store = {
      dispatch,
    };
    notificationActions.createNotification = jest.fn();

    const action = {
      type: `revokeConnectedApp_${fetchActionTypes.FETCH_SUCCESS}`,
      appId: 'app1',
    };

    middleware(store)(next)(action);
    expect(dispatch).toHaveBeenCalledWith(
      notificationActions.createNotification(
        expect.objectContaining({
          notificationType: 'success',
        })
      )
    );
  });

  it('should not call connectedApps when location change to another path', () => {
    const dispatch = jest.fn();
    const store = {
      dispatch,
    };
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        location: { pathname: '/preferences/test' },
      },
    };
    middleware(store)(next)(action);
    expect(dispatch).not.toHaveBeenCalledWith(
      fetchActions.fetch({
        name: 'connectedApps',
      })
    );
  });

  it('always propagates the action', () => {
    const dispatch = jest.fn();
    const store = {
      dispatch,
    };
    const action = {};
    middleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
