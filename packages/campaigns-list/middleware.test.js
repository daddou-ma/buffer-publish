import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actionTypes as notificationActionTypes } from '@bufferapp/notifications';
import { actionTypes as orgActionTypes } from '@bufferapp/publish-data-organizations';
import middleware from './middleware';
import { initialState } from './reducer';

describe('middleware', () => {
  const next = jest.fn();
  const orgSelectedAction = {
    type: orgActionTypes.ORGANIZATION_SELECTED,
    selected: { globalOrgId: '123', hasCampaignsFeature: true },
  };
  it('exports middleware', () => {
    expect(middleware).toBeDefined();
  });

  it('fetches getCampaignsList if org is selected and has campaign feature', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({
        campaignsList: initialState,
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
