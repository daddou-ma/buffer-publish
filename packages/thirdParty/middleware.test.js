// /* global FS, Appcues, Intercom */
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes } from './reducer';

import middleware from './middleware';

global.FS = {
  identify: jest.fn(),
};

global.Appcues = {
  identify: jest.fn(),
  track: jest.fn(),
};

global.Intercom = jest.fn();

const mockUser = {
  id: 'foo',
  createdAt: 'date',
  plan: 'business',
  planCode: '100',
  trial: {},
  orgUserCount: 2,
  is_business_user: true,
};

const mockIntercomUser = {
  app_id: '1234',
  id: 'foo',
  createdAt: 'date',
  email: 'hello@buffer.com',
};

describe('middleware', () => {
  const next = jest.fn();
  const store = {
    dispatch: jest.fn(),
    getState: () => ({ productFeatures: { planName: 'business' }, thirdparty: { appCues: { loaded: true } } }),
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
    Object.defineProperty(global.document, 'querySelector', { value: getFakeMarkerEl });

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
      type: actionTypes.FULLSTORY,
      result: mockUser,
    });
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
  it('marks Appcues as loaded and identifies a B4B user with Appcues', () => {
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
    });
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
