import moment from 'moment-timezone';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';
import {
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import middleware from './middleware';

const getStateWithPaidUser = () => ({
  productFeatures: {
    planName: 'business',
  },
  profileSidebar: {
    selectedProfile: {
      business: true,
    },
  },
});

const getStateWithFreeUser = () => ({
  productFeatures: {
    planName: 'free',
  },
  profileSidebar: {
    selectedProfile: {
      business: false,
    },
  },
});

describe('middleware', () => {
  const next = jest.fn();
  const dispatch = jest.fn();
  it('should export middleware', () => {
    expect(middleware)
      .toBeDefined();
  });

  it('should fetch sentPosts for paid users', () => {
    const action = {
      type: profileActionTypes.SELECT_PROFILE,
      profile: {
        id: 'id1',
      },
    };
    middleware({ dispatch, getState: getStateWithPaidUser })(next)(action);
    expect(next)
    .toBeCalledWith(action);
    expect(dispatch)
    .toBeCalledWith(dataFetchActions.fetch({
      name: 'sentPosts',
      args: {
        profileId: action.profile.id,
        isFetchingMore: false,
        since: moment().subtract(10, 'years').unix(),
      },
    }));
  });

  it('should fetch sentPosts for free users', () => {
    const action = {
      type: profileActionTypes.SELECT_PROFILE,
      profile: {
        id: 'id1',
      },
    };
    middleware({ dispatch, getState: getStateWithFreeUser })(next)(action);
    expect(next)
    .toBeCalledWith(action);
    expect(dispatch)
    .toBeCalledWith(dataFetchActions.fetch({
      name: 'sentPosts',
      args: {
        profileId: action.profile.id,
        isFetchingMore: false,
        since: null,
      },
    }));
  });
});
