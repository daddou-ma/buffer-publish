import React, { Component } from 'react';
import PropTypes from 'prop-types';

import flow from 'lodash.flow';
import { DragSource, DropTarget, DropTargetConnector } from 'react-dnd';
import ProfileListItem from '../ProfileListItem';

const profileSource = {
  beginDrag(props, monitor, component) {
    return {
      id: props.id,
      index: props.index,
      width: component.containerNode.offsetWidth,
    };
  },
};

const profileTarget = {
  drop(props, monitor, component) {
    component.decoratedComponentInstance.containerNode.blur();
    props.onDropProfile({ commit: true });
  },
  hover(props, monitor, component) {
    const { index: dragIndex } = monitor.getItem();
    const { index: hoverIndex, onDropProfile } = props;

    // Don't replace profile with itself...
    if (dragIndex === hoverIndex) {
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
    onDropProfile({ dragIndex, hoverIndex });

    // We need to directly mutate the monitor state here
    // to ensure the currently dragged item index is updated.
    monitor.getItem().index = hoverIndex;
  },
};

class ProfileDragWrapper extends Component {

  render() {
    const {
      isDragging,
      connectDragSource,
      connectDropTarget,
    } = this.props;
    const profileProps = this.props;

    return connectDragSource(
      connectDropTarget(
        <div
          aria-dropeffect="move"
          ref={(node) => { this.containerNode = node; }}
          draggable
          tabIndex={0}
        >
          <ProfileListItem
            {...profileProps}
          />
        </div>,
      ),
    );
  }
}

ProfileDragWrapper.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired, // eslint-disable-line
  isDragging: PropTypes.bool.isRequired,
};

export default flow(
  DragSource('profile', profileSource, (connect: DropTargetConnector, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget('profile', profileTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
)(ProfileDragWrapper);
