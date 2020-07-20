import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';

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

    case actionTypes.SET_CURRENT_ORGANIZATION: {
      const {
        organizations: { list, selected },
      } = getState();
      const { organizationId } = action;
      const listMapped = mapSelectedOrganization({
        id: organizationId,
        organizations: list,
      });
      const selectedOrg = getSelectedOrganization(listMapped);

      // Select the org
      dispatch({
        type: actionTypes.ORGANIZATION_SELECTED,
        organizations: listMapped,
        selected: selectedOrg,
      });

      // Track the event
      dispatch(
        analyticsActions.trackEvent('Organization Switched', {
          organizationId: selected.globalOrgId,
          publishOrganizationSwitchedTo: organizationId,
          publishOrganizationSwitchedFrom: selected.id,
        })
      );

      // Save current org preference
      dispatch(
        dataFetchActions.fetch({
          name: 'setCurrentOrganization',
          args: {
            organizationId,
          },
        })
      );
      break;
    }

    // Temporarily dispatch user data, to inject new org data in it. To be removed after org_switcher rollout
    case `setCurrentOrganization_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch({ type: 'INIT_USER' });
      break;

    case `setCurrentOrganization_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'error',
          message: action.error,
        })
      );
      break;
    default:
      break;
  }
};
