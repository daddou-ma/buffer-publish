import React from 'react';
import { DragLayer } from 'react-dnd';
import styled from 'styled-components';
import {
  CoverImage,
} from '../CardItem/styles';

const layerStyles = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 4000,
  left: 0,
  top: 0,
  width: '180px',
  height: '320px',
};

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  let { x, y } = currentOffset;
  x -= 426.5;
  y -= 80;
  console.log('currentOffset', x, y);
  const transform = `translate(${x}px, ${y}px)`;

  return {
    width: '180px',
    height: '320px',
    transform,
    WebkitTransform: transform,
  };
}

const CustomDragLayer = (props) => {
  const { isDragging, sourceImage } = props;

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(props)}>
        <CoverImage src={sourceImage} />
      </div>
    </div>
  );
};

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))(CustomDragLayer);
