import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import {
  actionTypes as modalsActionTypes,
  actions as modalActions,
} from '@bufferapp/publish-modals/reducer';
import { actions as trialActions } from '@bufferapp/publish-trial/reducer';
import { trackAction } from '@bufferapp/publish-data-tracking';
import { actionTypes } from './reducer';

export default ({ dispatch, getState }) => next => action => {
  // eslint-disable-line
  next(action);
  switch (action.type) {
    case actionTypes.IG_FIRST_COMMENT_PRO_TRIAL:
      dispatch(
        trialActions.handleStartProTrial({
          source: 'ig_first_comment',
        })
      );
      trackAction({
        location: 'MODALS',
        action: 'start_pro_trial',
        metadata: { source: 'ig_first_comment_toggle' },
      });
      break;
    case `startTrial_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      dispatch(modalActions.hideInstagramFirstCommentProTrialModal());
      break;
    }
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      if (getState().trial.startedTrial) {
        // focus instagram first comment text area after starting trial
        const textareaElement = document.querySelector(
          "[class^='Composer__expandedFirstComment']"
        );
        if (textareaElement) textareaElement.focus();
      }
      break;
    }
    case modalsActionTypes.SHOW_INSTAGRAM_FIRST_COMMENT_PRO_TRIAL_MODAL: {
      trackAction({
        location: 'MODALS',
        action: 'show_start_pro_trial',
        metadata: { source: action.source },
      });
      break;
    }
    case modalsActionTypes.HIDE_INSTAGRAM_FIRST_COMMENT_PRO_TRIAL_MODAL: {
      trackAction({
        location: 'MODALS',
        action: 'hide_start_pro_trial',
        metadata: { source: 'ig_first_comment_toggle' },
      });
      break;
    }
    default:
      break;
  }
};
