import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import {
  actions as dataFetchActions, actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import { getChannelProperties } from './util';
import { actionTypes as gridActionTypes } from './reducer';
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
        type: 'instagram',
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
  describe('segment tracking', () => {
    const getStateWithChannel = () => ({
      profileSidebar: {
        selectedProfile: {
          id: 'bar',
          serviceId: 'foo123',
          serviceUsername: 'am.ylee',
        },
      },
    });
    const channel = getStateWithChannel().profileSidebar.selectedProfile;
    it('it should track on copy to clipboard success', () => {
      analyticsActions.trackEvent = jest.fn();
      const action = {
        type: gridActionTypes.COPY_TO_CLIPBOARD_RESULT,
        copySuccess: true,
        publicGridUrl: 'https://google.com',
      };

      const expectedTrackingObj = {
        shopGridUrl: action.publicGridUrl,
        ...getChannelProperties(channel),
      };

      middleware({ dispatch, getState: getStateWithChannel })(next)(action);
      expect(analyticsActions.trackEvent).toHaveBeenCalledWith(
        'Shop Grid Page Link Copied',
        expectedTrackingObj
      );
    });

    it('it should not track on copy to clipboard failure', () => {
      analyticsActions.trackEvent = jest.fn();
      const action = {
        type: gridActionTypes.COPY_TO_CLIPBOARD_RESULT,
        copySuccess: false,
      };

      middleware({ dispatch })(next)(action);
      expect(analyticsActions.trackEvent).not.toHaveBeenCalledWith(
        'Shop Grid Page Link Copied',
        {}
      );
    });

    it('it should track on post link updated', () => {
      analyticsActions.trackEvent = jest.fn();
      const RPC_NAME = 'updatePostLink';
      const action = dataFetchActions.fetchSuccess({
        name: RPC_NAME,
        args: {
          updateId: '123',
          link: 'https://google.com',
        },
        result: { success: true },
      });
      const expectedTrackingObj = {
        postId: '123',
        url: 'https://google.com',
        ...getChannelProperties(channel),
      };

      middleware({ dispatch, getState: getStateWithChannel })(next)(action);
      expect(analyticsActions.trackEvent).toHaveBeenCalledWith(
        'Shop Grid Post URL Updated',
        expectedTrackingObj
      );
    });
  });
});
