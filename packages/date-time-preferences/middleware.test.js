import { actions as fetchActions } from '@bufferapp/async-data-fetch';
import actions from './actions';
import middleware from './middleware';

describe('middleware', () => {
  const RPC_NAME = 'changeDateTimePreferences';
  const next = jest.fn();
  const dispatch = jest.fn();
  const store = {
    dispatch,
  };
  it('should call changeDateTimePreferences when changing the hourly format to 12h', () => {
    const useTwentyFourHourFormat = false;
    const action = actions.changeTwentyFourHourFormat(useTwentyFourHourFormat);
    middleware(store)(next)(action);
    expect(dispatch).toHaveBeenCalledWith(
      fetchActions.fetch({
        name: 'changeDateTimePreferences',
        args: {
          twentyfour_hour_time: useTwentyFourHourFormat,
        },
      })
    );
  });

  it('should call changeDateTimePreferences when changing the start of week from Sunday to Monday', () => {
    const startOnMonday = true;
    const action = actions.changeStartOfWeek(startOnMonday);
    middleware(store)(next)(action);
    expect(dispatch).toHaveBeenCalledWith(
      fetchActions.fetch({
        name: 'changeDateTimePreferences',
        args: {
          week_starts_monday: startOnMonday,
        },
      })
    );
  });

  it('should send a success notifications when preferences are saved', () => {
    const action = fetchActions.fetchSuccess({
      name: RPC_NAME,
    });
    middleware(store)(next)(action);
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Great! Your preferences have been saved',
      })
    );
  });

  it('always propagates the action', () => {
    const action = {};
    middleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
