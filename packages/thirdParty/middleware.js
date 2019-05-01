import {
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch'
import { actionTypes } from './reducer';

export default ({ dispatch, getState }) => next => action => {
  next(action)
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch({ type: actionTypes.FULLSTORY, result: action.result });
      dispatch({ type: actionTypes.APPCUES, result: action.result });
      break
    case actionTypes.FULLSTORY:
      if (window) {
        if (window.FS && window.FS.identify) {
          const {
            id,
          } = action.result
          const {
            productFeatures: { planName },
          } = getState()
          window.FS.identify(id, {
            pricingPlan_str: planName,
          });
        }
      }
      break;
    case actionTypes.APPCUES:
      if (window) {
        if (window.Appcues) {
          const {
            id,
            createdAt,
            plan,
            planCode,
            trial,
            is_business_user: isBusinessUser,
          } = action.result

          if (isBusinessUser) {
            dispatch({
              type: actionTypes.APPCUES_LOADED,
              loaded: true,
            });
            window.Appcues.identify(id, {
              name: id, // current user's name
              createdAt, // Unix timestamp of user signup date
              plan, // Current user’s plan type
              planCode, // Current user’s plan tier
              onTrial: trial.onTrial,
              trialLength: trial.trialLength,
              trialTimeRemaining: trial.trialTimeRemaining,
            })
          }
        }
      }
      break;
    default:
      break
  }
}
