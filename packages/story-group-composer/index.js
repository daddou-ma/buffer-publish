import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import uuid from 'uuid/v4';
import { actions } from './reducer';
import StoryGroupPopover from './components/StoryGroupPopover';

export default connect(
  (state) => {
    const { selectedProfileId } = state.profileSidebar;
    const currentProfile = state.stories.byProfileId[selectedProfileId];
    const { editingPostId } = state.stories;
    const editingStoryGroup = editingPostId ? currentProfile.storyPosts[editingPostId] : null;

    return {
      uses24hTime: state.appSidebar.user.uses_24h_time,
      timezone: state.profileSidebar.selectedProfile.timezone,
      weekStartsMonday: state.appSidebar.user.week_starts_monday,
      selectedProfile: state.profileSidebar.selectedProfile,
      translations: state.i18n.translations['story-group-composer'],
      isScheduleLoading: state.storyGroupComposer.isScheduleLoading,
      showDatePicker: state.storyGroupComposer.showDatePicker,
      draft: state.storyGroupComposer.draft,
      userData: state.appSidebar.user,
      editingPostId,
      editingStoryGroup,
    };
  },
  dispatch => ({
    onOverlayClick: () => {
      dispatch(modalsActions.showCloseComposerConfirmationModal());
    },
    onCreateStoryGroup: (scheduledAt) => {
      dispatch(actions.setScheduleLoading(true));
      dispatch(actions.handleSaveStoryGroup(scheduledAt));
    },
    onUpdateStoryGroup: ({ scheduledAt, stories, storyGroupId }) => {
      dispatch(actions.setScheduleLoading(true));
      dispatch(actions.handleUpdateStoryGroup({ scheduledAt, stories, storyGroupId }));
    },
    saveNote: ({ note, order }) => {
      dispatch(actions.handleSaveStoryNote({ note, order }));
    },
    onSetShowDatePicker: (showDatePicker) => {
      dispatch(actions.setShowDatePicker(showDatePicker));
    },
    onComposerClick: (showDatePicker) => {
      if (showDatePicker) dispatch(actions.setShowDatePicker(false));
    },
    onCreateNewStoryCard: ({ id, uploaderInstance, file }) => {
      dispatch(actions.createNewStoryCard({ id, uploaderInstance, file }));
    },
    onVideoUploadProcessingStarted: ({
      id, uploaderInstance, uploadId, fileExtension, file, progress, contentType,
    }) => {
      dispatch(actions.videoUploadProcessingStarted({
        id, uploaderInstance, uploadId, fileExtension, file, progress, contentType,
      }));
    },
    onUploadDraftFile: ({
      userData,
      videoProcessingComplete,
    }) => (id, file, uploadType, notifiers, createFileUploaderCallback) => {
      const uploadTrackingId = uuid();
      const {
        id: userId,
        s3_upload_signature: s3Signature,
        imageDimensionsKey,
      } = userData;

      const uploadDraftFileCallback = createFileUploaderCallback({
        s3UploadSignature: {
          algorithm: s3Signature.algorithm,
          base64Policy: s3Signature.base64policy,
          bucket: s3Signature.bucket,
          credentials: s3Signature.credentials,
          date: s3Signature.date,
          expires: s3Signature.expires,
          signature: s3Signature.signature,
          successActionStatus: s3Signature.success_action_status,
        },
        userId,
        csrfToken: null,
        imageDimensionsKey,
        serverNotifiers: {
          videoProcessed: processedVideoMeta => videoProcessingComplete(processedVideoMeta),
          profileGroupCreated: () => {},
          profileGroupUpdated: () => {},
          profileGroupDeleted: () => {},
        },
      });

      return uploadDraftFileCallback(uploadTrackingId, file, uploadType, notifiers);
    },
    onVideoUploadProcessingComplete: ({
      id,
      name,
      duration,
      durationMs,
      size,
      width,
      height,
      url,
      originalUrl,
      thumbnail,
      availableThumbnails,
      uploadId,
    }) => {
      dispatch(actions.videoUploadProcessingComplete({
        id,
        name,
        duration,
        durationMs,
        size,
        width,
        height,
        url,
        originalUrl,
        thumbnail,
        availableThumbnails,
        uploadId,
      }));
    },
    onUpdateStoryUploadProgress: ({
      id, uploaderInstance, progress, file, complete,
    }) => {
      if (!complete) {
        dispatch(actions.updateStoryUploadProgress({
          id, uploaderInstance, progress, file, complete,
        }));
      } else {
        setTimeout(() => {
          dispatch(actions.updateStoryUploadProgress({
            id, uploaderInstance, progress, file, complete,
          }));
        }, 500);
      }
    },
    onMonitorUpdateProgress: updateUploadProgress => async ({ id, uploaderInstance, file }) => {
      const progressIterator = uploaderInstance.getProgressIterator();
      let item;

      while (!(item = progressIterator.next()).done) { // eslint-disable-line no-cond-assign
        const promisedProgress = item.value;

        await promisedProgress.then(progress => // eslint-disable-line no-await-in-loop
          updateUploadProgress({
            id, uploaderInstance, progress, file, complete: false,
          }));
      }
      updateUploadProgress({
        id, uploaderInstance, file, complete: true, progress: 100,
      });
    },
    onUploadImageComplete: ({
      id,
      uploaderInstance,
      url,
      width,
      height,
      file,
      stillGifUrl,
      contentType,
    }) => {
      dispatch(actions.uploadImageComplete({
        id,
        uploaderInstance,
        url,
        width,
        height,
        file,
        stillGifUrl,
        contentType,
      }));
    },
    onDropCard: ({
      commit,
      cardLimit,
      dragIndex,
      hoverIndex,
    }) => {
      dispatch(actions.onDropCard({
        commit,
        cardLimit,
        dragIndex,
        hoverIndex,
      }));
    },
  }),
)(StoryGroupPopover);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
