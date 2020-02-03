import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';

export default ({ dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(
        dataFetchActions.fetch({
          name: 'enabledApplicationModes',
          args: {
            comprehensive: true,
          },
        })
      );
      if (action.result.features.includes('awesome_pro_forced_upgrade_batch_1')) {// TODO: update to correct feature name
        dispatch(
          dataFetchActions.fetch({
            name: 'awesomeToProUpgradeDetails',
          })
        );
      }
      break;

    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const profilesArray = action.result;
      // Only makes request to check reminders if there are instagram profiles.
      const hasAtLeastOneIGProfile =
        profilesArray &&
        profilesArray.some(
          profile => profile.type && profile.type === 'instagram'
        );

      if (hasAtLeastOneIGProfile) {
        dispatch(
          dataFetchActions.fetch({
            name: 'checkRemindersStatus',
          })
        );
      }

      break;
    }

    default:
      break;
  }
};
