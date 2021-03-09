import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';

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
    case actionTypes.SET_CURRENT_ORGANIZATION: {
      const { list = [], selected } = getState().organizations;
      const { organizationId } = action;
      if (selected?.id !== organizationId) {
        const selectedOrg = list?.filter(org => org.id === organizationId)[0];
        // Select the org
        dispatch({
          type: actionTypes.ORGANIZATION_SELECTED,
          selected: selectedOrg,
        });
      }

      break;
    }
    default:
      break;
  }
};
