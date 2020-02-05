import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

import keyWrapper from '@bufferapp/keywrapper';

export const initialState = {
  enabledApplicationModes: [],
  remindersStatusByProfile: [],
  awesomeToProUpgradeDetails: '',
};

export const actionTypes = keyWrapper('TEMPORARY_BANNER', {
  USER_READ_MESSAGE: 0,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `enabledApplicationModes_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        enabledApplicationModes: action.result.enabledApplicationModes,
      };
    case `awesomeToProUpgradeDetails_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        awesomeToProUpgradeDetails:
          action.result &&
          action.result.success &&
          action.result.details.shouldShow &&
          action.result.details.noticeHtml,
        awesomeToProMessageKey:
          action.result &&
          action.result.success &&
          action.result.details.bannerMessageKey,
      };
    case `checkRemindersStatus_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        remindersStatusByProfile: action.result && action.result.profiles,
      };

    default:
      return state;
  }
};

export const actions = {
  userReadMessage: message => ({
    type: actionTypes.USER_READ_MESSAGE,
    args: {
      message,
    },
  }),
};
