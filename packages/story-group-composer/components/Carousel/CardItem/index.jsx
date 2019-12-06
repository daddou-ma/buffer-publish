import React, { useState } from 'react';
import { CarouselCard } from '@bufferapp/publish-shared-components/Carousel';
import { Text, LoadingAnimation } from '@bufferapp/components';
import UploadZone from '@bufferapp/publish-upload-zone';
import { Button } from '@bufferapp/ui';
import PlusIcon from '@bufferapp/ui/Icon/Icons/Plus';
import FileUploader from '@bufferapp/publish-composer/composer/file-uploads/FileUploader';
import { UploadTypes } from '@bufferapp/publish-constants';
import CircularUploadIndicator from '@bufferapp/publish-composer/composer/components/progress-indicators/CircularUploadIndicator';
import { getLargeSafeImageUrl } from '@bufferapp/publish-story-group-composer/utils/SafeImage';
import PropTypes from 'prop-types';
import CarouselCardHover from '../CarouselCardHover';
import { carouselCardPropTypes } from '../../../utils/commonPropTypes';
import styles from './styles.css';

import { CoverImage, UploadingVideo, StoryWrapper, PlayIcon } from './styles';

class CardItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovering: false,
    };
  }

  setIsHovering = isHovering => {
    this.setState({ isHovering });
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { card, isOver, isDragging } = this.props;
    const {
      card: cardNext,
      isOver: isOverNext,
      isDragging: isDraggingNext,
    } = nextProps;

    const { isHovering } = this.state;
    const { isHovering: isHoveringNext } = nextState;

    if (
      card.empty !== cardNext.empty ||
      card.thumbnail_url !== cardNext.thumbnail_url ||
      card.progress !== cardNext.progress ||
      card.uploading !== cardNext.uploading ||
      isHovering !== isHoveringNext ||
      isOver !== isOverNext ||
      isDragging !== isDraggingNext
    ) {
      return true;
    }
    return false;
  }

  render() {
    const {
      card,
      cardHeight,
      cardWidth,
      userData,
      largeCards,
      uploadFormatsConfig,
      maxAttachableMediaCount,
      removeNotifications,
      notifyError,
      videoProcessingComplete,
      uploadDraftFile,
      updateUploadProgress,
      monitorUpdateProgress,
      createNewFile,
      createImageThumbnail,
      uploadImageComplete,
      videoProcessingStarted,
      onAddNoteClick,
      onDeleteStoryClick,
      isOver,
      isDragging,
      translations,
    } = this.props;
    const notifiers = {
      uploadStarted: props => createNewFile(props),
      uploadedLinkThumbnail: props => createImageThumbnail(props),
      uploadedDraftImage: props =>
        uploadImageComplete({ ...props, contentType: 'image' }),
      uploadedDraftVideo: props =>
        videoProcessingStarted({ ...props, contentType: 'video' }),
      draftGifUploaded: props =>
        uploadImageComplete({ ...props, contentType: 'gif' }),
      queueError: props => notifyError(props),
      monitorFileUploadProgress: monitorUpdateProgress(updateUploadProgress),
    };
    const { isHovering } = this.state;

    return (
      <CarouselCard
        key={card.uploadTrackingId}
        card={card}
        cardHeight={cardHeight}
        cardWidth={cardWidth}
        largeCards={largeCards}
        onMouseEnter={() => this.setIsHovering(true)}
        onMouseLeave={() => this.setIsHovering(false)}
        isTarget={isOver}
      >
        {card.empty && (
          <div>
            <UploadZone
              uploadButton={({ onClick }) => (
                <Button
                  type="primary"
                  label={translations.addMedia}
                  icon={<PlusIcon />}
                  onClick={onClick}
                />
              )}
              classNames={styles}
              supportsMixedMediaTypes
              mixedMediaUnsupportedCallback={
                FileUploader.throwMixedMediaTypesError
              }
              uploadDraftFile={uploadDraftFile({
                userData,
                videoProcessingComplete,
              })}
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
              disabled={isOver}
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
            <CoverImage
              src={getLargeSafeImageUrl(card.thumbnail_url)}
              isTarget={isOver}
            />
            {card.type === 'video' && <PlayIcon large={largeCards} />}
            {isHovering && !isDragging && (
              <CarouselCardHover
                card={card}
                translations={translations}
                onAddNoteClick={onAddNoteClick}
                onDeleteStoryClick={onDeleteStoryClick}
              />
            )}
          </StoryWrapper>
        )}

        {!card.empty && card.processing === true && (
          <UploadingVideo>
            <Text size="small">{translations.processingVideo}</Text>
            <LoadingAnimation marginTop="0" />
          </UploadingVideo>
        )}
      </CarouselCard>
    );
  }
}

CardItem.propTypes = {
  card: carouselCardPropTypes, // eslint-disable-line react/require-default-props,
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

CardItem.defaultProps = {
  card: {},
  removeNotifications: () => console.log('removeAllNotifications', true),
  notifyError: ({ message }) => console.log('queueError', { message }),
  createNewFile: ({ id, uploaderInstance, file }) =>
    console.log('uploadStarted - File Created', {
      id,
      uploaderInstance,
      file,
    }),
  createImageThumbnail: ({ id, uploaderInstance, url, width, height, file }) =>
    console.log('uploadedLinkThumbnail - Create Image Thumbnail', {
      id,
      uploaderInstance,
      url,
      width,
      height,
      file,
    }),
  updateUploadProgress: ({ id, uploaderInstance, progress, file, complete }) =>
    console.log('monitorFileUploadProgress - Update Upload Progress', {
      id,
      uploaderInstance,
      progress,
      file,
      complete,
    }),
  uploadImageComplete: ({
    id,
    uploaderInstance,
    url,
    location = null,
    width,
    height,
    file,
    stillGifUrl = null,
  }) =>
    console.log('uploadedDraftImage - Image Upload Created', {
      id,
      uploaderInstance,
      url,
      location,
      width,
      height,
      file,
      stillGifUrl,
    }),
  videoProcessingStarted: ({
    id,
    uploaderInstance,
    uploadId,
    fileExtension,
    file,
  }) =>
    console.log('uploadedDraftVideo - Video Processing Started', {
      id,
      uploaderInstance,
      uploadId,
      fileExtension,
      file,
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
  }) =>
    console.log('videoProcessed - Video Processing Complete', {
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
  uploadDraftFile: ({ userData, videoProcessingComplete }) =>
    console.log('uploadDraftFile', {
      userData,
      videoProcessingComplete,
    }),
  monitorUpdateProgress: () => console.log('monitorUploadProgress'),
};

export default CardItem;
