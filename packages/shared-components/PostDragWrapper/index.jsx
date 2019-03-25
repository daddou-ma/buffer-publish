import React, { Component } from 'react';
import PropTypes from 'prop-types';

import flow from 'lodash.flow';
import { DragSource, DropTarget } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const postSource = {
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
  drop(props, monitor, component) {
    const { onDropPost } = props.postProps;
    onDropPost({ commit: true });

    // This tricky line removes the focus from the 'just dragged' post
    // so we don't see a flash of the CSS outline
    component.decoratedComponentInstance.containerNode.blur();
  },
  canDrop(props, monitor, component) {
    const draggingPost = monitor.getItem();
    return (!props.postProps.isFixed) && (!draggingPost.postProps.isFixed);
  },
  hover(props, monitor, component) {
    const { index: dragIndex, onDropPost } = monitor.getItem();
    const { index: hoverIndex } = props;

    // Don't replace post with itself...
    if (dragIndex === hoverIndex || (!monitor.canDrop())) {
      return;
    }

    // Determine rectangle on screen
    const node = component.decoratedComponentInstance.containerNode;
    const hoverBoundingRect = node.getBoundingClientRect();

    // Get vertical middle
    const hoverThird = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 3;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverThird) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverThird) {
      return;
    }

    // Drop!
    onDropPost({ dragIndex, hoverIndex });

    // We need to directly mutate the monitor state here
    // to ensure the currently dragged item index is updated.
    monitor.getItem().index = hoverIndex;
  },
};

class PostDragWrapper extends Component {
  constructor() {
    super();

    this.state = {
      isHovering: false,
      isKbdGrabbed: false,
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    // The drag layer is <PostDragLayer /> in `queue/components/QueuedPosts`
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  onMouseEnter() {
    this.setState(state => ({ ...state, isHovering: true }));
  }

  onMouseLeave() {
    this.setState(state => ({ ...state, isHovering: false }));
  }

  onKeyDown(event) {
    const { postProps: { index, onDropPost } } = this.props;
    if (event.key === ' ') {
      event.preventDefault();
      const isKbdGrabbed = !this.state.isKbdGrabbed;
      this.setState(state => ({ ...state, isKbdGrabbed }));
      if (!isKbdGrabbed) {
        onDropPost({ commit: true });
      }
    }
    if (event.key === 'ArrowDown' && this.state.isKbdGrabbed) {
      event.preventDefault();
      onDropPost({ dragIndex: index, hoverIndex: index + 1, keyboardDirection: 'down' });
    }
    if (event.key === 'ArrowUp' && this.state.isKbdGrabbed) {
      event.preventDefault();
      onDropPost({ dragIndex: index, hoverIndex: index - 1, keyboardDirection: 'up' });
    }
  }

  onBlur() {
    this.setState(state => ({ ...state, isKbdGrabbed: false }));
  }

  /**
   * These styles add a bit of animation to when you pick up a post with
   * the space bar, and also ensure we don't show the focus ring when using
   * the mouse for drag and drop.
   */
  getStyle() {
    const transition = 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    const hideOutline = (this.state.isHovering || this.props.isDragging)
      ? { outline: 'none' } : {};
    return this.state.isKbdGrabbed
      ? { transition, transform: 'scale(1.01)', ...hideOutline }
      : { transition, ...hideOutline };
  }

  render() {
    const {
      postComponent: PostComponent,
      postProps,
      isDragging,
      connectDragSource,
      connectDropTarget,
      basic,
    } = this.props;

    const { isHovering, isKbdGrabbed } = this.state;

    return connectDragSource(
      connectDropTarget(
        <div
          aria-grabbed={isKbdGrabbed}
          aria-dropeffect="move"
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          ref={(node) => { this.containerNode = node; }}
          draggable
          tabIndex={0}
          onKeyDown={this.onKeyDown}
          onBlur={this.onBlur}
          style={this.getStyle()}
        >
          <PostComponent
            {...postProps}
            draggable
            dragging={isDragging}
            hovering={isHovering || isKbdGrabbed}
            fixed={postProps.isFixed}
            basic={basic}
          />
        </div>,
      ),
    );
  }
}

PostDragWrapper.propTypes = {
  handleDragPost: PropTypes.func, // eslint-disable-line
  profileId: PropTypes.string, // eslint-disable-line
  postComponent: PropTypes.func.isRequired,
  postProps: PropTypes.object.isRequired, // eslint-disable-line
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired, // eslint-disable-line
  isDragging: PropTypes.bool.isRequired,
  basic: PropTypes.bool,
};

export default flow(
  DragSource('post', postSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget('post', postTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
)(PostDragWrapper);
