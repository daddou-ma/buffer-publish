// /* global FS, Appcues */
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as orgActionTypes } from '@bufferapp/publish-data-organizations';
import * as FullStory from '@fullstory/browser';
import { actionTypes } from './reducer';

import middleware from './middleware';

jest.mock('@fullstory/browser');

global.Appcues = {
  identify: jest.fn(),
  track: jest.fn(),
  on: jest.fn(),
};

const mockUser = {
  id: 'foo',
  createdAt: 'date',
  tags: [],
};

const mockOrganization = {
  planBase: 'pro',
  plan: 'pro15',
  planCode: 5,
  trial: {
    onTrial: false,
    trialLength: '',
    trialTimeRemaining: '',
  },
  usersCount: 1,
  profilesCount: 1,
};

const mockFreeOrganization = {
  ...mockOrganization,
  planBase: 'free',
  plan: 'free',
};

const mockAppcuesIdentity = {
  name: mockUser.id,
  modalsShowing: false,
  createdAt: mockUser.createdAt,
  plan: mockOrganization.planBase,
  planCode: mockOrganization.planCode,
  onTrial: mockOrganization.trial.onTrial,
  trialLength: mockOrganization.trial.trialLength,
  trialTimeRemaining: mockOrganization.trial.trialTimeRemaining,
  orgUserCount: mockOrganization.usersCount,
  profileCount: mockOrganization.profilesCount,
};

