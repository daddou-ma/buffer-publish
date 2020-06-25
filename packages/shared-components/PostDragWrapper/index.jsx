import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { DragSource, DropTarget } from 'react-dnd';
import SwapIcon from '@bufferapp/ui/Icon/Icons/Swap';

const swapWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
};

const swapIconStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 19px',
  background: '#2C4BFF',
  borderRadius: '24px',
  color: '#FFFFFF',
};

const swapTextStyle = {
  marginLeft: '8px',
  fontSize: '14px',
  fontWeight: 'bold',
};

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
      onSwapPosts: props.postProps.onSwapPosts,
      profileId: props.profileId,
      basic: props.basic,
    };
  },
};

const postTarget = {
  drop(props, monitor) {
    const { onSwapPosts } = monitor.getItem();
    /* postSource, postTarget */
    onSwapPosts(monitor.getItem(), props);
  },
};

const getBgStyle = (isHovering, focus) => {
  if (isHovering || focus) return '#FFFFFF';
  return '#F5F5F5';
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
    img.src =
      'https://s3.amazonaws.com/buffer-publish/images/drag-placeholder.png';
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
  getStyle(isHovering, focus, isDragging) {
    const transition = 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    const hideOutline = { outline: 'none' };

    if (!isHovering && !isDragging) {
      return {
        background: getBgStyle(isHovering, focus),
        boxShadow: focus ? '0 0 2px 2px #ABB7FF' : 'none',
        position: 'relative',
        borderRadius: '4px',
        transition,
        width: '100%',
        ...hideOutline,
      };
    }
    return { borderRadius: '4px', width: '100%', transition, ...hideOutline };
  }

  renderSwapIcon() {
    return (
      <div style={swapWrapperStyle}>
        <div style={swapIconStyle}>
          <SwapIcon size="medium" color="#FFFFFF" />
          <span style={swapTextStyle}>Swap Posts</span>
        </div>
      </div>
    );
  }

  render() {
    const {
      postComponent: PostComponent,
      postProps,
      isDragging,
      connectDragSource,
      connectDropTarget,
      isOver,
      basic,
    } = this.props;

    const { isHovering } = this.state;

    return compose(
      connectDragSource,
      connectDropTarget
    )(
      <div
        aria-dropeffect="move"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        ref={node => {
          this.containerNode = node;
        }}
        draggable
        tabIndex={0}
        style={this.getStyle(isHovering, isOver, isDragging)}
      >
        {!isHovering && !isDragging && isOver && this.renderSwapIcon()}
        <PostComponent
          {...postProps}
          draggable={!postProps.postDetails.error}
          dragging={isDragging}
          hovering={isHovering}
          isOver={isOver}
          fixed={postProps.isFixed}
          basic={basic}
        />
      </div>
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
  connectDropTarget: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isOver: PropTypes.bool,
};

export default DropTarget('post', postTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('post', postSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }))(PostDragWrapper)
);
