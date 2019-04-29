import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DragSource } from 'react-dnd';

const postSource = {
  canDrag(props) {
    return !props.postProps.postDetails.error;
  },
  beginDrag(props, monitor, component) {
    return {
      id: props.id,
      index: props.index,
      postComponent: props.postComponent,
      postProps: props.postProps,
      width: component.containerNode.offsetWidth,
      onDropPost: props.postProps.onDropPost,
      profileId: props.profileId,
      basic: props.basic,
    };
  },
};

class PostDragWrapper extends Component {
  constructor() {
    super();

    this.state = {
      isHovering: false,
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentDidMount() {
    const img = new Image();
    img.src = 'https://s3.amazonaws.com/buffer-publish/images/drag-placeholder.png';
    img.onload = () => this.props.connectDragPreview(img);
  }

  onMouseEnter() {
    this.setState(state => ({ ...state, isHovering: true }));
  }

  onMouseLeave() {
    this.setState(state => ({ ...state, isHovering: false }));
  }

  /**
   * These styles ensure we don't show the focus ring when using
   * the mouse for drag and drop.
   */
  getStyle() {
    const transition = 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    // const hideOutline = this.state.isHovering || this.props.isDragging ? { outline: 'none' } : {};
    const hideOutline = { outline: 'none' };
    return { borderRadius: '4px', transition, ...hideOutline };
  }

  render() {
    const {
      postComponent: PostComponent,
      postProps,
      isDragging,
      connectDragSource,
      basic,
    } = this.props;

    const { isHovering } = this.state;

    return connectDragSource(
      <div
        aria-dropeffect="move"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        ref={(node) => {
          this.containerNode = node;
        }}
        draggable
        tabIndex={0}
        style={this.getStyle()}
      >
        <PostComponent
          {...postProps}
          draggable={!postProps.postDetails.error}
          dragging={isDragging}
          hovering={isHovering}
          fixed={postProps.isFixed}
          basic={basic}
        />
      </div>,
    );
  }
}

PostDragWrapper.propTypes = {
  handleDragPost: PropTypes.func, // eslint-disable-line
  profileId: PropTypes.string, // eslint-disable-line
  postComponent: PropTypes.func.isRequired,
  postProps: PropTypes.object.isRequired, // eslint-disable-line
  basic: PropTypes.bool,
  id: PropTypes.string.isRequired, // eslint-disable-line
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

export default DragSource('post', postSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))(PostDragWrapper);
