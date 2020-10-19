import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';

import { actions } from './reducer';

export default ({ getState, dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case profileActionTypes.SELECT_PROFILE: {
      const { selected } = getState().organizations || {};
      const { profile } = action;
      dispatch(
        actions.generateProfileTabs({ profile, organization: selected })
      );
      break;
    }

    default:
      break;
  }
};
