import React, { useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget, DragPreviewImage } from 'react-dnd';
import SwapIcon from '@bufferapp/ui/Icon/Icons/Swap';
import styled from 'styled-components';

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

const SwapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

const SwapIconStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 19px;
  background: #2c4bff;
  border-radius: 24px;
  color: #ffffff;
`;

const SwapText = styled.span`
  margin-left: 8px;
  font-size: 14px;
  font-weight: bold;
`;

const SwapIconStyled = () => (
  <SwapWrapper>
    <SwapIconStyle>
      <SwapIcon size="medium" color="#FFFFFF" />
      <SwapText>Swap Links</SwapText>
    </SwapIconStyle>
  </SwapWrapper>
);

const wrapperStyle = ({ isOver, isDragging }) => {
  const transition = 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  const hideOutline = { outline: 'none' };

  return { transition, ...hideOutline };
};

const DragWrapper = styled.div`
  position: relative;
  :focus {
    outline: none;
  }
`;

const LinkDragWrapper = React.forwardRef(
  (
    {
      connectDragSource,
      connectDropTarget,
      connectDragPreview,
      ...customLinkProps
    },
    ref
  ) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current,
    }));
    const { isOver, isDragging } = customLinkProps;

    return (
      <>
        <DragPreviewImage
          src="https://buffer-publish.s3.amazonaws.com/images/drag-link-placeholder.png"
          connect={connectDragPreview}
        />
        <DragWrapper
          aria-dropeffect="move"
          ref={elementRef}
          draggable
          tabIndex={0}
          style={wrapperStyle({ isOver, isDragging })}
        >
          {!isDragging && isOver && <SwapIconStyled />}
          <LinkPreview isTarget={isOver} {...customLinkProps} />
        </DragWrapper>
      </>
    );
  }
);

LinkDragWrapper.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
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
