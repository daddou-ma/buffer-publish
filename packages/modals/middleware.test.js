import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';

import middleware from './middleware';
import { actions } from './reducer';

describe('middleware', () => {
  it('should show welcome modal when key is present', () => {
    window._showModal = {
      key: 'welcome-modal-1',
    };
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'APP_INIT',
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(actions.showWelcomeModal());
  });
  it('should show and track modal when key with source is present', () => {
    window._showModal = {
      key: 'upgrade-to-pro--profile_limit',
    };
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'APP_INIT',
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(actions.showUpgradeModal({ source: 'profile_limit' }));
  });
  it('should send \'unknown\' for key without source', () => {
    window._showModal = {
      key: 'upgrade-to-pro',
    };
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'APP_INIT',
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(actions.showUpgradeModal({ source: 'unknown' }));
  });
  it('should show and track upgrade modal when triggered from composer', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'COMPOSER_EVENT',
      eventType: 'show-upgrade-modal',
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(actions.showUpgradeModal({ source: 'queue_limit' }));
  });
  it('should show steal profile modal when key is present', () => {
    window._showModal = {
      key: 'steal-profile-modal',
      value: 'Test Profile',
    };
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'APP_INIT',
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(actions.showStealProfileModal({ stealProfileUsername: 'Test Profile' }));
  });
  it('should show welcome modal to paid users', () => {
    window._showModal = {
      key: 'welcome-modal-2',
    };
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'APP_INIT',
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(actions.showWelcomePaidModal());
  });
  it('should show welcome b4b trial modal to new trialists', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const getState = () => ({
      productFeatures: {
        planName: 'business',
      },
    });
    const action = {
      type: `user_${dataFetchActionTypes.FETCH_SUCCESS}`,
      result: {
        messages: [], // does not have 'welcome_to_business_modal'
        trial: {
          onTrial: true,
        },
      },
    };
    middleware({ dispatch, getState })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(actions.showWelcomeB4BTrialModal());
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch({ name: 'readMessage', args: { message: 'welcome_to_business_modal' } }));
  });
  it('should show profiles disconnected modal when one or more is disconnected', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`,
      result: [{ isDisconnected: false }, { isDisconnected: false }, { isDisconnected: true }],
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(actions.showProfilesDisconnectedModal());
  });
  it('should show instagram direct posting modal when key is present', () => {
    window._showModal = {
      key: 'ig-direct-post-modal',
    };
    const next = jest.fn();
    const dispatch = jest.fn();
    const getState = () => ({
      profileSidebar: {
        selectedProfileId: 'id1',
      },
    });
    const action = {
      type: profileActionTypes.SELECT_PROFILE,
      profile: {
        id: 'id1',
      },
    };
    const nextAction = {
      name: 'checkInstagramBusiness',
      type: 'FETCH',
      args: {
        profileId: 'id1',
        callbackAction: actions.showInstagramDirectPostingModal({
          profileId: 'id1',
        }),
      },
    };
    middleware({ dispatch, getState })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(nextAction);
  });
  it('should ignore other actions', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'SOME_OTHER_ACTION',
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
  });
});
