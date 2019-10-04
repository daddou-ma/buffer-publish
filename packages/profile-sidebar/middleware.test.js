import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import middleware from './middleware';

describe('middleware', () => {
  const next = jest.fn();
  const dispatch = jest.fn();
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
      isOnBusinessTrial: false,
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
    expect(middleware)
      .toBeDefined();
  });

  it('should select a profile on fetch profiles success', () => {
    const RPC_NAME = 'profiles';
    const action = dataFetchActions.fetchSuccess({
      name: RPC_NAME,
    });
    const selectProfileAction = {
      type: profileActionTypes.SELECT_PROFILE,
      profileId: '1234',
      profile: {
        id: '1234',
        username: 'profile1',
      },
    };
    middleware({ dispatch, getState })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(selectProfileAction);
  });
});
