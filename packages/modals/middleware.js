import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actions } from './reducer';
import {
  shouldShowUpgradeModal,
  shouldShowWelcomeModal,
  getSourceFromKey,
  shouldShowStealProfileModal,
  shouldShowInstagramDirectPostingModal,
  shouldShowWelcomeModalPaidUsers,
  getShowModalValue,
} from './util/showModal';

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case 'APP_INIT': {
      if (shouldShowUpgradeModal()) {
        dispatch(actions.showUpgradeModal({ source: getSourceFromKey() }));
      }
      if (shouldShowWelcomeModal()) {
        dispatch(actions.showWelcomeModal());
      }
      if (shouldShowStealProfileModal()) {
        dispatch(actions.showStealProfileModal({ stealProfileUsername: getShowModalValue() }));
      }
      if (shouldShowInstagramDirectPostingModal()) {
        dispatch(actions.showInstagramDirectPostingModal());
      }
      if (shouldShowWelcomeModalPaidUsers()) {
        dispatch(actions.showWelcomePaidModal());
      }
      break;
    }
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`:
      if (action.result && action.result.some(profile => profile.isDisconnected)) {
        dispatch(actions.showProfilesDisconnectedModal());
      }
      break;
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const message = 'welcome_to_business_modal';
      const { productFeatures: { planName } } = getState();
      const { messages: readMessages, trial } = action.result; // user
      const hasNotReadWelcomeMessage = readMessages && !readMessages.includes(message);
      const isOnBusinessTrial = planName === 'business' && trial.onTrial;
      if (isOnBusinessTrial && hasNotReadWelcomeMessage) {
        dispatch(actions.showWelcomeB4BTrialModal());
        // Mark modal as seen
        dispatch(dataFetchActions.fetch({ name: 'readMessage', args: { message } }));
      }
      break;
    }
    case 'COMPOSER_EVENT':
      if (action.eventType === 'show-upgrade-modal') {
        dispatch(actions.showUpgradeModal({ source: 'queue_limit' }));
      }
      break;
    default:
      break;
  }
};
