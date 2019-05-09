import React from 'react';
import { DropTarget } from 'react-dnd';

const reorderTarget = {
  drop(props, monitor) {
    const {
      postProps: { id: postId },
      onDropPost,
    } = monitor.getItem();
    // onDropPost(postId, props.timestamp, props.day);
  },
};

function PostReorderDropLine({ connectDropTarget, isDragging, isOver }) {
  return connectDropTarget(
    <div
      style={{
        // padding: 'translateY(4px)',
        padding: '4px 0',
        marginBottom: '-6px',
      }}
    >
      <div
        style={{
          height: '5px',
          background: isOver ? '#ABB7FF' : 'transparent',
          borderRadius: '4px',
        }}
      />
    </div>,
  );
}

const PostReorderDropLineDropTarget = DropTarget(
  'post',
  reorderTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isDragging: !!monitor.getItem(),
  }),
)(PostReorderDropLine);

export default PostReorderDropLineDropTarget;
