import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actionTypes as notificationActionTypes } from '@bufferapp/notifications';
import middleware from './middleware';
import { actionTypes, initialState } from './reducer';

describe('middleware', () => {
  const next = jest.fn();

  it('exports middleware', () => {
    expect(middleware).toBeDefined();
  });

  it('fetches getCampaign when FETCH_CAMPAIGN', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({ campaignView: initialState }),
    };
    const action = {
      type: actionTypes.FETCH_CAMPAIGN,
      campaignId: 'id1',
      past: null,
      fullItems: true,
    };
    middleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
    expect(store.dispatch).toBeCalledWith(
      dataFetchActions.fetch({
        name: 'getCampaign',
        args: {
          campaignId: 'id1',
          past: false,
          fullItems: true,
        },
      })
    );
  });
  it('triggers a notification if there is an error fetching campaign', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({ campaignView: initialState }),
    };
    const RPC_NAME = 'getCampaign';
    const action = dataFetchActions.fetchFail({
      name: RPC_NAME,
      error: 'There was an error getting the campaign!',
    });
    middleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
    expect(store.dispatch).toBeCalledWith(
      expect.objectContaining({
        type: notificationActionTypes.CREATE_NOTIFICATION,
        notificationType: 'error',
        message: 'There was an error getting the campaign!',
      })
    );
  });
});
