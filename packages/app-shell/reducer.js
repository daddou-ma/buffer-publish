// import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

// export const actionTypes = keyWrapper('APP_SHELL', {

// });

export const initialState = {
  showReturnToClassic: false,
  showUpgradeToPro: false,
  user: {
    name: '...',
    email: null,
    avatar: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        user: {
          email: action.result.email,
          name: action.result.name,
          // We don't pass an `avatar` so it will try to get their Gravatar
        },
        showReturnToClassic: action.result.showReturnToClassic,
        showUpgradeToPro: action.result.is_free_user,
        showManageTeam: !action.result.is_free_user,
      };
    default:
      return state;
  }
};
