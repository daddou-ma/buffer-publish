import React, { useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';

import { DragSource, DropTarget } from 'react-dnd';
import CardItem from '../CardItem';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.card.asset_url,
      index: props.index,
      card: props.card,
      onDropCard: props.onDropCard,
    };
  },
};

const cardTarget = {
  drop(props, monitor) {
    const { onDropCard } = monitor.getItem();
    /* cardSource, cardTarget */
    onDropCard(monitor.getItem(), props);
  },
};

const CardDragWrapper = React.forwardRef(
  ({
    connectDragSource,
    connectDropTarget,
    ...cardProps
  }, ref) => {
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
      >
        <CardItem {...cardProps} />
      </div>
    );
  },
);

CardDragWrapper.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired, // eslint-disable-line
};

// connectDragPreview: connect.dragPreview(),
export default DropTarget(
  'card',
  cardTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }),
)(
  DragSource(
    'card',
    cardSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(CardDragWrapper),
);
