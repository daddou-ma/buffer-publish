import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actionTypes as notificationActionTypes } from '@bufferapp/notifications';
import middleware from './middleware';
import { actionTypes, initialState } from './reducer';

describe('middleware', () => {
  const next = jest.fn();

  it('exports middleware', () => {
    expect(middleware).toBeDefined();
  });

  it('fetches getCampaignsList when FETCH_CAMPAIGNS', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({ campaignsList: initialState }),
    };
    const action = {
      type: actionTypes.FETCH_CAMPAIGNS,
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
  it('triggers a notification if there is an error fetching campaigns', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({ campaignsList: initialState }),
    };
    const RPC_NAME = 'getCampaignsList';
    const action = dataFetchActions.fetchFail({
      name: RPC_NAME,
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
