import React, { useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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

const getStyle = (isDragging) => {
  const transition = 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  const hideOutline = { outline: 'none' };

  if (isDragging) {
    return {
      opacity: 0.5,
      ...hideOutline,
    };
  }
  return { transition, ...hideOutline };
};

const DragWrapper = styled.div`
  :focus {
    outline: none;
  }
`;

const CardDragWrapper = React.forwardRef(
  ({
    connectDragSource,
    connectDropTarget,
    ...cardProps
  }, ref) => {
    const elementRef = useRef(null);
    const { isDragging } = cardProps;
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current,
    }));
    return (
      <DragWrapper
        aria-dropeffect="move"
        ref={elementRef}
        draggable
        tabIndex={0}
        style={getStyle(isDragging)}
      >
        <CardItem {...cardProps} />
      </DragWrapper>
    );
  },
);

CardDragWrapper.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired, // eslint-disable-line
};

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
