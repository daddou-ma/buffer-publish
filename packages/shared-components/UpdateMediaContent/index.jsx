import React from 'react';
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

const UpdateMediaContent = ({
  onImageClick,
  imageSrc,
  imageUrls,
  isLightboxOpen,
  onImageClickPrev,
  onImageClickNext,
  onImageClose,
  currentImage,
  tag,
  type,
}) => {
  const images =
    type === 'multipleImage'
      ? imageUrls?.map(url => ({ src: `${url}` }))
      : [{ src: `${imageSrc}` }];
  return (
    <MediaWrapper onClick={onImageClick}>
      {type === 'multipleImage' && (
        <MultipleImages
          border="rounded"
          height="9rem"
          urls={imageUrls}
          width="9rem"
        />
      )}
      {(type === 'image' || type === 'video') && (
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
        onClickPrev={onImageClickPrev}
        onClickNext={onImageClickNext}
        onClose={onImageClose}
        currentImage={type === 'multipleImage' ? currentImage : null}
        backdropClosesModal
        showImageCount={false}
      />
      {(type === 'image' || type === 'video') && tag && (
        <ThumbnailTag>
          <IdTag>{tag}</IdTag>
        </ThumbnailTag>
      )}
    </MediaWrapper>
  );
};

UpdateMediaContent.propTypes = {
  type: PropTypes.oneOf(['text', 'image', 'multipleImage', 'link', 'video'])
    .isRequired,
  onImageClick: PropTypes.func.isRequired,
  onImageClickPrev: PropTypes.func.isRequired,
  onImageClickNext: PropTypes.func.isRequired,
  onImageClose: PropTypes.func.isRequired,
  imageSrc: PropTypes.string,
  tag: PropTypes.string,
  isLightboxOpen: PropTypes.bool,
  imageUrls: PropTypes.arrayOf(PropTypes.string),
  currentImage: PropTypes.number,
};

UpdateMediaContent.defaultProps = {
  imageSrc: '',
  tag: '',
  isLightboxOpen: false,
  imageUrls: [],
  currentImage: undefined,
};

export default UpdateMediaContent;
