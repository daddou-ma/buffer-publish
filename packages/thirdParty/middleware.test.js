// /* global FS, Appcues, Intercom */
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes } from './reducer';

import middleware from './middleware';
import { HELPSCOUT_ID } from './constants';

global.FS = {
  identify: jest.fn(),
};

global.Appcues = {
  identify: jest.fn(),
  track: jest.fn(),
  on: jest.fn(),
};

global.Beacon = jest.fn();

global.Intercom = jest.fn();

const mockUser = {
  id: 'foo',
  createdAt: 'date',
  plan: 'business',
  planCode: '100',
  trial: {},
  orgUserCount: 2,
  profileCount: 3,
  is_business_user: true,
  helpScoutConfig: '{ "param1": true, "param2": 24 }',
  tags: [],
};

const mockFreeUser = {
  id: 'bar',
  createdAt: 'date',
  plan: 'free',
  planCode: '100',
  trial: {},
  orgUserCount: 2,
  profileCount: 3,
  is_free_user: true,
  helpScoutConfig: '{ "param1": true, "param2": 24 }',
  tags: [],
};

const mockIntercomUser = {
  app_id: '1234',
  id: 'foo',
  createdAt: 'date',
  email: 'hello@buffer.com',
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('middleware', () => {
  const next = jest.fn();
  const store = {
    dispatch: jest.fn(),
    getState: () => ({
      productFeatures: { planName: 'business' },
      thirdparty: { appCues: { loaded: true } },
    }),
  };
  it('always calls next()', () => {
    const action = {
      type: 'TEST',
    };
    middleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('triggers fetch for intercom when app loads', () => {
    const action = { type: 'APP_INIT' };
    middleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: dataFetchActionTypes.FETCH,
      name: 'intercom',
    });
  });
  it('identifies the user with Intercom', () => {
    /** We need to return a fake DOM element to fool the extension check code... */
    const getFakeMarkerEl = () => ({ getAttribute: () => true });
    Object.defineProperty(global.document, 'querySelector', {
      value: getFakeMarkerEl,
    });

    const action = {
      type: `intercom_${dataFetchActionTypes.FETCH_SUCCESS}`,
      result: mockIntercomUser,
    };
    middleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: actionTypes.INTERCOM_LOADED,
      loaded: true,
    });
    expect(global.Intercom).toHaveBeenCalledWith('boot', {
      ...mockIntercomUser,
      extension_installed: true,
    });
  });
  it('triggers dispatches for third party integrations when the user loads', () => {
    const action = {
      type: `user_${dataFetchActionTypes.FETCH_SUCCESS}`,
      result: mockUser,
    };
    middleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: actionTypes.APPCUES,
      result: mockUser,
    });
    expect(store.dispatch).toHaveBeenCalledWith({
      type: actionTypes.HELPSCOUT_BEACON,
      result: mockUser,
    });
    expect(store.dispatch).toHaveBeenCalledWith({
      type: actionTypes.FULLSTORY,
      result: mockUser,
    });
  });
  it('Fullstory does not collect free user data', () => {
    const action = {
      type: actionTypes.FULLSTORY,
      result: mockFreeUser,
    };
    middleware(store)(next)(action);
    expect(global.FS.identify).not.toHaveBeenCalled();
  });
  it('identifies the user with Fullstory', () => {
    const action = {
      type: actionTypes.FULLSTORY,
      result: mockUser,
    };
    middleware(store)(next)(action);
    expect(global.FS.identify).toHaveBeenCalledWith(mockUser.id, {
      pricingPlan_str: 'business',
    });
  });

  it('does not interact with Appcues if user is not business or pro', () => {
    const action = {
      type: actionTypes.APPCUES,
      result: mockFreeUser,
    };
    middleware(store)(next)(action);

    expect(global.Appcues.identify).not.toHaveBeenCalled();
    expect(global.Appcues.on).not.toHaveBeenCalled();
  });

  it('marks Appcues as loaded and identifies a B4B / Pro user with Appcues', () => {
    const action = {
      type: actionTypes.APPCUES,
      result: mockUser,
    };
    middleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: actionTypes.APPCUES_LOADED,
      loaded: true,
    });
    expect(global.Appcues.identify).toHaveBeenCalledWith(mockUser.id, {
      name: mockUser.id,
      createdAt: mockUser.createdAt,
      plan: mockUser.plan,
      planCode: mockUser.planCode,
      onTrial: mockUser.trial.onTrial,
      trialLength: mockUser.trial.trialLength,
      trialTimeRemaining: mockUser.trial.trialTimeRemaining,
      orgUserCount: mockUser.orgUserCount,
      profileCount: mockUser.profileCount,
      upgradedFromLegacyAwesomeToProPromotion: false,
      migratedFromAwesomeToPro_Batch1: false,
      migratedFromAwesomeToPro_teamMember_Batch1: false,
    });

    expect(global.Appcues.on.mock.calls).toEqual([
      ['flow_started', expect.any(Function)],
      ['flow_completed', expect.any(Function)],
      ['flow_skipped', expect.any(Function)],
      ['flow_aborted', expect.any(Function)],
    ]);
  });

  it('tells AppCues when the user has upgraded from legacy awesome to Pro', () => {
    const action = {
      type: actionTypes.APPCUES,
      result: { ...mockUser, tags: ['upgraded-to-pro-from-legacy-awesome'] },
    };
    middleware(store)(next)(action);
    expect(global.Appcues.identify).toHaveBeenCalledWith(mockUser.id, {
      name: mockUser.id,
      createdAt: mockUser.createdAt,
      plan: mockUser.plan,
      planCode: mockUser.planCode,
      onTrial: mockUser.trial.onTrial,
      trialLength: mockUser.trial.trialLength,
      trialTimeRemaining: mockUser.trial.trialTimeRemaining,
      orgUserCount: mockUser.orgUserCount,
      profileCount: mockUser.profileCount,
      upgradedFromLegacyAwesomeToProPromotion: true,
      migratedFromAwesomeToPro_Batch1: false,
      migratedFromAwesomeToPro_teamMember_Batch1: false,
    });
  });

  it('tells AppCues when the user has been migrated from legacy awesome to Pro', () => {
    const action = {
      type: actionTypes.APPCUES,
      result: { ...mockUser, tags: ['awesome-pro-forced-migration'] },
    };
    middleware(store)(next)(action);
    expect(global.Appcues.identify).toHaveBeenCalledWith(mockUser.id, {
      name: mockUser.id,
      createdAt: mockUser.createdAt,
      plan: mockUser.plan,
      planCode: mockUser.planCode,
      onTrial: mockUser.trial.onTrial,
      trialLength: mockUser.trial.trialLength,
      trialTimeRemaining: mockUser.trial.trialTimeRemaining,
      orgUserCount: mockUser.orgUserCount,
      profileCount: mockUser.profileCount,
      upgradedFromLegacyAwesomeToProPromotion: false,
      migratedFromAwesomeToPro_Batch1: true,
      migratedFromAwesomeToPro_teamMember_Batch1: false,
    });
  });

  it('tells AppCues when a users team member has been migrated from legacy awesome to Pro', () => {
    const action = {
      type: actionTypes.APPCUES,
      result: {
        ...mockUser,
        tags: ['awesome-pro-forced-migration-team-member'],
      },
    };
    middleware(store)(next)(action);
    expect(global.Appcues.identify).toHaveBeenCalledWith(mockUser.id, {
      name: mockUser.id,
      createdAt: mockUser.createdAt,
      plan: mockUser.plan,
      planCode: mockUser.planCode,
      onTrial: mockUser.trial.onTrial,
      trialLength: mockUser.trial.trialLength,
      trialTimeRemaining: mockUser.trial.trialTimeRemaining,
      orgUserCount: mockUser.orgUserCount,
      profileCount: mockUser.profileCount,
      upgradedFromLegacyAwesomeToProPromotion: false,
      migratedFromAwesomeToPro_Batch1: false,
      migratedFromAwesomeToPro_teamMember_Batch1: true,
    });
  });

  it('marks HelpScout as loaded and identifies the user with HelpScout', () => {
    const action = {
      type: actionTypes.HELPSCOUT_BEACON,
      result: mockUser,
    };
    middleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: actionTypes.HELPSCOUT_BEACON_LOADED,
      loaded: true,
    });
    // We call window.Beacon 3 times:
    expect(global.Beacon.mock.calls.length).toBe(3);
    // The first one to register us with the  ID
    expect(global.Beacon.mock.calls[0]).toEqual(['init', HELPSCOUT_ID]);

    // The second one to identify the user
    expect(global.Beacon.mock.calls[1]).toEqual([
      'identify',
      { name: mockUser.name, email: mockUser.email },
    ]);

    // The third one with the params obtained from the API
    expect(global.Beacon.mock.calls[2]).toEqual([
      'config',
      JSON.parse(mockUser.helpScoutConfig),
    ]);
  });
  it('sends event to appcues when user adds a post in the composer', () => {
    const action = {
      type: 'COMPOSER_EVENT',
      eventType: 'saved-drafts',
    };
    middleware(store)(next)(action);
    expect(global.Appcues.track).toHaveBeenCalledWith('Created Post');
  });
});
