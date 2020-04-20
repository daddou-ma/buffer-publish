import React from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';
import { IdTag, Image, LinkifiedText, Text } from '@bufferapp/components';
import Post from '../Post';

const postContentStyle = {
  display: 'flex',
};

const postContentTextStyle = {
  paddingRight: '1rem',
  flexGrow: 1,
};

const imageWrapperStyle = {
  position: 'relative',
  cursor: 'pointer',
};

const thumbnailWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '9rem',
  height: '9rem',
  borderRadius: '4px',
  border: '1px solid #B8B8B8',
  background: '#F5F5F5',
};

const imageTagStyle = {
  position: 'absolute',
  bottom: '0.7rem',
  left: '0.7rem',
};

const renderTag = tag => {
  if (!tag) return;
  return (
    <span style={imageTagStyle}>
      <IdTag>{tag}</IdTag>
    </span>
  );
};

const ImagePost = ({
  service_geolocation_name: locationName,
  source_url: sourceUrl,
  subprofile_id: subprofileID,
  service_user_tags: userTags,
  ...props
}) => {
  const {
    basic,
    text,
    links,
    onImageClick,
    imageSrc,
    isLightboxOpen,
    onImageClickPrev,
    onImageClickNext,
    onImageClose,
    tag,
  } = props;
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
      <div style={imageWrapperStyle} onClick={onImageClick}>
        <div style={thumbnailWrapperStyle}>
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
        </div>
        <Lightbox
          images={[{ src: `${imageSrc}` }]}
          isOpen={isLightboxOpen}
          onClickPrev={onImageClickPrev}
          onClickNext={onImageClickNext}
          onClose={onImageClose}
          backdropClosesModal
          showImageCount={false}
        />
        {renderTag(tag)}
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

ImagePost.propTypes = {
  ...Post.commonPropTypes,
  imageSrc: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      rawString: PropTypes.string,
      displayString: PropTypes.string,
      expandedUrl: PropTypes.string,
      indices: PropTypes.arrayOf(PropTypes.number),
    })
  ).isRequired,
  text: PropTypes.string.isRequired,
  tag: PropTypes.string,
  isLightboxOpen: PropTypes.bool,
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
};

ImagePost.defaultProps = ImagePost.defaultProps;

export default ImagePost;