describe('middleware', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    // Some third party scripts only run in production, so simulate the env
    process.env = { ...OLD_ENV, NODE_ENV: 'production' }; // make a copy
  });
  afterAll(() => {
    process.env = OLD_ENV; // restore old env
  });
  const next = jest.fn();
  const dispatch = jest.fn();
  const getState = () => ({
    thirdparty: { appCues: { loaded: true } },
    modals: {},
    user: mockUser,
  });

  it('always calls next()', () => {
    const action = {
      type: 'TEST',
    };
    middleware({ dispatch, getState })(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('triggers dispatches for bugsnag integration when the user loads', () => {
    const action = {
      type: `user_${dataFetchActionTypes.FETCH_SUCCESS}`,
      result: mockUser,
    };
    middleware({ dispatch, getState })(next)(action);
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.BUGSNAG,
      result: mockUser,
    });
  });

  it('triggers dispatches for third party integrations when the organization is selected', () => {
    const action = {
      type: orgActionTypes.ORGANIZATION_SELECTED,
      selected: mockOrganization,
    };
    middleware({ dispatch, getState })(next)(action);
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.APPCUES,
      result: mockOrganization,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.FULLSTORY,
      result: mockOrganization,
    });
  });

  it('Fullstory does not collect free user data', () => {
    const action = {
      type: actionTypes.FULLSTORY,
      result: mockFreeOrganization,
    };
    middleware({ dispatch, getState })(next)(action);
    expect(FullStory.identify).not.toHaveBeenCalled();
  });

  it('identifies the user with Fullstory', () => {
    const action = {
      type: actionTypes.FULLSTORY,
      result: mockOrganization,
    };
    middleware({ dispatch, getState })(next)(action);
    expect(FullStory.identify).toHaveBeenCalledWith(mockUser.id, {
      pricingPlan_str: 'pro',
    });
  });

  it('does not interact with Appcues if user is not business or pro', () => {
    const action = {
      type: actionTypes.APPCUES,
      result: mockFreeOrganization,
    };
    middleware({ dispatch, getState })(next)(action);

    expect(global.Appcues.identify).not.toHaveBeenCalled();
    expect(global.Appcues.on).not.toHaveBeenCalled();
  });

  it('marks Appcues as loaded and identifies a B4B / Pro user with Appcues', () => {
    const action = {
      type: actionTypes.APPCUES,
      result: mockOrganization,
    };
    middleware({ dispatch, getState })(next)(action);
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.APPCUES_LOADED,
      loaded: true,
    });
    expect(global.Appcues.identify).toHaveBeenCalledWith(mockUser.id, {
      ...mockAppcuesIdentity,
      upgradedFromLegacyAwesomeToProPromotion: false,
      migratedFromAwesomeToPro_Batch1: false,
      migratedFromAwesomeToPro_teamMember_Batch1: false,
      migratedFromAwesomeToPro_Batch2: false,
      migratedFromAwesomeToSBP: false,
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
      result: mockOrganization,
    };
    const tags = ['upgraded-to-pro-from-legacy-awesome'];
    const getNewState = () => ({
      thirdparty: { appCues: { loaded: true } },
      modals: {},
      user: {
        ...mockUser,
        tags,
      },
    });
    middleware({ dispatch, getState: getNewState })(next)(action);
    expect(global.Appcues.identify).toHaveBeenCalledWith(mockUser.id, {
      ...mockAppcuesIdentity,
      upgradedFromLegacyAwesomeToProPromotion: true,
      migratedFromAwesomeToPro_Batch1: false,
      migratedFromAwesomeToPro_teamMember_Batch1: false,
      migratedFromAwesomeToPro_Batch2: false,
      migratedFromAwesomeToSBP: false,
    });
  });

  it('tells AppCues when the user has been migrated from legacy awesome to Pro', () => {
    const action = {
      type: actionTypes.APPCUES,
      result: mockOrganization,
    };
    const tags = ['awesome-pro-forced-migration'];
    const getNewState = () => ({
      thirdparty: { appCues: { loaded: true } },
      modals: {},
      user: {
        ...mockUser,
        tags,
      },
    });
    middleware({ dispatch, getState: getNewState })(next)(action);
    expect(global.Appcues.identify).toHaveBeenCalledWith(mockUser.id, {
      ...mockAppcuesIdentity,
      upgradedFromLegacyAwesomeToProPromotion: false,
      migratedFromAwesomeToPro_Batch1: true,
      migratedFromAwesomeToPro_teamMember_Batch1: false,
      migratedFromAwesomeToPro_Batch2: false,
      migratedFromAwesomeToSBP: false,
    });
  });

  it('tells AppCues when a users team member has been migrated from legacy awesome to Pro', () => {
    const action = {
      type: actionTypes.APPCUES,
      result: mockOrganization,
    };
    const tags = ['awesome-pro-forced-migration-team-member'];
    const getNewState = () => ({
      thirdparty: { appCues: { loaded: true } },
      modals: {},
      user: {
        ...mockUser,
        tags,
      },
    });
    middleware({ dispatch, getState: getNewState })(next)(action);
    expect(global.Appcues.identify).toHaveBeenCalledWith(mockUser.id, {
      ...mockAppcuesIdentity,
      upgradedFromLegacyAwesomeToProPromotion: false,
      migratedFromAwesomeToPro_Batch1: false,
      migratedFromAwesomeToPro_teamMember_Batch1: true,
      migratedFromAwesomeToPro_Batch2: false,
      migratedFromAwesomeToSBP: false,
    });
  });

  it('tells AppCues when a user has been migrated from legacy awesome to Pro batch 2', () => {
    const action = {
      type: actionTypes.APPCUES,
      result: mockOrganization,
    };
    const tags = ['upgraded-awesome-to-pro-batch-2'];
    const getNewState = () => ({
      thirdparty: { appCues: { loaded: true } },
      modals: {},
      user: {
        ...mockUser,
        tags,
      },
    });
    middleware({ dispatch, getState: getNewState })(next)(action);
    expect(global.Appcues.identify).toHaveBeenCalledWith(mockUser.id, {
      ...mockAppcuesIdentity,
      upgradedFromLegacyAwesomeToProPromotion: false,
      migratedFromAwesomeToPro_Batch1: false,
      migratedFromAwesomeToPro_teamMember_Batch1: false,
      migratedFromAwesomeToPro_Batch2: true,
      migratedFromAwesomeToSBP: false,
    });
  });

  it('tells AppCues when a user has been migrated from legacy awesome to SBP', () => {
    const action = {
      type: actionTypes.APPCUES,
      result: mockOrganization,
    };
    const tags = ['upgraded-awesome-to-small-business'];
    const getNewState = () => ({
      thirdparty: { appCues: { loaded: true } },
      modals: {},
      user: {
        ...mockUser,
        tags,
      },
    });
    middleware({ dispatch, getState: getNewState })(next)(action);
    expect(global.Appcues.identify).toHaveBeenCalledWith(mockUser.id, {
      ...mockAppcuesIdentity,
      upgradedFromLegacyAwesomeToProPromotion: false,
      migratedFromAwesomeToPro_Batch1: false,
      migratedFromAwesomeToPro_teamMember_Batch1: false,
      migratedFromAwesomeToPro_Batch2: false,
      migratedFromAwesomeToSBP: true,
    });
  });

  it('sends event to appcues when user adds a post in the composer', () => {
    const action = {
      type: 'COMPOSER_EVENT',
      eventType: 'saved-drafts',
    };
    middleware({ dispatch, getState })(next)(action);
    expect(global.Appcues.track).toHaveBeenCalledWith('Created Post');
  });
});
