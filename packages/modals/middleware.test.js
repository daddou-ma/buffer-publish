import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';

import middleware from './middleware';
import { actions, actionTypes as modalsActionTypes } from './reducer';

describe('middleware', () => {
  it('should show welcome modal when key is present', () => {
    window._showModal = {
      key: 'welcome-modal-1',
    };
    const next = jest.fn();
    const dispatch = jest.fn();
    const getState = () => ({
      user: {
        plan: 'pro',
      },
    });
    const action = {
      type: 'INIT_MODALS',
    };
    middleware({ dispatch, getState })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(actions.showWelcomeModal());
  });
  it('should show and track modal when key with source is present', () => {
    window._showModal = {
      key: 'upgrade-to-pro--profile_limit',
    };
    const next = jest.fn();
    const dispatch = jest.fn();
    const getState = () => ({
      user: {
        plan: 'pro',
      },
    });
    const action = {
      type: 'INIT_MODALS',
    };
    middleware({ dispatch, getState })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      actions.showSwitchPlanModal({ source: 'profile_limit', plan: 'pro' })
    );
  });
  it("should send 'unknown' for key without source", () => {
    window._showModal = {
      key: 'upgrade-to-pro',
    };
    const next = jest.fn();
    const dispatch = jest.fn();
    const getState = () => ({
      user: {
        plan: 'pro',
      },
    });
    const action = {
      type: 'INIT_MODALS',
    };
    middleware({ dispatch, getState })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      actions.showSwitchPlanModal({ source: 'unknown', plan: 'pro' })
    );
  });
  it('should show and track upgrade modal when triggered from composer', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'COMPOSER_EVENT',
      eventType: 'show-switch-plan-modal',
    };
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      actions.showSwitchPlanModal({ source: 'queue_limit', plan: 'pro' })
    );
  });
  it('should show steal profile modal when key is present', () => {
    window._showModal = {
      key: 'steal-profile-modal',
      value: 'Test Profile',
    };
    const next = jest.fn();
    const dispatch = jest.fn();
    const getState = () => ({
      user: {
        plan: 'pro',
      },
    });
    const action = {
      type: 'INIT_MODALS',
    };
    middleware({ dispatch, getState })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      actions.showStealProfileModal({ stealProfileUsername: 'Test Profile' })
    );
  });
  it('should show welcome modal to paid users', () => {
    window._showModal = {
      key: 'welcome-modal-2',
    };
    const next = jest.fn();
    const dispatch = jest.fn();
    const getState = () => ({
      user: {
        plan: 'pro',
      },
    });
    const action = {
      type: 'INIT_MODALS',
    };
    middleware({ dispatch, getState })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(actions.showWelcomePaidModal());
  });

  it('should show profiles disconnected modal when one or more is disconnected', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const getState = () => ({
      user: {
        plan: 'pro',
      },
    });
    const action = {
      type: `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`,
      result: [
        { isDisconnected: false },
        { isDisconnected: false },
        { isDisconnected: true },
      ],
    };
    middleware({ dispatch, getState })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(actions.showProfilesDisconnectedModal());
  });

  it('should show trial upgrade modal', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: `user_${dataFetchActionTypes.FETCH_SUCCESS}`,
      result: { shouldShowProTrialExpiredModal: true },
    };
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(actions.showTrialCompleteModal());
  });

  it('tracks a Modal Payment Opened event when the payment modal opens', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    analyticsActions.trackEvent = jest.fn();

    const action = {
      type: modalsActionTypes.SHOW_SWITCH_PLAN_MODAL,
      plan: 'premium_business',
      source: 'cta_banner_upgrade_premium',
    };

    const expectedMetadata = {
      cta: 'publish-app-ctaBanner-premiumUpgrade-1',
      ctaApp: 'publish',
      ctaButton: 'premiumUpgrade',
      ctaLocation: 'ctaBanner',
      ctaVersion: '1',
      ctaView: 'app',
      planId: '9',
      planName: 'premium_business',
    };
    middleware({ dispatch })(next)(action);

    expect(next).toBeCalledWith(action);

    expect(analyticsActions.trackEvent).toBeCalledWith(
      'Modal Payment Opened',
      expectedMetadata
    );
  });

  it('should ignore other actions', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'SOME_OTHER_ACTION',
    };
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
  });
});
