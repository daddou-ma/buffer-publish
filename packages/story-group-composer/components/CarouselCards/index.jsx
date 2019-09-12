import React from 'react';
import { FileUploadFormatsConfigs } from '@bufferapp/publish-composer/composer/AppConstants';
import styled from 'styled-components';
import { CirclePlayIcon } from '@bufferapp/components';
import { grayLighter } from '@bufferapp/ui/style/colors';
import { CarouselCard, getCardSizes } from '@bufferapp/publish-shared-components/Carousel';
import UploadZone from '@bufferapp/publish-upload-zone';
import { Button } from '@bufferapp/ui';
import Attach from '@bufferapp/ui/Icon/Icons/Attach';
import FileUploader from '@bufferapp/publish-composer/composer/file-uploads/FileUploader';
import { UploadTypes } from '@bufferapp/publish-constants';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';

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
        order: `${i}`,
        empty: firstEmpty,
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
class CarouselCards extends React.Component {
  notifiers = {
    uploadStarted: ({
      id, uploaderInstance, file,
    }) => this.props.createNewFile({ id, uploaderInstance, file }),
    uploadedLinkThumbnail: ({
      id, uploaderInstance, url, width, height, file,
    }) => this.createImageThumbnail({
      id, uploaderInstance, url, width, height, file,
    }),
    uploadedDraftImage: ({
      id, uploaderInstance, url, location, width, height, file,
    }) => this.props.uploadImageComplete({
      id, uploaderInstance, url, location, width, height, file,
    }),
    uploadedDraftVideo: ({
      id, uploaderInstance, uploadId, fileExtension, file,
    }) => this.props.videoProcessingStarted({
      id, uploaderInstance, uploadId, fileExtension, file,
    }),
    draftGifUploaded: ({
      id, uploaderInstance, url, stillGifUrl, width, height, file,
    }) => this.props.uploadImageComplete({
      id, uploaderInstance, url, stillGifUrl, width, height, file,
    }),
    queueError: ({ message }) => this.props.notifyError({ message }),
    monitorFileUploadProgress: async ({ id, uploaderInstance, file }) => {
      const progressIterator = uploaderInstance.getProgressIterator();
      let item;

      while (!(item = progressIterator.next()).done) { // eslint-disable-line no-cond-assign
        const promisedProgress = item.value;

        await promisedProgress.then(progress => // eslint-disable-line no-await-in-loop
          this.props.updateUploadProgress({
            id, uploaderInstance, progress, file, complete: false,
          }));
      }
      this.props.updateUploadProgress({
        id, uploaderInstance, file, complete: true,
      });
    },
  };

  constructor (props) {
    super(props);

    this.state = {
      draftCards: [],
      currentCards: cloneDeep(props.cards),
    };
  }

  uploadDraftFile = userData => (id, file, uploadType, notifiers, createFileUploaderCallback) => {
    const {
      id: userId,
      s3_upload_signature: s3Signature,
      imageDimensionsKey,
    } = userData;

    const s3UploadSignature = {
      algorithm: s3Signature.algorithm,
      base64Policy: s3Signature.base64policy,
      bucket: s3Signature.bucket,
      credentials: s3Signature.credentials,
      date: s3Signature.date,
      expires: s3Signature.expires,
      signature: s3Signature.signature,
      successActionStatus: s3Signature.success_action_status,
    };
    const uploadDraftFileCallback = createFileUploaderCallback({
      s3UploadSignature,
      userId,
      csrfToken: null,
      imageDimensionsKey,
      serverNotifiers: {
        videoProcessed: ({
          uploadId, name, duration, durationMs, size, width, height, url, originalUrl, thumbnail, availableThumbnails,
        }) => this.props.videoProcessingComplete({
          uploadId, name, duration, durationMs, size, width, height, url, originalUrl, thumbnail, availableThumbnails,
        }),
        profileGroupCreated: () => {},
        profileGroupUpdated: () => {},
        profileGroupDeleted: () => {},
      },
    });

    return uploadDraftFileCallback(id, file, uploadType, notifiers);
  };

  createImageThumbnail = ({
    id, uploaderInstance, url, width, height, file,
  }) => {
    const type = 'image';
    this.props.createImageThumbnail({
      id, uploaderInstance, url, width, height, file,
    });
    // TODO: remove this once the actual upload logic is done
    // this is for testing purposes
    this.props.onUploadFinished({
      id, uploaderInstance, url, width, height, file, type,
    });
  }

  render () {
    const {
      totalCardsToShow,
      largeCards,
      editMode,
      userData,
      removeNotifications,
      notifyError,
    } = this.props;

    const {
      currentCards: cards,
    } = this.state;
    const { cardWidth, cardHeight } = getCardSizes(largeCards);
    const cardsToRender = editMode ? getCardsToShow({ cards, totalCardsToShow }) : sortCards(cards);
    const uploadFormatsConfig = new Map(FileUploadFormatsConfigs.MEDIA); // Clone config

    return cardsToRender.map(card => (
      <CarouselCard
        key={card.order}
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
                    uploadDraftFile={this.uploadDraftFile(userData)}
                    notifiers={this.notifiers}
                    removeAllNotifications={removeNotifications}
                    queueError={notifyError}
                    draftId={card.order}
                    uploadFormatsConfig={uploadFormatsConfig}
                    service={{
                      maxAttachableImagesCount: totalCardsToShow,
                      canHaveMediaAttachmentType: () => true,
                    }}
                    uploadType={UploadTypes.LINK_THUMBNAIL}
                    multiple
                    disabled={false}
                  />
                </div>
              )}

            </React.Fragment>
          )
          : card.type === 'video' && <PlayIcon />
        }
      </CarouselCard>
    ));
  }
}

CarouselCards.propTypes = {
  largeCards: PropTypes.bool,
  cards: PropTypes.arrayOf(PropTypes.shape({
    order: PropTypes.string,
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
};

CarouselCards.defaultProps = {
  removeNotifications: () => console.log('removeAllNotifications', true),
  notifyError: ({ message }) => console.log('queueError', { message }),
  createNewFile: ({ id, uploaderInstance, file }) => console.log('uploadStarted - File Created', { id, uploaderInstance, file }),
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
  }) => console.log('uploadedDraftImage - Create Draft Image', {
    id, uploaderInstance, url, location, width, height, file, stillGifUrl,
  }),
  videoProcessingStarted: ({
    id, uploaderInstance, uploadId, fileExtension, file,
  }) => console.log('uploadedDraftVideo', {
    id, uploaderInstance, uploadId, fileExtension, file,
  }),
  videoProcessingComplete: ({
    uploadId, name, duration, durationMs, size, width, height, url, originalUrl, thumbnail, availableThumbnails,
  }) => console.log('videoProcessed - Video Processing Complete', {
    uploadId, name, duration, durationMs, size, width, height, url, originalUrl, thumbnail, availableThumbnails,
  }),

  largeCards: false,
  cards: [],
  editMode: false,
  totalCardsToShow: 15,
  getCardSizes: null,
};

export default CarouselCards;
