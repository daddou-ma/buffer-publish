/* eslint-disable import/first */
jest.mock('@bufferapp/micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import changeDateTimePreferences from '.';

const accessToken = 'AN ACCESS TOKEN';
const session = {
  publish: {
    accessToken,
  },
};
const mockUser = {
  features: [],
  experiments: [],
  messages: [],
  plan: 'free',
  email_notifications: [],
  feature_trials: [],
  tags: [],
};
describe('rpc/changeDateTimePreferences', () => {
  beforeEach(() => {
    rp.mockReturnValue(
      Promise.resolve({
        user: mockUser,
      })
    );
  });
  it('sends over the preferences we want to update', async () => {
    await changeDateTimePreferences.fn(
      {
        week_starts_monday: true,
      },
      { session }
    );
    expect(rp.mock.calls[0][0].form.twentyfour_hour_time).toBe(undefined);
    expect(rp.mock.calls[0][0].form.week_starts_monday).toBeTruthy();

    await changeDateTimePreferences.fn(
      {
        twentyfour_hour_time: true,
      },
      { session }
    );
    expect(rp.mock.calls[1][0].form.twentyfour_hour_time).toBeTruthy();
    expect(rp.mock.calls[1][0].form.week_starts_monday).toBe(undefined);
  });

  it('parses server response as a user object', async () => {
    const response = await changeDateTimePreferences.fn(
      {
        week_starts_monday: true,
      },
      { session }
    );
    expect(response.is_free_user).toBeTruthy();
  });
});
