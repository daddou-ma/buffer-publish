import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actionTypes as notificationActionTypes } from '@bufferapp/notifications';
import { actionTypes as orgActionTypes } from '@bufferapp/publish-data-organizations';
import middleware from './middleware';
import { actionTypes, initialState } from './reducer';

describe('middleware', () => {
  const next = jest.fn();
  const orgSelectedAction = {
    type: orgActionTypes.ORGANIZATION_SELECTED,
    selected: { globalOrgId: '123' },
  };
  it('exports middleware', () => {
    expect(middleware).toBeDefined();
  });

  it('fetches getCampaignsList if org is selected and has org-switcher and campaign features', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({
        campaignsList: initialState,
        user: { hasCampaignsFeature: true, hasOrgSwitcherFeature: true },
      }),
    };
    middleware(store)(next)(orgSelectedAction);
    expect(next).toBeCalledWith(orgSelectedAction);
    expect(store.dispatch).toBeCalledWith(
      dataFetchActions.fetch({
        name: 'getCampaignsList',
        args: { globalOrgId: '123' },
      })
    );
  });

  it('does not fetch getCampaignsList if org is selected and does not have org-switcher feature', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({
        campaignsList: initialState,
        user: { hasCampaignsFeature: true },
      }),
    };
    middleware(store)(next)(orgSelectedAction);
    expect(next).toBeCalledWith(orgSelectedAction);
    expect(store.dispatch).not.toBeCalledWith(
      dataFetchActions.fetch({
        name: 'getCampaignsList',
        args: { globalOrgId: '123' },
      })
    );
  });

  it('fetches getCampaignsList if campaign list state is null', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({
        campaignsList: initialState,
        user: { hasCampaignsFeature: true },
      }),
    };
    const action = {
      type: actionTypes.FETCH_CAMPAIGNS_IF_NEEDED,
    };
    middleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
    expect(store.dispatch).toBeCalledWith(
      dataFetchActions.fetch({
        name: 'getCampaignsList',
        args: {},
      })
    );
  });

  it('does not fetch campaigns if user has no campaign feature', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({
        campaignsList: { initialState },
        user: { features: [] },
      }),
    };
    const action = {
      type: actionTypes.FETCH_CAMPAIGNS_IF_NEEDED,
    };
    middleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
    expect(store.dispatch).not.toBeCalledWith(
      dataFetchActions.fetch({
        name: 'getCampaignsList',
        args: {},
      })
    );
  });
  it('does not fetch campaigns if campaigns is already in campaignsList state', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({
        campaignsList: { ...initialState, campaigns: [] },
        user: { hasCampaignsFeature: true },
      }),
    };
    const action = {
      type: actionTypes.FETCH_CAMPAIGNS_IF_NEEDED,
    };
    middleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
    expect(store.dispatch).not.toBeCalledWith(
      dataFetchActions.fetch({
        name: 'getCampaignsList',
        args: {},
      })
    );
  });
  it('does not fetch campaigns if user has org switcher feature', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({
        campaignsList: { ...initialState, campaigns: [] },
        user: { hasCampaignsFeature: true, hasOrgSwitcherFeature: true },
      }),
    };
    const action = {
      type: actionTypes.FETCH_CAMPAIGNS_IF_NEEDED,
    };
    middleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
    expect(store.dispatch).not.toBeCalledWith(
      dataFetchActions.fetch({
        name: 'getCampaignsList',
        args: {},
      })
    );
  });
  it('triggers a notification if there is an error fetching campaigns', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({ campaignsList: initialState }),
    };
    const RPC_NAME = 'getCampaignsList';
    const action = dataFetchActions.fetchFail({
      name: RPC_NAME,
      error: 'There was an error getting the campaigns!',
    });
    middleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
    expect(store.dispatch).toBeCalledWith(
      expect.objectContaining({
        type: notificationActionTypes.CREATE_NOTIFICATION,
        notificationType: 'error',
        message: 'There was an error getting the campaigns!',
      })
    );
  });
});
