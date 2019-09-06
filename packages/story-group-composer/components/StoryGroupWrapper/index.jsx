import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from '@bufferapp/ui/Avatar';
import { SensitiveData } from '@bufferapp/publish-shared-components';
import { Text } from '@bufferapp/components';
import ArrowLeft from '@bufferapp/ui/Icon/Icons/ArrowLeft';
import ArrowRight from '@bufferapp/ui/Icon/Icons/ArrowRight';
import clamp from 'lodash.clamp';
import { Button } from '@bufferapp/ui';
import { grayLight, grayLighter } from '@bufferapp/ui/style/colors';
import Attach from '@bufferapp/ui/Icon/Icons/Attach';
import UploadZone from '@bufferapp/publish-upload-zone';
import FileUploader from '@bufferapp/publish-composer/composer/file-uploads/FileUploader';
import { FileUploadFormatsConfigs } from '@bufferapp/publish-composer/composer/AppConstants';
import { UploadTypes } from '@bufferapp/publish-constants';
import DateTimeSlotPickerWrapper from '../DateTimeSlotPickerWrapper';

const cardsToShow = 15;
const cardWidth = 180;
const cardMargin = 4;
const lowerBounds = 0;
const upperBounds = cardsToShow - 1;

const WrapperStyle = styled.div`
  background-color: white;
  border-radius: 3px;
  height: 100%;
  padding: 16px;
  right: 0;
  top: 0;
  width: 686px;
`;

const HeaderBar = styled.div`
  padding: 13px 0;
  display: flex;
`;

const FooterBar = styled.div`
  padding: 13px 0;
  display: flex;
`;

const AvatarContainer = styled.div`
  display: flex;
`;

const AvatarNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 16px;
`;

const BodyContainer = styled.div`
  display: flex;
  position: relative;
  margin-left: -16px;
  margin-right: -16px;
  max-width: 718px;
  overflow: hidden;
`;

const StyledArrow = styled.button`
  cursor: pointer;
  top: 50%;
  transform: translateY(calc(-50% - 16px));
  position: absolute;
  left: ${props => props.prev ? 0 : 'initial'}
  right: ${props => props.prev ? 'initial' : 0}
  background-color: ${grayLight};
  border: 1px solid ${grayLight};
  height: 32px;
  width: 32px;
  margin: 16px;
  outline: none;
  border-radius: 2px;
`;

const CarouselContainer = styled.div`
  display: flex;
  padding-left: 16px;
  width: calc(${cardWidth + (cardMargin * 2)}px * 15);
  transform: ${props => `translateX(calc(-${cardWidth + (cardMargin * 2)}px * ${props.selectedItem}`}));
  transition: all 0.3s ease-out;
`;

const CarouselCard = styled.div`
  position: relative;
  align-items: center;
  background-color: ${grayLighter};
  display: flex;
  justify-content: center;
  height: 320px;
  margin: ${cardMargin}px;
  width: ${cardWidth}px;
