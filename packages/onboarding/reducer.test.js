import { actions, actionTypes } from './reducer';

describe('actions', () => {
  it('button click triggers a CONNECT_SOCIAL_ACCOUNT action', () => {
    expect(actions.handleConnectSocialAccountClick()).toEqual({
      type: actionTypes.CONNECT_SOCIAL_ACCOUNT,
    });
  });
});
