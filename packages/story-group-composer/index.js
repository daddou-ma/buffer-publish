import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { actions as previewActions } from '@bufferapp/publish-story-preview';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import { SEGMENT_NAMES, CLIENT_NAME } from '@bufferapp/publish-constants';
import getCtaProperties from '@bufferapp/publish-analytics-middleware/utils/CtaStrings';
import uuid from 'uuid/v4';
import { getCounts } from './utils/Tracking';
import { actions } from './reducer';
import StoryGroupPopover from './components/StoryGroupPopover';

export default connect(
  (state) => {
    const { editingPostId, emptySlotData } = state.stories;

    return {
      uses24hTime: state.appSidebar.user.uses_24h_time,
      timezone: state.profileSidebar.selectedProfile.timezone,
      weekStartsMonday: state.appSidebar.user.week_starts_monday,
      selectedProfile: state.profileSidebar.selectedProfile,
      translations: state.i18n.translations['story-group-composer'],
      isScheduleLoading: state.storyGroupComposer.isScheduleLoading,
      storyGroup: state.storyGroupComposer.storyGroup,
      showStoryPreview: state.storyGroupComposer.showStoryPreview,
      editMode: !!editingPostId,
      userData: state.appSidebar.user,
      editingPostId,
      errorMessages: state.storyGroupComposer.errors,
      emptySlotData,
      maxStories: state.storyGroupComposer.maxStories,
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
      dispatch(actions.trackNote({
        cta: SEGMENT_NAMES.STORIES_COMPOSER_ADD_NOTE,
        note,
        order,
      }));
      dispatch(actions.handleSaveStoryNote({ note, order }));
    },
    onPreviewClick: ({
      stories, profileId, id, scheduledAt, serviceId,
    }) => {
      const ctaProperties = getCtaProperties(SEGMENT_NAMES.STORIES_PREVIEW_COMPOSER);
      const counts = getCounts(stories);

      const metadata = {
        clientName: CLIENT_NAME,
        storyGroupId: id,
        channel: 'instagram',
        channelId: profileId,
        channelServiceId: serviceId,
        scheduledAt: scheduledAt ? JSON.stringify(scheduledAt) : undefined,
        ...counts,
        ...ctaProperties,
      };
      dispatch(analyticsActions.trackEvent('Story Group Previewed', metadata));
      dispatch(previewActions.handlePreviewClick({
        stories, profileId, id, scheduledAt,
      }));
      dispatch(actions.handlePreviewClick());
    },
    onClosePreviewClick: () => {
      dispatch(actions.handleClosePreviewClick());
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
      dispatch(actions.updateStoryUploadProgress({
        id, uploaderInstance, progress, file, complete,
      }));
      actions.updateStoryPogress(dispatch);
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
    onDropCard: (cardSource, cardTarget, end = false) => {
      if (end) {
        dispatch(actions.trackDroppedCard(cardSource, cardTarget));
      } else {
        dispatch(actions.onDropCard(cardSource, cardTarget));
      }
    },
    onDeleteStory: (storyCard) => {
      dispatch(actions.deleteStory(storyCard));
    },
    onRemoveNotifications: () => {
      dispatch(actions.hideError());
    },
    onShowErrorNotification: ({ message }) => {
      dispatch(actions.showError({ message }));
    },
  }),
)(StoryGroupPopover);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
