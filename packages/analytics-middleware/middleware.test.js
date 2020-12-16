import './analytics.mock';
import { actionTypes as orgActionTypes } from '@bufferapp/publish-data-organizations';
import { actionTypes } from './actions';
import middleware from './middleware';

const stateWithOrgSelected = {
  organizations: {
    selected: {
      globalOrgId: 'org1',
    },
  },
};

const stateWithoutOrgSelected = {
  organizations: {},
};

describe('middleware', () => {
  const next = jest.fn();
  const storeWithOrg = {
    dispatch: jest.fn(),
    getState: jest.fn(() => stateWithOrgSelected),
  };

  const storeWithoutOrg = {
    dispatch: jest.fn(),
    getState: jest.fn(() => stateWithoutOrgSelected),
  };

  global.PRODUCT_TRACKING_KEY = 'publish';
  global.CLIENT_NAME = 'publishWeb';

  afterEach(() => jest.clearAllMocks());

  it('should exist', () => {
    expect(middleware).toBeDefined();
  });

  it('should keep propagating the action through the chain', () => {
    const action = {
      type: 'TEST',
    };
    middleware(storeWithOrg)(next)(action);
  });

  it(`On ${actionTypes.INIT} should identify user on segment`, () => {
    const action = {
      type: actionTypes.INIT,
      userId: 'foo1',
      payload: {
        email: 'foo@buffer.com',
        organizationId: 'org1',
      },
    };
    middleware(storeWithOrg)(next)(action);
    expect(window.analytics.identify).toHaveBeenCalledWith(
      action.userId,
      action.payload
    );
  });

  it(`On ${actionTypes.TRACK_EVENT} should push an event to segment, if org ID is present`, () => {
    const action = {
      type: actionTypes.TRACK_EVENT,
      eventName: 'event foo',
      payload: {
        bar: 'bar',
      },
    };
    middleware(storeWithOrg)(next)(action);
    expect(window.analytics.track).toHaveBeenCalledWith(action.eventName, {
      bar: 'bar',
      product: 'publish',
      clientName: 'publishWeb',
      organizationId: 'org1',
    });
  });

  it(`On ${actionTypes.TRACK_EVENT} should not push an event to segment, if org ID is not present`, () => {
    const action = {
      type: actionTypes.TRACK_EVENT,
      eventName: 'event foo',
      payload: {
        bar: 'bar',
      },
    };
    middleware(storeWithoutOrg)(next)(action);
    expect(window.analytics.track).not.toHaveBeenCalled();
  });

  it(`On ${orgActionTypes.ORGANIZATION_SELECTED} should dispatch events in queue`, () => {
    const action = {
      type: actionTypes.TRACK_EVENT,
      eventName: 'event foo',
      payload: {
        bar: 'bar',
      },
    };
    const orgSelectedAction = {
      type: orgActionTypes.ORGANIZATION_SELECTED,
      selected: {
        id: 'org1',
      },
    };

    middleware(storeWithoutOrg)(next)(action);
    middleware(storeWithOrg)(next)(orgSelectedAction);
    expect(storeWithOrg.dispatch).toHaveBeenCalled();
  });

  it(`On ${actionTypes.PAGE_CHANGE} should push a page change to segment`, () => {
    const action = {
      type: actionTypes.PAGE_CHANGE,
      pageName: 'page foo',
      payload: {
        bar: 'bar',
      },
    };
    middleware(storeWithOrg)(next)(action);
    expect(window.analytics.page).toHaveBeenCalledWith(action.pageName, {
      bar: 'bar',
      product: 'publish',
    });
  });
});
