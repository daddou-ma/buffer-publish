import React from 'react';
import { FileUploadFormatsConfigs } from '@bufferapp/publish-composer/composer/AppConstants';
import styled from 'styled-components';
import { CirclePlayIcon, Text } from '@bufferapp/components';
import Loader from '@bufferapp/components/Loader';
import { grayLighter } from '@bufferapp/ui/style/colors';
import { CarouselCard, getCardSizes } from '@bufferapp/publish-shared-components/Carousel';
import UploadZone from '@bufferapp/publish-upload-zone';
import { Button } from '@bufferapp/ui';
import Attach from '@bufferapp/ui/Icon/Icons/Attach';
import FileUploader from '@bufferapp/publish-composer/composer/file-uploads/FileUploader';
import { UploadTypes } from '@bufferapp/publish-constants';
import CircularUploadIndicator
  from '@bufferapp/publish-composer/composer/components/progress-indicators/CircularUploadIndicator';
import PropTypes from 'prop-types';
import styles from './styles.css';

const IconWrapper = styled(CirclePlayIcon)`
      display: flex;
      opacity: 0.8;
    `;

const PlayIcon = () => (
  <IconWrapper>
    <CirclePlayIcon color={grayLighter} size={{ width: '40px' }} />
  </IconWrapper>
);

const sortCards = cards => (
  cards.sort((a, b) => {
    if (a.order > b.order) return 1;
    return -1;
  })
);

const getCardsToShow = ({ cards = [], totalCardsToShow }) => {
  const cardList = [];
  const sortedCards = sortCards(cards);
  for (let i = 0, firstEmpty = true; i < totalCardsToShow; i += 1) {
    const card = sortedCards[i];
    if (card) {
      cardList.push(card);
    } else {
      cardList.push({
        order: i,
        empty: firstEmpty,
        progress: null,
        uploadTrackingId: i,
      });
      firstEmpty = false;
    }
  }
  return cardList;
};

/**
 * Carousel on view mode, to display images in the queue
 * Carousel on edit mode, handling from the composer
 */
const CarouselCards = ({
  totalCardsToShow,
  largeCards,
  editMode,
  userData,
  removeNotifications,
  notifyError,
  videoProcessingComplete,
  cards,
  uploadDraftFile,
  updateUploadProgress,
  monitorUpdateProgress,
  createNewFile,
  createImageThumbnail,
  uploadImageComplete,
  videoProcessingStarted,
}) => {
  const { cardWidth, cardHeight } = getCardSizes(largeCards);
  const cardsToRender = editMode ? getCardsToShow({ cards, totalCardsToShow }) : sortCards(cards);
  const uploadFormatsConfig = new Map(FileUploadFormatsConfigs.MEDIA); // Clone config
  const maxAttachableMediaCount = totalCardsToShow - cards.length;

  const notifiers = {
    uploadStarted: props => createNewFile(props),
    uploadedLinkThumbnail: props => createImageThumbnail(props),
    uploadedDraftImage: props => uploadImageComplete(props),
    uploadedDraftVideo: props => videoProcessingStarted(props),
    draftGifUploaded: props => uploadImageComplete(props),
    queueError: props => notifyError(props),
    monitorFileUploadProgress: monitorUpdateProgress(updateUploadProgress),
  };

  return cardsToRender.map(card => (
    <CarouselCard
      key={card.uploadTrackingId}
      card={card}
      cardHeight={cardHeight}
      cardWidth={cardWidth}
      largeCards={largeCards}
    >
      {editMode
        ? (
          <React.Fragment>
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

            {!card.empty && card.processing === true && (
              <Loader>
                <Text size="small">Processing video</Text>
              </Loader>
            )}

          </React.Fragment>
        )
        : card.type === 'video' && <PlayIcon />
      }
    </CarouselCard>
  ));
};

CarouselCards.propTypes = {
  largeCards: PropTypes.bool,
  cards: PropTypes.arrayOf(PropTypes.shape({
    order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
    note: PropTypes.string,
    asset_url: PropTypes.string,
    thumbnail_url: PropTypes.string,
  })),
  editMode: PropTypes.bool,
  totalCardsToShow: PropTypes.number,
  getCardSizes: PropTypes.func,
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
  }),
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
};

CarouselCards.defaultProps = {
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
  cards: [],
  editMode: false,
  totalCardsToShow: 15,
  getCardSizes: null,
};

export default CarouselCards;
