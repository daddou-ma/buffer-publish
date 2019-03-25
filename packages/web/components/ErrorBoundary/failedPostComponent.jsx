import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

class FailedPostComponent extends React.Component {
  static onRefresh() {
    location.reload();
  }

  render() {
    const post = this.props.post;
    return (
      <div style={style.errorBoundaryBordered}>
        <div style={style.errorSmallBoundaryTitle}>Well this is embarrassing...</div>
        <div style={style.errorSmallBoundaryMessage}>
          Something’s gone wrong with this post. I’ve notified my human<br />
          creators who will look into this shortly.
        </div>
        <div style={style.smallErrorBoundaryMessage}>
          (Failed post Id: {this.props.postId}{post.day && post.dueTime ? ` - Post due date: ${post.day} at ${post.dueTime}` : ''})
        </div>
      </div>
    );
  }
}

FailedPostComponent.propTypes = {
  postId: PropTypes.string.isRequired,
  post: PropTypes.any, // eslint-disable-line
};

FailedPostComponent.defaultProps = {
  post: null,
};

export default FailedPostComponent;
