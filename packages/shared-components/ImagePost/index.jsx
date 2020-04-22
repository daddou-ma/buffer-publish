import React from 'react';
import Post from '../Post';

const ImagePost = ({
  service_geolocation_name: locationName,
  source_url: sourceUrl,
  subprofile_id: subprofileID,
  service_user_tags: userTags,
  ...props
}) => (
  <Post
    {...props}
    locationName={locationName}
    sourceUrl={sourceUrl}
    subprofileID={subprofileID}
    userTags={userTags}
  />
);

ImagePost.propTypes = {
  ...Post.commonPropTypes,
};

ImagePost.defaultProps = ImagePost.defaultProps;

export default ImagePost;
