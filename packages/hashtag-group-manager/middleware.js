import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actionTypes } from './reducer';

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
        name: 'createHashtag',
        args: {
          organizationId,
          name,
          text,
        },
      }));
      break;
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`:
      if (organizationId) {
        dispatch(dataFetchActions.fetch({
          name: 'hashtagGroups',
          args: {
            organizationId,
          },
        }));
      }
      break;
    default:
      break;
  }
};
