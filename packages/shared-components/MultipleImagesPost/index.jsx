import React from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';
import { LinkifiedText, MultipleImages, Text } from '@bufferapp/components';
import Post from '../Post';

const postContentStyle = {
  display: 'flex',
};

const postContentTextStyle = {
  paddingRight: '1rem',
  flexGrow: 1,
};

const imagesWrapperStyle = {
  cursor: 'pointer',
};

const MultipleImagesPost = ({
  service_geolocation_name: locationName,
  source_url: sourceUrl,
  subprofile_id: subprofileID,
  ...props
}) => {
  const {
    imageUrls,
    basic,
    text,
    links,
    onImageClick,
    isLightboxOpen,
    onImageClickPrev,
    onImageClickNext,
    onImageClose,
    currentImage,
  } = props;
  const images = imageUrls.map(url => ({ src: `${url}` }));
  const children = (
    <div style={postContentStyle}>
      <span style={postContentTextStyle}>
        {basic ? (
          <Text color="black" size="mini" whitespace="pre-wrap">
            {text}
          </Text>
        ) : (
          <LinkifiedText
            color="black"
            links={links}
            size="mini"
            whitespace="pre-wrap"
            newTab
            unstyled
          >
            {text}
          </LinkifiedText>
        )}
      </span>
      <div style={imagesWrapperStyle} onClick={onImageClick}>
        <MultipleImages
          border="rounded"
          height="9rem"
          urls={imageUrls}
          width="9rem"
        />
        <Lightbox
          images={images}
          isOpen={isLightboxOpen}
          onClickPrev={onImageClickPrev}
          onClickNext={onImageClickNext}
          onClose={onImageClose}
          currentImage={currentImage}
          backdropClosesModal
          showImageCount={false}
        />
      </div>
    </div>
  );

  return (
    <Post
      {...props}
      locationName={locationName}
      sourceUrl={sourceUrl}
      subprofileID={subprofileID}
    >
      {children}
    </Post>
  );
};

MultipleImagesPost.propTypes = {
  ...Post.commonPropTypes,
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      displayString: PropTypes.string,
      expandedUrl: PropTypes.string,
      indices: PropTypes.arrayOf(PropTypes.number),
      rawString: PropTypes.string,
    })
  ).isRequired,
  text: PropTypes.string.isRequired,
  isLightboxOpen: PropTypes.bool,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  onImageClick: PropTypes.func,
  currentImage: PropTypes.number,
};

MultipleImagesPost.defaultProps = Post.defaultProps;

export default MultipleImagesPost;
