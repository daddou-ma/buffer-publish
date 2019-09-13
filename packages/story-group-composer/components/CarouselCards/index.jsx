import React from 'react';
import { FileUploadFormatsConfigs } from '@bufferapp/publish-composer/composer/AppConstants';
import { getCardSizes } from '@bufferapp/publish-shared-components/Carousel';
import PropTypes from 'prop-types';
import CardDragWrapper from '../CardDragWrapper';

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
  onDropCard,
}) => {
  const { cardWidth, cardHeight } = getCardSizes(largeCards);
  const cardsToRender = editMode ? getCardsToShow({ cards, totalCardsToShow }) : sortCards(cards);
  const uploadFormatsConfig = new Map(FileUploadFormatsConfigs.MEDIA); // Clone config
  const maxAttachableMediaCount = totalCardsToShow - cards.length;

  return cardsToRender.map(card => (
    <CardDragWrapper
      key={card.uploadTrackingId}
      card={card}
      cardHeight={cardHeight}
      cardWidth={cardWidth}
      largeCards={largeCards}
      userData={userData}
      uploadFormatsConfig={uploadFormatsConfig}
      maxAttachableMediaCount={maxAttachableMediaCount}
      removeNotifications={removeNotifications}
      notifyError={notifyError}
      videoProcessingComplete={videoProcessingComplete}
      uploadDraftFile={uploadDraftFile}
      updateUploadProgress={updateUploadProgress}
      monitorUpdateProgress={monitorUpdateProgress}
      createNewFile={createNewFile}
      createImageThumbnail={createImageThumbnail}
      uploadImageComplete={uploadImageComplete}
      videoProcessingStarted={videoProcessingStarted}
      cardLimit={totalCardsToShow}
      onDropCard={onDropCard}
    />
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
  onDropCard: PropTypes.func,
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
  onDropCard: () => console.log('cardDropped'),
  largeCards: false,
  cards: [],
  editMode: false,
  totalCardsToShow: 15,
  getCardSizes: null,
};

export default CarouselCards;
