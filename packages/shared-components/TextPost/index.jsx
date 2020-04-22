import React from 'react';
import Post from '../Post';

const TextPost = ({
  service_geolocation_name: locationName,
  source_url: sourceUrl,
  subprofile_id: subprofileID,
  ...props
}) => (
  <Post
    {...props}
    locationName={locationName}
    sourceUrl={sourceUrl}
    subprofileID={subprofileID}
  />
);

TextPost.propTypes = {
  ...Post.commonPropTypes,
};

TextPost.defaultProps = Post.defaultProps;

export default TextPost;
