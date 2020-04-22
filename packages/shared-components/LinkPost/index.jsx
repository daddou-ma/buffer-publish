import React from 'react';
import Post from '../Post';

const LinkPost = ({
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

LinkPost.propTypes = {
  ...Post.commonPropTypes,
};

LinkPost.defaultProps = Post.defaultProps;

export default LinkPost;
