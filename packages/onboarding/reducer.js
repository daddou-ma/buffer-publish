import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('DEFAULT_PAGE', {
  CONNECT_SOCIAL_ACCOUNT: 0,
});

export const actions = {
  handleConnectSocialAccountClick: () => ({
    type: actionTypes.CONNECT_SOCIAL_ACCOUNT,
  }),
};
