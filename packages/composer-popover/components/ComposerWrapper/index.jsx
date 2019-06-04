import React from 'react';
import { connect } from 'react-redux';
import { bufferPublishComposer as Composer } from '@bufferapp/publish-composer';

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
            post: state.sent.byProfileId[selectedProfileId].posts[postId],
          };
          break;
        case 'pastReminders':
          options = {
            editMode: state.pastReminders.editMode,
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
        ...options,
      });
    }
    return {};
  },
  dispatch => ({
    onEvent: (type, data) => {
      dispatch({ type: 'COMPOSER_EVENT', eventType: type, data });
    },
  }),
)(ComposerWrapper);
