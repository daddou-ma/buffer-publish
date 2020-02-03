import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const initialState = {
  enabledApplicationModes: [],
  remindersStatusByProfile: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `enabledApplicationModes_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        enabledApplicationModes: action.result.enabledApplicationModes,
      };
    case `checkRemindersStatus_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        remindersStatusByProfile: action.result && action.result.profiles,
      };

    case `awesomeToProUpgradeDetails${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        awesomeToProUpgradeDetails:
          action.result &&
          action.result.success &&
          action.result.details.shouldShow &&
          action.result.details.noticeHtml,
      };

    default:
      return state;
  }
};

export const actions = {
  userReadMessage: ({ message }) => ({
    type: dateFetchActionTypes.SELECT_PREMIUM_PLAN,
    args: {
      selectedPremiumPlan: selectedPlan,
    },
  }),
};
