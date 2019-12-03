import React, { useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';

import LinkPreview from '../LinkPreview';

const customLinkSource = {
  beginDrag(props) {
    return {
      id: props.item._id,
      item: props.item,
      onSwapCustomLinks: props.onSwapCustomLinks,
    };
  },
};

const customLinkTarget = {
  drop(props, monitor) {
    const { onSwapCustomLinks } = monitor.getItem();
    const linkSource = monitor.getItem().item;
    const linkTarget = props.item;

    onSwapCustomLinks({
      customLinkSource: linkSource,
      customLinkTarget: linkTarget,
    });
  },
};

const LinkDragWrapper = React.forwardRef(
  ({ connectDragSource, connectDropTarget, ...customLinkProps }, ref) => {
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
        <LinkPreview {...customLinkProps} />
      </div>
    );
  }
);

LinkDragWrapper.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget(
  'customLink',
  customLinkTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  })
)(
  DragSource('customLink', customLinkSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }))(LinkDragWrapper)
);

/*
export default DropTarget('customLink', customLinkTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(
  DragSource('customLink', customLinkSource, connect => ({
    connectDragSource: connect.dragSource(),
  }))(LinkDragWrapper)
);
*/
