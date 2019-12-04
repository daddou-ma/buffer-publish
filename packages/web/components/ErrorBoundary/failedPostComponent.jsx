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
        <div style={style.errorSmallBoundaryTitle}>
          Well this is embarrassing...
        </div>
        <div style={style.errorSmallBoundaryMessage}>
          Something’s gone wrong with this post so I've informed my human
          creators.
          <br />
          If you need further assistance please email us at{' '}
          <a href="mailto:hello@buffer.com">hello@buffer.com</a>.
        </div>
        <div style={style.smallErrorBoundaryMessage}>
          (Failed post Id: {this.props.postId}
          {post.day && post.dueTime
            ? ` - Post due date: ${post.day} at ${post.dueTime}`
            : ''}
          )
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
