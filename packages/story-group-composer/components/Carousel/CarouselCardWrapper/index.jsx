import React, { useState } from 'react';
import { FileUploadFormatsConfigs } from '@bufferapp/publish-composer/composer/AppConstants';
import { Text, LoadingAnimation } from '@bufferapp/components';
import { CarouselCard, getCardSizes } from '@bufferapp/publish-shared-components/Carousel';
import UploadZone from '@bufferapp/publish-upload-zone';
import { Button } from '@bufferapp/ui';
import Attach from '@bufferapp/ui/Icon/Icons/Attach';
import FileUploader from '@bufferapp/publish-composer/composer/file-uploads/FileUploader';
import { UploadTypes } from '@bufferapp/publish-constants';
import CircularUploadIndicator
  from '@bufferapp/publish-composer/composer/components/progress-indicators/CircularUploadIndicator';
import PropTypes from 'prop-types';
import CarouselCardHover from '../CarouselCardHover';
import styles from './styles.css';

import { CoverImage, UploadingVideo, StoryWrapper } from './styles';
/**
 * Carousel on view mode, to display images in the queue
 * Carousel on edit mode, handling from the composer
 */
const CarouselCardWrapper = ({
  largeCards,
  userData,
  removeNotifications,
  notifyError,
  videoProcessingComplete,
  card,
  uploadDraftFile,
  updateUploadProgress,
  monitorUpdateProgress,
  createNewFile,
  createImageThumbnail,
  uploadImageComplete,
  videoProcessingStarted,
  maxAttachableMediaCount,
  onAddNoteClick,
  onDeleteStoryClick,
}) => {
  const { cardWidth, cardHeight } = getCardSizes(largeCards);
  const uploadFormatsConfig = new Map(FileUploadFormatsConfigs.MEDIA); // Clone config
  const [isHovering, setIsHovering] = useState(false);

  const notifiers = {
    uploadStarted: props => createNewFile(props),
    uploadedLinkThumbnail: props => createImageThumbnail(props),
    uploadedDraftImage: props => uploadImageComplete({ ...props, contentType: 'image' }),
    uploadedDraftVideo: props => videoProcessingStarted({ ...props, contentType: 'video' }),
    draftGifUploaded: props => uploadImageComplete({ ...props, contentType: 'gif' }),
    queueError: props => notifyError(props),
    monitorFileUploadProgress: monitorUpdateProgress(updateUploadProgress),
  };
  return (
    <CarouselCard
      key={card.uploadTrackingId}
      card={card}
      cardHeight={cardHeight}
      cardWidth={cardWidth}
      largeCards={largeCards}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {card.empty && (
      <div>
        <UploadZone
          uploadButton={({ onClick }) => (
            <Button
              type="primary"
              label="Add Media Files"
              icon={<Attach />}
              onClick={onClick}
            />
          )}
          classNames={styles}
          supportsMixedMediaTypes
          mixedMediaUnsupportedCallback={FileUploader.throwMixedMediaTypesError}
          uploadDraftFile={uploadDraftFile({ userData, videoProcessingComplete })}
          notifiers={notifiers}
          removeAllNotifications={removeNotifications}
          queueError={notifyError}
          draftId={`${card.order}`}
          uploadFormatsConfig={uploadFormatsConfig}
          service={{
            maxAttachableImagesCount: maxAttachableMediaCount,
            canHaveMediaAttachmentType: () => true,
          }}
          uploadType={UploadTypes.MEDIA}
          multiple
          disabled={false}
        />
      </div>
      )}
      {!card.empty && card.progress !== null && card.uploading && (
      <CircularUploadIndicator
        classNames={{ container: styles.container }}
        size={54}
        progress={card.progress}
        showText
        finishingUpText="Finishing Upload..."
      />
      )}

      {card.thumbnail_url && (
        <StoryWrapper>
          <CoverImage src={card.thumbnail_url} />
          {isHovering && (
            <CarouselCardHover
              card={card}
              onAddNoteClick={onAddNoteClick}
              onDeleteStoryClick={onDeleteStoryClick}
            />
          )}
        </StoryWrapper>
      )}

      {!card.empty && card.processing === true && (
      <UploadingVideo>
        <Text size="small">Processing video</Text>
        <LoadingAnimation marginTop="0" />
      </UploadingVideo>
      )}
    </CarouselCard>
  );
};

CarouselCardWrapper.propTypes = {
  largeCards: PropTypes.bool,
  userData: PropTypes.shape({
    id: PropTypes.string,
    s3_upload_signature: PropTypes.shape({
      algorithm: PropTypes.string,
      base64Policy: PropTypes.string,
      bucket: PropTypes.string,
      credentials: PropTypes.string,
      date: PropTypes.string,
      expires: PropTypes.string,
      signature: PropTypes.string,
      success_action_status: PropTypes.string,
    }).isRequired,
    imageDimensionsKey: PropTypes.string,
  }).isRequired,
  notifyError: PropTypes.func,
  removeNotifications: PropTypes.func,
  createNewFile: PropTypes.func,
  createImageThumbnail: PropTypes.func,
  updateUploadProgress: PropTypes.func,
  uploadImageComplete: PropTypes.func,
  videoProcessingStarted: PropTypes.func,
  videoProcessingComplete: PropTypes.func,
  uploadDraftFile: PropTypes.func,
  monitorUpdateProgress: PropTypes.func,
  ...CarouselCardHover.propTypes,
};

CarouselCardWrapper.defaultProps = {
  removeNotifications: () => console.log('removeAllNotifications', true),
  notifyError: ({ message }) => console.log('queueError', { message }),
  createNewFile: ({
    id,
    uploaderInstance,
    file,
  }) => console.log('uploadStarted - File Created', {
    id,
    uploaderInstance,
    file,
  }),
  createImageThumbnail: ({
    id, uploaderInstance, url, width, height, file,
  }) => console.log('uploadedLinkThumbnail - Create Image Thumbnail', {
    id, uploaderInstance, url, width, height, file,
  }),
  updateUploadProgress: ({
    id, uploaderInstance, progress, file, complete,
  }) => console.log('monitorFileUploadProgress - Update Upload Progress', {
    id, uploaderInstance, progress, file, complete,
  }),
  uploadImageComplete: ({
    id, uploaderInstance, url, location = null, width, height, file, stillGifUrl = null,
  }) => console.log('uploadedDraftImage - Image Upload Created', {
    id, uploaderInstance, url, location, width, height, file, stillGifUrl,
  }),
  videoProcessingStarted: ({
    id, uploaderInstance, uploadId, fileExtension, file,
  }) => console.log('uploadedDraftVideo - Video Processing Started', {
    id, uploaderInstance, uploadId, fileExtension, file,
  }),
  videoProcessingComplete: ({
    id,
    uploadId,
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
  }) => console.log('videoProcessed - Video Processing Complete', {
    id,
    uploadId,
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
  }),
  uploadDraftFile: ({ userData, videoProcessingComplete }) => console.log('uploadDraftFile', {
    userData,
    videoProcessingComplete,
  }),
  monitorUpdateProgress: () => console.log('monitorUploadProgress'),

  largeCards: false,
  editMode: false,
  totalCardsToShow: 15,
};

export default CarouselCardWrapper;
