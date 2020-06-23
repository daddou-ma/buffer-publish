import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { getSelectedOrganization, mapSelectedOrganization } from './utils';
import { actionTypes } from './reducer';

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
        type: 'ORGANIZATIONS_INITIALIZED',
        organizations,
        selectedOrganization: getSelectedOrganization(organizations),
      });
      break;
    }

    case 'ORGANIZATIONS_INITIALIZED': {
      dispatch({
        type: 'ORGANIZATION_SELECTED',
        organizations: action?.organizations,
        selected: action?.selectedOrganization,
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

      const list = mapSelectedOrganization({
        id: organizationId,
        organizations: getState().organizations.list,
      });
      const selected = getSelectedOrganization(list);

      dispatch({
        type: 'ORGANIZATION_SELECTED',
        organizations: list,
        selected,
      });
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
