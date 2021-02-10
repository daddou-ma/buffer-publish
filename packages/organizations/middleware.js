import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { LOCATION_CHANGE } from 'connected-react-router';
import getOrgIdFromRoute from '@bufferapp/publish-app-pages/utils/getOrgIdFromRoute';

import { actions, actionTypes } from './reducer';

function selectOrganizationIfOrganizationRouteHasChanged(
  pathname,
  profiles,
  organizations,
  dispatch
) {
  const routeOrgId = getOrgIdFromRoute({
    currentPath: pathname,
    profiles,
  });
  if (
    routeOrgId &&
    routeOrgId !== organizations.selected &&
    organizations.list?.length
  ) {
    dispatch(actions.setCurrentOrganization(routeOrgId));
  }
};
export default ({ dispatch, getState }) => next => action => {
  next(action);
  switch (action.type) {
    case LOCATION_CHANGE: {
      const pathname = action.payload.location.pathname;
      const profiles = getState().profileSidebar.profiles;
      const organizations = getState().organizations;
      selectOrganizationIfOrganizationRouteHasChanged(
        pathname,
        profiles,
        organizations,
        dispatch
      );
      break;
    }
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const pathname = getState().router.location.pathname;
      const profiles = action.result;
      const organizations = getState().organizations;
      selectOrganizationIfOrganizationRouteHasChanged(
        pathname,
        profiles,
        organizations,
        dispatch
      );
      break;
    }
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
    case actionTypes.SET_CURRENT_ORGANIZATION: {
      const { list } = getState().organizations || [];
      const { organizationId } = action;
      const selectedOrg = list?.filter(org => org.id === organizationId)[0];
      // Select the org
      dispatch({
        type: actionTypes.ORGANIZATION_SELECTED,
        selected: selectedOrg,
      });
      break;
    }
    default:
      break;
  }
};
