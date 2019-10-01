import React, { Component, useImperativeHandle, useRef } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DragSource, DropTarget } from 'react-dnd';
import CardItem from '../CardItem';
import CustomDragLayer from '../CustomDragLayer';

const cardSource = {
  canDrag(props) {
    return props.index < props.totalCards;
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
    /* const node = component.getNode();
    if (!node) {
      return null;
    }
    */
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
  position: 'absolute',
  :focus {
    outline: none;
  }
`;
class CardDragWrapper extends Component {
  componentDidMount() {
    const { connectDragPreview } = this.props;
    if (connectDragPreview) {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
      connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true,
      });
    }
  }

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      connectDragPreview,
      ...cardProps
    } = this.props;

    return compose(connectDragSource, connectDropTarget)(
      <div>
        <DragWrapper
          aria-dropeffect="move"
          ref={(node) => {
            this.containerNode = node;
          }}
          draggable
          tabIndex={0}
          style={wrapperStyle()}
        >
          <CardItem {...cardProps} />
        </DragWrapper>
      </div>,
    );
  }
}

CardDragWrapper.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  id: PropTypes.string,
};

CardDragWrapper.defaultProps = {
  id: null,
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
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),
    }),
  )(CardDragWrapper),
);
