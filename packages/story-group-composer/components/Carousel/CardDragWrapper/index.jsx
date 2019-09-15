import React, { useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';

import { DragSource, DropTarget } from 'react-dnd';
import CardItem from '../CardItem';

const cardSource = {
  beginDrag(props) {
    console.log('props', props);
    return {
      id: props.card.order,
      index: props.index,
    };
  },
};

const cardTarget = {
  drop(props) {
    props.onDropCard({ commit: true });
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
    const { index: hoverIndex, onDropCard, cardLimit } = props;
    console.log('dragIndex', dragIndex, 'hoverIndex', hoverIndex);

    // Don't replace profile with itself...
    if (dragIndex === hoverIndex) {
      return;
    }

    // other validations here...

    // Drop!
    onDropCard({ dragIndex, hoverIndex, cardLimit });

    // We need to directly mutate the monitor state here
    // to ensure the currently dragged item index is updated.
    monitor.getItem().index = hoverIndex;
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

export default DropTarget(
  'card',
  cardTarget,
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(
  DragSource(
    'card',
    cardSource,
    connect => ({
      connectDragSource: connect.dragSource(),
    }),
  )(CardDragWrapper),
);
