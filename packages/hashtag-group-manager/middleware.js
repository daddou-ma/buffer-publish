import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actionTypes } from './reducer';

const refreshHashtagGroups = (dispatch, organizationId) => {
  if (organizationId) {
    dispatch(dataFetchActions.fetch({
      name: 'hashtagGroups',
      args: {
        organizationId,
      },
    }));
  }
};

export default ({ getState, dispatch }) => next => (action) => {
  next(action);
  const { organizationId } = getState().profileSidebar.selectedProfile;
  switch (action.type) {
    case actionTypes.CANCEL_HASHTAG_GROUP:
      //
      break;
    case actionTypes.SAVE_HASHTAG_GROUP:
      const { name, text } = getState().hashtagGroups;
      dispatch(dataFetchActions.fetch({
        name: 'createHashtagGroup',
        args: {
          organizationId,
          name,
          text,
        },
      }));
      break;
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `createHashtagGroup_${dataFetchActionTypes.FETCH_SUCCESS}`:
      refreshHashtagGroups(dispatch, organizationId);
      break;
    default:
      break;
  }
};
