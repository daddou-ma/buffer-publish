import React, { useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DragSource, DropTarget } from 'react-dnd';
import CardItem from '../CardItem';

const cardSource = {
  canDrag(props) {
    return props.index < props.totalCards;
  },
  endDrag(props, monitor) {
    const { onDropCard } = props;
    onDropCard(monitor.getItem(), props, true);
  },
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
  canDrop(props, monitor) {
    return props.index !== monitor.getItem().index;
  },
  drop(props, monitor) {
    const { onDropCard } = monitor.getItem();
    /* cardSource, cardTarget */
    onDropCard(monitor.getItem(), props);
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
    const { onDropCard } = props;
    /* cardSource, cardTarget */
    onDropCard(monitor.getItem(), props);
  },
};

const wrapperStyle = () => {
  const transition = 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  const hideOutline = { outline: 'none' };

  return { transition, ...hideOutline };
};

const DragWrapper = styled.div`
  :focus {
    outline: none;
  }
`;

const CardDragWrapper = React.forwardRef(
  ({ connectDragSource, connectDropTarget, ...cardProps }, ref) => {
    const elementRef = useRef(null);
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
        style={wrapperStyle()}
      >
        <CardItem {...cardProps} />
      </DragWrapper>
    );
  }
);

CardDragWrapper.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  id: PropTypes.string,
};

CardDragWrapper.defaultProps = {
  id: null,
};

export default DropTarget('card', cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('card', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))(CardDragWrapper)
);
