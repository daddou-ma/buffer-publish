import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { getSelectedOrganization, mapSelectedOrganization } from './utils';

export default ({ dispatch, getState }) => next => action => {
  next(action);
  switch (action.type) {
    case 'INIT_ORGANIZATIONS':
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
    case `SELECT_ORGANIZATION`: {
      const list = mapSelectedOrganization({
        id: action.id,
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
    default:
      break;
  }
};
