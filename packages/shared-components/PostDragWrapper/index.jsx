import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { DragSource, DropTarget } from 'react-dnd';
import { RefreshIcon } from '@bufferapp/components';

const swapWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
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
      onSwapPost: props.postProps.onSwapPost,
      profileId: props.profileId,
      basic: props.basic,
    };
  },
};

const postTarget = {
  drop(props, monitor) {
    const { onSwapPost } = monitor.getItem();
    // postSource, postTarget
    onSwapPost(monitor.getItem(), props);
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
  getStyle(isHovering, focus, isDragging) {
    const transition = 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    // const hideOutline = this.state.isHovering || this.props.isDragging ? { outline: 'none' } : {};
    const hideOutline = { outline: 'none' };

    if (!isHovering && !isDragging) {
      return {
        background: getBgStyle(isHovering, focus),
        boxShadow: focus ? '0 0 0 3px #ABB7FF' : 'none',
        position: 'relative',
        borderRadius: '4px',
        transition,
        ...hideOutline,
      };
    }
    return { borderRadius: '4px', transition, ...hideOutline };
  }

  renderSwapIcon() {
    return (
      <div style={swapWrapperStyle}>
        <RefreshIcon size={{ width: '36px' }} color="#ABB7FF" />
        <div style={{ color: '#ABB7FF', fontSize: '13px' }}>Swap posts</div>
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

    return compose(connectDragSource, connectDropTarget)(
      <div
        aria-dropeffect="move"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        ref={(node) => {
          this.containerNode = node;
        }}
        draggable
        tabIndex={0}
        style={this.getStyle(isHovering, isOver, isDragging)}
      >
        {(!isHovering && !isDragging && isOver) && this.renderSwapIcon()}
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
  connectDropTarget: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isOver: PropTypes.bool,
};

export default DropTarget('post', postTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}),
)(
  DragSource('post', postSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }),
  )(PostDragWrapper),
);
