import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Lightbox from 'react-images';
import { IdTag, Image, MultipleImages } from '@bufferapp/components';
import { grayLighter, gray } from '@bufferapp/ui/style/colors';
import { borderRadius } from '@bufferapp/ui/style/borders';

const MediaWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 9rem;
  height: 9rem;
  border-radius: ${borderRadius};
  border: 1px solid ${gray};
  background: ${grayLighter};
`;

const ThumbnailTag = styled.span`
  position: absolute;
  bottom: 0.7rem;
  left: 0.7rem;
`;

const UpdateMediaContent = ({ imageSrc, imageUrls, type }) => {
  // State
  const [isLightboxOpen, openLightbox] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const isVideo = type === 'video';
  const isMultipleImage = type === 'multipleImage';
  const isSingleImage = type === 'image' || isVideo;
  const imageArray = isMultipleImage ? imageUrls : [imageSrc];
  const images = imageArray?.map(url => ({ src: `${url}` }));

  return (
    <MediaWrapper
      onClick={() => {
        openLightbox(true);
        setCurrentImage(0);
      }}
    >
      {isMultipleImage && (
        <MultipleImages
          border="rounded"
          height="9rem"
          urls={imageUrls}
          width="9rem"
        />
      )}
      {isSingleImage && (
        <ImageWrapper>
          <Image
            src={imageSrc}
            width="auto"
            height="auto"
            maxWidth="9rem"
            maxHeight="9rem"
            minHeight="7rem"
            minWidth="7rem"
            objectFit="cover"
          />
        </ImageWrapper>
      )}
      <Lightbox
        images={images}
        isOpen={isLightboxOpen}
        onClickPrev={() => {
          setCurrentImage(currentImage - 1);
        }}
        onClickNext={() => {
          setCurrentImage(currentImage + 1);
        }}
        onClose={() => {
          openLightbox(false);
        }}
        currentImage={currentImage}
        backdropClosesModal
        showImageCount={false}
      />
      {isVideo && (
        <ThumbnailTag>
          <IdTag>VIDEO</IdTag>
        </ThumbnailTag>
      )}
    </MediaWrapper>
  );
};

UpdateMediaContent.propTypes = {
  type: PropTypes.oneOf(['text', 'image', 'multipleImage', 'link', 'video'])
    .isRequired,
  imageSrc: PropTypes.string,
  imageUrls: PropTypes.arrayOf(PropTypes.string),
};

UpdateMediaContent.defaultProps = {
  imageSrc: '',
  imageUrls: [],
};

export default UpdateMediaContent;
