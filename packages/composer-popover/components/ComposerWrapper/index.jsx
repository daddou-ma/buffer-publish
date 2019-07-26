import React from 'react';
import { connect } from 'react-redux';
import { bufferPublishComposer as Composer } from '@bufferapp/publish-composer';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { actions as trialActions } from '@bufferapp/publish-trial';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';

const ComposerWrapper = props => <Composer {...props} />;

ComposerWrapper.propTypes = Composer.propTypes;
ComposerWrapper.defaultProps = Composer.defaultProps;

export default connect(
  (state, ownProps) => {
    if (state.appSidebar && state.profileSidebar) {
      const type = ownProps.type;
      const selectedProfileId = state.profileSidebar.selectedProfileId;
      const postId = state[type].editingPostId;

      let options = {};

      switch (type) {
        case 'drafts':
          options = {
            editMode: state.drafts.editMode,
            post: state.drafts.byProfileId[selectedProfileId].drafts[postId],
            draftMode: state.drafts.draftMode,
          };
          break;
        case 'queue':
          options = {
            editMode: state.queue.editMode,
            emptySlotMode: state.queue.emptySlotMode,
            post: state.queue.emptySlotMode ? state.queue.emptySlotData :
              state.queue.byProfileId[selectedProfileId].posts[postId],
          };
          break;
        case 'sent':
          options = {
            editMode: state.sent.editMode,
            sentPost: true,
            post: state.sent.byProfileId[selectedProfileId].posts[postId],
          };
          break;
        case 'pastReminders':
          options = {
            editMode: state.pastReminders.editMode,
            sentPost: true,
            post: state.pastReminders.byProfileId[selectedProfileId].posts[postId],
          };
          break;
        default:
          return;
      }
      return ({
        userData: state.appSidebar.user,
        profiles: state.profileSidebar.profiles,
        enabledApplicationModes: state.enabledApplicationModes,
        environment: state.environment.environment,
        editMode: false,
        draftMode: null,
        selectedProfileId,
        tabId: state.tabs.tabId,
        ...options,
      });
    }
    return {};
  },
  dispatch => ({
    onEvent: (type, data) => {
      dispatch({ type: 'COMPOSER_EVENT', eventType: type, data });
    },
    onInteraction: ({ message }) => {
      switch (message.action) {
        case 'COMMENT_ENABLED':
          dispatch(modalsActions.showInstagramFirstCommentModal(message));
          break;
        case 'SHOW_IG_FIRST_COMMENT_PRO_TRIAL_MODAL':
          dispatch(modalsActions.showInstagramFirstCommentProTrialModal({ source: 'ig_first_comment_toggle' }));
          break;
        case 'SHOW_PRO_UPGRADE_MODAL':
          dispatch(modalsActions.showUpgradeModal({ source: 'ig_first_comment_toggle' }));
          break;
        case 'START_PRO_TRIAL':
          dispatch(trialActions.handleStartProTrial({
            scope: message.scope,
            source: message.source,
          }));
          break;
        case 'SEGMENT_TRACKING':
          dispatch(analyticsActions.trackEvent(message.event, message.metadata));
          break;
        default: break;
      }
    },
  }),
)(ComposerWrapper);
