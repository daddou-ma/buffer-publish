import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';
import { actionTypes as orgActionTypes } from '@bufferapp/publish-data-organizations';

import { actions } from './reducer';

export default ({ getState, dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    /*  Profile nav needs both profile selected and org selected data to get right permissions.
        If when the org is selected there's no selected profile yet,
        we generate the profile tabs on select profile. And vice versa.
        Once channels are part of organizations we no longer need 2 cases, just one.
    */
    case profileActionTypes.SELECT_PROFILE: {
      const { selected } = getState().organizations || {};
      const { profile } = action;
      if (selected) {
        dispatch(
          actions.generateProfileTabs({ profile, organization: selected })
        );
      }

      break;
    }

    case orgActionTypes.ORGANIZATION_SELECTED: {
      const profile = getState().profileSidebar?.selectedProfile || {};
      const { selected } = action;

      if (Object.keys(profile).length > 0) {
        dispatch(
          actions.generateProfileTabs({ profile, organization: selected })
        );
      }
      break;
    }

    default:
      break;
  }
};
