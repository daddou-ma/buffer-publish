import React, { Component, useImperativeHandle, useRef } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { DragSource, DropTarget } from 'react-dnd';

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

const postTarget = {
  /*
  drop(props) {
    props.onDropPost({ commit: true });
  },
   */

  drop(props, monitor) {
    const { postProps: { id: postId }, onDropPost } = monitor.getItem();
    // onDropPost(postId, props.timestamp, props.day);
  },

  hover(props, monitor, component) {
    if (!component) {
      return null;
    }
    // console.log('dragging post', sourceProps, targetProps);
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
  getStyle(isHovering, focus) {
    const transition = 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    // const hideOutline = this.state.isHovering || this.props.isDragging ? { outline: 'none' } : {};
    const hideOutline = { outline: 'none' };

    return {
      background: getBgStyle(isHovering, focus),
      cursor: 'pointer',
      border: isHovering ? '1px solid #B8B8B8' : '1px solid transparent',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: 'normal',
      fontSize: '14px',
      color: focus ? '#3D3D3D' : '#636363',
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '8px',
      boxShadow: focus ? '0 0 0 3px #ABB7FF' : 'none',
      position: 'relative',
      borderRadius: '4px',
      transition,
      ...hideOutline,
    };
    // return { borderRadius: '4px', transition, ...hideOutline };
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
        style={this.getStyle(isHovering, isOver)}
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
