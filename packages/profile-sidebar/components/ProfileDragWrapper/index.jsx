import React, { useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';

import { DragSource, DropTarget } from 'react-dnd';
import ProfileListItem from '../ProfileListItem';

const profileSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const profileTarget = {
  drop(props) {
    props.onDropProfile({ commit: true });
  },

  hover(props, monitor, component) {
    if (!component) {
      return null;
    }
    // node = HTML Div element from imperative API
    const node = component.getNode();
    if (!node) {
      return null;
    }
    const { index: dragIndex } = monitor.getItem();
    const { index: hoverIndex, onDropProfile, profileLimit } = props;

    // Don't replace profile with itself...
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = node.getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Drop!
    onDropProfile({ dragIndex, hoverIndex, profileLimit });

    // We need to directly mutate the monitor state here
    // to ensure the currently dragged item index is updated.
    monitor.getItem().index = hoverIndex;
  },
};

const ProfileDragWrapper = React.forwardRef(
  ({ connectDragSource, connectDropTarget, ...profileProps }, ref) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current,
    }));
    return (
      <div
        aria-dropeffect="move"
        ref={elementRef}
        draggable
        tabIndex={0}
        style={{ outline: 'none' }}
      >
        <ProfileListItem {...profileProps} />
      </div>
    );
  }
);

ProfileDragWrapper.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired, // eslint-disable-line
};

export default DropTarget('profile', profileTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(
  DragSource('profile', profileSource, connect => ({
    connectDragSource: connect.dragSource(),
  }))(ProfileDragWrapper)
);
