import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import { IdTag, Image, MultipleImages } from '@bufferapp/components';
import { grayLighter, gray } from '@bufferapp/ui/style/colors';
import { borderRadius } from '@bufferapp/ui/style/borders';
import { Carousel, Modal } from '@bufferapp/ui';

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

const UpdateMediaContent = ({ imageSrc, imageUrls, tag, type }) => {
  // State
  const [carouselOpen, openCarousel] = useState(false);

  const isMultipleImage = type === 'multipleImage';
  const isSingleImage = type === 'image' || type === 'video';
  const imageArray = isMultipleImage ? imageUrls : [imageSrc];

  return (
    <React.Fragment>
      <MediaWrapper
        onClick={() => {
          openCarousel(true);
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
        {isSingleImage && tag && (
          <ThumbnailTag>
            <IdTag>{tag}</IdTag>
          </ThumbnailTag>
        )}
      </MediaWrapper>

      {/* Image Carousel */}
      {carouselOpen && (
        <Modal
          closeButton={{
            callback: () => {
              openCarousel(false);
            },
          }}
          noBackground
          dismissible
        >
          <div>
            <Carousel width="400px">
              {imageArray.map((url, index) => (
                <img
                  src={url}
                  alt={`slide ${index}`}
                  width="400"
                  key={uuid()}
                />
              ))}
            </Carousel>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
};

UpdateMediaContent.propTypes = {
  type: PropTypes.oneOf(['text', 'image', 'multipleImage', 'link', 'video'])
    .isRequired,
  imageSrc: PropTypes.string,
  tag: PropTypes.string,
  imageUrls: PropTypes.arrayOf(PropTypes.string),
};

UpdateMediaContent.defaultProps = {
  imageSrc: '',
  tag: '',
  imageUrls: [],
};

export default UpdateMediaContent;
