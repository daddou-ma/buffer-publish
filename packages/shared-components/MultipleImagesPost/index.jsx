import React from 'react';
import Post from '../Post';

const MultipleImagesPost = ({
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

MultipleImagesPost.propTypes = {
  ...Post.commonPropTypes,
};

MultipleImagesPost.defaultProps = Post.defaultProps;

export default MultipleImagesPost;
