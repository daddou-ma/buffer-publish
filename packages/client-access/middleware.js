import { getURL } from '@bufferapp/publish-formatters';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';

import {
  actions as asyncDataFetch,
} from '@bufferapp/async-data-fetch';
import { actionTypes } from './reducer';

export default ({ dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case 'APP_INIT':
      dispatch(asyncDataFetch.fetch({
        name: 'clientAccess',
        args: {
          profileId: action.profileId,
        },
      }));
      break;
    default:
      break;
  }
};
