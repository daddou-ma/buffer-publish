import { actionTypes as tabsActionTypes } from '@bufferapp/publish-tabs';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actionTypes } from './reducer';
import middleware from './middleware';

describe('middleware', () => {
  const state = {
    profileSidebar: {
      loading: false,
      profiles: [
        {
          id: '1234',
          username: 'profile1',
        },
        {
          id: '12345',
          username: 'profile2',
        },
      ],
      selectedProfileId: '1234',
    },
    tabs: {
      tabId: 'drafts',
    },
    router: {
      location: { pathname: '/profile/1234/tab/drafts' },
    },
  };
  const getState = jest.fn(() => state);

  it('should export middleware', () => {
    expect(middleware).toBeDefined();
  });

  it('should select a profile and get count when PROFILE_ROUTE_LOADED', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: actionTypes.PROFILE_ROUTE_LOADED,
      selectedProfile: {
        id: 'id1',
      },
      tabId: 'queue',
    };

    const selectProfileAction = {
      type: actionTypes.SELECT_PROFILE,
      profile: {
        id: 'id1',
      },
      profileId: 'id1',
    };

    middleware({ dispatch, getState })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(selectProfileAction);
  });

  it('should redirect to a valid profile when PROFILE_ROUTE_LOADED doesnt find a match', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: actionTypes.PROFILE_ROUTE_LOADED,
      selectedProfile: null,
      tabId: 'queue',
    };

    const selectProfileAction = {
      type: actionTypes.SELECT_PROFILE,
      profile: {
        id: '1234',
        username: 'profile1',
      },
      profileId: '1234',
    };

    middleware({ dispatch, getState })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(selectProfileAction);
  });

  it('gets count when SELECT_PROFILE', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: actionTypes.SELECT_PROFILE,
      profile: {
        id: 'id',
      },
    };

    middleware({ dispatch, getState })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      dataFetchActions.fetch({
        name: 'getCounts',
        args: {
          profileId: 'id',
        },
      })
    );
  });

  it('reorders profiles when PROFILE_DROPPED', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: actionTypes.PROFILE_DROPPED,
      commit: true,
    };

    middleware({ dispatch, getState })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      dataFetchActions.fetch({
        name: 'reorderProfiles',
        args: {
          order: ['1234', '12345'],
        },
      })
    );
  });
});
