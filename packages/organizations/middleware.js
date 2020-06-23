import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { organization } from '@bufferapp/publish-routes';
import { actions as notificationActions } from '@bufferapp/notifications';

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
      const { organizationId } = action;
      const list = mapSelectedOrganization({
        id: organizationId,
        organizations: getState().organizations.list,
      });
      const selected = getSelectedOrganization(list);

      dispatch(organization.goTo({ orgId: action.id }));
      dispatch({
        type: actionTypes.ORGANIZATION_SELECTED,
        organizations: list,
        selected,
      });

      break;
    }

    case actionTypes.SET_CURRENT_ORGANIZATION: {
      const { organizationId } = action;
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
