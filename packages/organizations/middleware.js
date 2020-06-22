import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { push } from 'connected-react-router';
import { profilePages } from '@bufferapp/publish-routes';
import { actions as profileActions } from '@bufferapp/publish-profile-sidebar';

import { actionTypes } from './reducer';
import { getSelectedOrganization, mapSelectedOrganization } from './utils';

export default ({ dispatch, getState }) => next => action => {
  next(action);
  switch (action.type) {
    case 'INIT_ORGANIZATIONS': {
      if (
        typeof window !== 'undefined' &&
        typeof window.bufferData !== 'undefined' &&
        typeof window.bufferData.organizations !== 'undefined' &&
        window.bufferData.organizations
      ) {
        dispatch(
          dataFetchActions.fetchSuccess({
            name: 'organizations',
            result: [...window.bufferData.organizations],
          })
        );
        // make sure we only bootstrap this data once
        window.bufferData.organizations = undefined;
      } else {
        dispatch(
          dataFetchActions.fetch({
            name: 'organizations',
          })
        );
      }
      break;
    }

    case `organizations_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const organizations = action.result;

      dispatch({
        type: actionTypes.INITIALIZED,
        organizations,
        selectedOrganization: getSelectedOrganization(organizations),
      });
      break;
    }

    case actionTypes.INITIALIZED: {
      dispatch({
        type: actionTypes.ORGANIZATION_SELECTED,
        organizations: action?.organizations,
        selected: action?.selectedOrganization,
      });
      break;
    }

    case actionTypes.SELECT_ORGANIZATION: {
      const list = mapSelectedOrganization({
        id: action.id,
        organizations: getState().organizations.list,
      });
      const selected = getSelectedOrganization(list);

      dispatch({
        type: actionTypes.ORGANIZATION_SELECTED,
        organizations: list,
        selected,
      });

      const { publishProfiles } = getState();
      const profilesInOrganization = publishProfiles.filter(
        p => p.organizationId === action.id
      );
      const firstProfileInOrganization = profilesInOrganization[0];
      const newPath = profilePages.getRoute({
        profileId: firstProfileInOrganization.id,
      });
      dispatch(push(newPath));
      dispatch(
        profileActions.selectProfile({ profile: firstProfileInOrganization })
      );

      break;
    }

    default:
      break;
  }
};
