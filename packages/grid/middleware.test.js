import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import {
  actions as dataFetchActions, actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import middleware from './middleware';

describe('middleware', () => {
  const next = jest.fn();
  const dispatch = jest.fn();
  it('should export middleware', () => {
    expect(middleware)
      .toBeDefined();
  });

  it('should call createNotification on updatePostLink_FETCH_SUCCESS', () => {
    const store = {
      dispatch,
    };
    notificationActions.createNotification = jest.fn();

    const action = {
      type: `updatePostLink_${dataFetchActionTypes.FETCH_SUCCESS}`,
      appId: 'app1',
    };

    middleware(store)(next)(action);
    expect(dispatch).toHaveBeenCalledWith(
      notificationActions.createNotification(
        expect.objectContaining({
          notificationType: 'success',
        }),
      ),
    );
  });

  it('should call createNotification on updatePostLink_FETCH_FAIL', () => {
    const store = {
      dispatch,
    };
    notificationActions.createNotification = jest.fn();

    const action = {
      type: `updatePostLink_${dataFetchActionTypes.FETCH_FAIL}`,
      appId: 'app1',
    };

    middleware(store)(next)(action);
    expect(dispatch).toHaveBeenCalledWith(
      notificationActions.createNotification(
        expect.objectContaining({
          notificationType: 'error',
        }),
      ),
    );
  });

  it('should fetch gridPosts', () => {
    const action = {
      type: profileActionTypes.SELECT_PROFILE,
      profile: {
        id: 'id1',
      },
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch({
        name: 'gridPosts',
        args: {
          profileId: action.profile.id,
        },
      }));
  });
});
