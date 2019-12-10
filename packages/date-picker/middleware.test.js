import { actions, actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes } from '@bufferapp/analyze-profile-selector';
import { actions as dateActions } from './reducer';
import middleware from './middleware';

describe('middleware', () => {
  let state = {};
  const next = jest.fn();
  const store = {
    dispatch: jest.fn(),
    getState: jest.fn(() => state),
  };

  const presets = [
    {
      name: '7 Days',
      label: 'Past 7 Days',
      range: 7,
      selected: false,
      disabled: false,
    },
    {
      name: 'Yesterday',
      label: 'Yesterday',
      range: 1,
      selected: true,
      disabled: false,
    },
  ];

  beforeEach(() => {
    state = {
      date: {
        historicData: {},
        presets,
      },
    };
  });

  it('should exist', () => {
    expect(middleware).toBeDefined();
  });

  it('should keep propagating the action through the chain', () => {
    const action = {
      type: 'TEST',
    };
    middleware(store)(next)(action);
  });

  it('should dispatch a data fetch for the minimum date with analytics available once a profile has been selected', () => {
    const action = {
      type: actionTypes.SELECT_PROFILE,
      profile: {
        id: '1235519asd',
      },
    };
    middleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledWith(actions.fetch({
      name: 'analytics_start_date',
      args: {
        profileId: '1235519asd',
      },
    }));
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should set the date range on user_FETCH_SUCCESS if there are start_date and end_date available as search parameters', () => {
    state.router = {
      location: {
        search: '?start_date=1234&end_date=5678',
      },
    };
    const action = {
      type: `user_${asyncDataFetchActionTypes.FETCH_SUCCESS}`,
    };
    middleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledWith(dateActions.setDateRange(1234, 5678));
  });

  afterEach(() => {
    store.dispatch.mockReset();
  });
});
