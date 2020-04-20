import React from 'react';
import ImagePost from '../ImagePost';

const VideoPost = ({ ...props }) => <ImagePost {...props} />;

VideoPost.propTypes = ImagePost.propTypes;

VideoPost.defaultProps = {
  ...ImagePost.defaultProps,
  tag: 'VIDEO',
};

export default VideoPost;
