import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('DISABLED_QUEUE', {
  CONNECT_SOCIAL_ACCOUNT: 0,
  MANAGE_SOCIAL_ACCOUNT: 0,
});

export const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const actions = {
  handleManageSocialAccountClick: () => ({
    type: actionTypes.MANAGE_SOCIAL_ACCOUNT,
  }),
  handleConnectSocialAccount: () => ({
    type: actionTypes.CONNECT_SOCIAL_ACCOUNT,
  }),
};
