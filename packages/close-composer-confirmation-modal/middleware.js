import { actions as queueActions } from '@bufferapp/publish-queue/reducer';
import { actions as draftsActions } from '@bufferapp/publish-drafts/reducer';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
import { actions as storiesActions } from '@bufferapp/publish-stories/reducer';
import { actions as remindersActions } from '@bufferapp/publish-past-reminders/reducer';
import { actions as storyGroupComposerActions } from '@bufferapp/publish-story-group-composer/reducer';
import { actionTypes } from './reducer';

export default ({ dispatch, getState }) => next => action => {
  next(action);
  const { tabId } = getState().tabs;

  switch (action.type) {
    case actionTypes.CLOSE_COMPOSER_AND_CONFIRMATION_MODAL:
      switch (tabId) {
        case 'stories':
          dispatch(storyGroupComposerActions.resetStoryGroupState());
          dispatch(storiesActions.handleCloseStoriesComposer());
          break;
        case 'pastReminders':
          dispatch(storyGroupComposerActions.resetStoryGroupState());
          dispatch(remindersActions.handleCloseStoriesComposer());
          break;
        case 'queue':
          dispatch(queueActions.handleComposerCreateSuccess());
          break;
        case 'drafts':
        case 'awaitingApproval':
          dispatch(draftsActions.handleComposerCreateSuccess());
          break;
        default:
          break;
      }
      dispatch(modalsActions.hideCloseComposerConfirmationModal());
      break;
    default:
      break;
  }
};
