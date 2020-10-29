import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('EMAIL_PREFERENCES', {
  TOGGLE_NOTIFICATIONS: 0,
});

export const initialState = {
  collaboration: null,
  queue: null,
  newsletter: null,
  milestones: null,
  postFailure: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        ...action.result.hasEmailNotifications,
      };
    case `setNotifications_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        ...action.args.notifications,
      };
    case `setNotifications_${dataFetchActionTypes.FETCH_FAIL}`: {
      const rollbackState = {};
      Object.keys(action.args.notifications).map(type => {
        rollbackState[type] = !action.args.notifications[type];
        return null;
      });
      return {
        ...state,
        ...rollbackState,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  handleToggleClick: notifications => ({
    type: actionTypes.TOGGLE_NOTIFICATIONS,
    notifications,
  }),
};
