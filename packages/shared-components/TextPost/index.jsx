import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post';
import UpdateTextContent from '../UpdateTextContent';

const postContentStyle = {
  display: 'flex',
};

const TextPost = ({
  service_geolocation_name: locationName,
  source_url: sourceUrl,
  subprofile_id: subprofileID,
  ...props
}) => {
  const { basic, text, links } = props;
  const children = (
    <div style={postContentStyle}>
      <UpdateTextContent basic={basic} links={links} text={text} />
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

TextPost.propTypes = {
  ...Post.commonPropTypes,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      rawString: PropTypes.string,
      displayString: PropTypes.string,
      expandedUrl: PropTypes.string,
      indices: PropTypes.arrayOf(PropTypes.number),
    })
  ).isRequired,
  text: PropTypes.string.isRequired,
};

TextPost.defaultProps = Post.defaultProps;

export default TextPost;
