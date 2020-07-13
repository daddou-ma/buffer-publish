import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actions as modalActions } from '@bufferapp/publish-modals/reducer';
import { actions as trialActions } from '@bufferapp/publish-trial/reducer';
import { actionTypes } from './reducer';

export default ({ dispatch }) => next => action => {
  // eslint-disable-line
  next(action);
  switch (action.type) {
    case actionTypes.IG_FIRST_COMMENT_PRO_TRIAL:
      dispatch(
        trialActions.handleStartProTrial({
          source: 'ig_first_comment',
        })
      );
      break;
    case `startTrial_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      dispatch(modalActions.hideInstagramFirstCommentProTrialModal());
      // focus instagram first comment text area after starting trial
      const textareaElement = document.querySelector(
        "[class^='Composer__expandedFirstComment']"
      );
      if (textareaElement) textareaElement.focus();
      break;
    }
    default:
      break;
  }
};