`;

const ADD_STORY = 'addStory';
const ADD_NOTE = 'addNote';

/*
 * Wrapper to make sure to display add story view or add note view
 */

const NavArrow = ({
  prev = false,
  hide = false,
  incrementBy = 1,
  selectedItem = 0,
  setSelectedItem = null,
}) => {
  if (hide) return null;
  return (
    <StyledArrow
      prev={prev}
      onClick={() => {
        setSelectedItem(clamp(selectedItem + incrementBy, lowerBounds, upperBounds));
      }}
    >
      {prev ? <ArrowLeft /> : <ArrowRight />}
    </StyledArrow>
  );
};

const getCardsToShow = ({ cards = [] }) => {
  const cardList = [];
  const sortedCards = cards.sort((a, b) => {
    if (a.order > b.order) return 1;
    return -1;
  });
  for (let i = 0, firstEmpty = true; i < cardsToShow; i += 1) {
    const card = sortedCards[i];
    if (card) {
      cardList.push(card);
    } else {
      cardList.push({
        order: i,
        empty: firstEmpty,
      });
      firstEmpty = false;
    }
  }
  return cardList;
};

const SliderCarousel = ({ initialSelectedItem = 0, userData }) => {
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);
  const uploadFormatsConfig = new Map(FileUploadFormatsConfigs.MEDIA); // Clone config

  const uploadDraftFile = (id, file, uploadType, notifiers, createFileUploaderCallback) => {
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
        videoProcessed: (processedVideoData) => console.log('videoProcessed', { processedVideoData }),
        profileGroupCreated: (groupData) => console.log('profileGroupCreated', { groupData }),
        profileGroupUpdated: (groupData) => console.log('profileGroupUpdate', { groupData }),
        profileGroupDeleted: (groupData) => console.log('profileGroupDeleted', { groupData }),
      },
    });

    return uploadDraftFileCallback(id, file, uploadType, notifiers);
  };

  const notifiers = {
    uploadStarted: ({ id, uploaderInstance }) => {
// set upload progress to 0
// const monitorComposerLastInteractedWith = (fn) => (draftId, ...restArgs) => {
//   if (draftId === 'omni' || draftId === AppStore.getAppState().expandedComposerId) {
//     state.meta.lastInteractedWithComposerId = draftId;
//   }
//
//   return fn(draftId, ...restArgs);
// };
// monitorComposerLastInteractedWith(() => {
//   updateDraftFileUploadProgress(action.id, action.uploaderInstance, 0);
// })();

      //console.log('uploadStarted', { id, uploaderInstance });
    },
    uploadedLinkThumbnail: ({
      id,
      uploaderInstance,
      url,
      width,
      height,
    }) => {
      // set upload progress to 0
// const updateDraftFileUploadProgress = (id, uploaderInstance, progress) => {
//   const { filesUploadProgress } = ComposerStore.getDraft(id);
//
//   if (progress !== null) filesUploadProgress.set(uploaderInstance, progress);
//   else filesUploadProgress.delete(uploaderInstance);
// };
//
// const addDraftUploadedLinkThumbnail = (id, url, width, height) => {
//   const draftsSharedData = ComposerStore.getDraftsSharedData();
//   const formattedImage = getNewImage({ url, width, height });
//
// /**
//  * It's important for the three collections below to share the same formattedImage
//  * reference, so that a change made in one location propagates to all other places
//  * seamlessly.
//  * TODO: Re-implement this logic in an immutable fashion: it'll be a bit more work
//  * to manually search and update all places where an image can be stored, but it'll
//  * be much more solid.
//  * /
//   updateDraftLinkThumbnail(id, formattedImage);
//   addDraftLinkAvailableThumbnail(id, formattedImage);
//   draftsSharedData.uploadedImages.push(formattedImage);
// };
//
//  addDraftUploadedLinkThumbnail(action.id, action.url, action.width, action.height);
//  updateDraftFileUploadProgress(action.id, action.uploaderInstance, null);

      //console.log('uploadedLinkThumbnail', { id, uploaderInstance, url, width, height });
    },
    uploadedDraftImage: ({
      id,
      uploaderInstance,
      url,
      location,
      width,
      height,
    }) => {
      //console.log('uploadedDraftImage', { id, uploaderInstance, url, location, width, height });
    },
    uploadedDraftVideo: ({
      id,
      uploaderInstance,
      uploadId,
      fileExtension,
    }) => {
// const addDraftProcessingVideo = (draftId, uploaderInstance, uploadId) => {
//   state.draftsSharedData.processingVideos.set(uploadId, [draftId, uploaderInstance]);
// };
//
// addDraftProcessingVideo(action.id, action.uploaderInstance, action.uploadId);

      //console.log('uploadedDraftVideo',  { id, uploaderInstance, uploadId, fileExtension });
    },
    draftGifUploaded: ({
      id,
      uploaderInstance,
      url,
      stillGifUrl,
      width,
      height,
    }) => {
// const addDraftUploadedGif = (draftId, url, stillGifUrl, width, height) => {
//   const draftsSharedData = ComposerStore.getDraftsSharedData();
//   const formattedGif = getNewGif(url, stillGifUrl, width, height);
//
// /**
//  * It's important for the two collections below to share the same formattedGif
//  * reference, so that a change made in one location propagates to all other places
//  * seamlessly.
//  * TODO: Re-implement this logic in an immutable fashion: it'll be a bit more work
//  * to manually search and update all places where an image can be stored, but it'll
//  * be much more solid.
//  * /
//
//   draftsSharedData.uploadedGifs.push(formattedGif);
//   addDraftGif(draftId, formattedGif);
// };
//
// addDraftUploadedGif(action.id, action.url, action.stillGifUrl, action.width, action.height);
// updateDraftFileUploadProgress(action.id, action.uploaderInstance, null);

      //console.log('draftGifUploaded', { id, uploaderInstance, url, stillGifUrl, width, height });
    },
    queueError: ({message}) => {
// NotificationActionCreators.queueError({
//   scope: NotificationScopes.FILE_UPLOAD,
//   message
// });
      //console.log('queueError', { message });
    },
    monitorFileUploadProgress: async ({ id, uploaderInstance}) => {

      const progressIterator = uploaderInstance.getProgressIterator();
      let item;

      while (!(item = progressIterator.next()).done) { // eslint-disable-line no-cond-assign
        const promisedProgress = item.value;

        await promisedProgress.then(progress => { // eslint-disable-line no-await-in-loop
          //console.log('monitorFileUploadProgress', { id, uploaderInstance, progress });
        });
      }
      //console.log('monitorFileUploadProgress', { id, uploaderInstance });
    },
  };

  return (
    <React.Fragment>
      <CarouselContainer selectedItem={selectedItem}>
        {getCardsToShow({ cards: [] }).map(card => (
          <CarouselCard
            key={card.order}
            card={card}
          >
            {card.empty && (
              <div>
                <UploadZone
                  uploadButton={({onClick}) => (
                    <Button
                      type="primary"
                      label="Add Media Files"
                      icon={<Attach/>}
                      onClick={onClick}
                    />
                  )}
                  supportsMixedMediaTypes
                  mixedMediaUnsupportedCallback={FileUploader.throwMixedMediaTypesError}
                  uploadDraftFile={uploadDraftFile}
                  notifiers={notifiers}
                  removeAllNotifications={() => console.log('removeAllNotifications', true)}
                  queueError={({message}) => console.log('queueError', {message})}
                  draftId={card.order}
                  uploadFormatsConfig={uploadFormatsConfig}
                  service={{
                    maxAttachableImagesCount: cardsToShow,
                    canHaveMediaAttachmentType: () => true,
                  }}
                  uploadType={UploadTypes.LINK_THUMBNAIL}
                  multiple={false}
                  disabled={false}
                />
              </div>
              )
            }
          </CarouselCard>
        ))}
      </CarouselContainer>
      <NavArrow
        prev
        hide={selectedItem <= 0}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        incrementBy={-1}
      />
      <NavArrow
        hide={selectedItem >= 14}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        incrementBy={+1}
      />
    </React.Fragment>
  );
};

const StoryGroupWrapper = ({
  onDateTimeSlotPickerSubmit,
  uses24hTime,
  timezone,
  weekStartsMonday,
  selectedProfile,
  userData,
  }) => {
  // hooks: https://reactjs.org/docs/hooks-state.html
  const [viewMode, setViewMode] = useState(ADD_STORY);

  return (
    <WrapperStyle>
      {viewMode === ADD_STORY &&
      <React.Fragment>
        <HeaderBar>
          <AvatarContainer>
            <Avatar
              src={selectedProfile.avatar_https}
              fallbackUrl="https://s3.amazonaws.com/buffer-ui/Default+Avatar.png"
              alt={selectedProfile.handle}
              size="medium"
              type="social"
              network={selectedProfile.service}
            />
            <AvatarNameWrapper>
              <SensitiveData>
                <Text size="mini" color="outerSpace">
                  {selectedProfile.handle}
                </Text>
              </SensitiveData>
            </AvatarNameWrapper>
          </AvatarContainer>
        </HeaderBar>
        <BodyContainer>
          <SliderCarousel userData={userData} />
        </BodyContainer>
        <FooterBar>
          <Button label="Preview" onClick={() => true} />
          <Button label="Schedule Story" onClick={() => true} />
        </FooterBar>
      </React.Fragment>
      }
      {viewMode === ADD_NOTE &&
      <div>Add note view</div>
      }
    </WrapperStyle>
  );
};

StoryGroupWrapper.propTypes = {
  ...DateTimeSlotPickerWrapper.propTypes,
  selectedProfile: PropTypes.shape({
    id: PropTypes.string,
    avatarUrl: PropTypes.string,
    avatar_https: PropTypes.string,
    serviceUsername: PropTypes.string,
    serviceId: PropTypes.string,
    organizationId: PropTypes.string,
    username: PropTypes.string,
    service: PropTypes.string,
    handle: PropTypes.string,
  }).isRequired,
  userData: PropTypes.shape({}).isRequired,
};

export default StoryGroupWrapper;
