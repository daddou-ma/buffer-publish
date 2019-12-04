import React from 'react';
import { DropTarget } from 'react-dnd';

import PostEmptySlot from './index';

const slotTarget = {
  drop(props, monitor) {
    const {
      postProps: { id: postId },
      onDropPost,
    } = monitor.getItem();
    onDropPost(postId, props.timestamp, props.day);
  },
};

/**
 * This is a simple High Order Component that wraps our slot component and makes it
 * something that we can 'drop' a post onto. This is done with `react-dnd`. Refer to the
 * `react-dnd` documentation for more details.
 */
function Slot({ connectDropTarget, isOver, ...rest }) {
  return connectDropTarget(
    <div>
      <PostEmptySlot focus={isOver} {...rest} />
    </div>
  );
}

const SlotDropTarget = DropTarget('post', slotTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(Slot);

export default SlotDropTarget;
