import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Slider } from '@bufferapp/publish-shared-components';
import { Popover } from '@bufferapp/components';
import NoteWrapper from '../NoteWrapper';
import PreviewMedia from '../PreviewMedia';

const SliderContainer = styled.div`
  height: 592px;
  width: 725px;
`;

/* eslint-disable react/prop-types */

const SliderItem = ({
  storyToDisplay,
  onSaveNoteClick,
  user,
  numberOfStories,
}) => (
  <Fragment>
    <PreviewMedia
      story={storyToDisplay}
      user={user}
      numberOfStories={numberOfStories}
    />
    <NoteWrapper
      onSaveNoteClick={onSaveNoteClick}
      story={storyToDisplay}
    />
  </Fragment>
);

/* eslint-enable react/prop-types */

const PreviewPopover = ({
  onCloseClick,
  onSaveNoteClick,
  stories,
  user,
}) => {
  const numberOfStories = stories.length;
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const storyToDisplay = stories[currentStoryIndex];

  const showLeftArrow = currentStoryIndex > 0;
  const showRightArrow = currentStoryIndex < (stories.length - 1);

  const onArrowClick = (type) => {
    if (type === 'left' && showLeftArrow) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else if (type === 'right' && showRightArrow) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    }
  };

  return (
    <Popover
      width="100%"
      top="5rem"
    >
      <SliderContainer>
        <Slider
          onCloseClick={onCloseClick}
          showLeftArrow={showLeftArrow}
          showRightArrow={showRightArrow}
          onArrowClick={onArrowClick}
        >
          <SliderItem
            user={user}
            onSaveNoteClick={onSaveNoteClick}
            storyToDisplay={storyToDisplay}
            numberOfStories={numberOfStories}
          />
        </Slider>
      </SliderContainer>
    </Popover>
  );
};

PreviewPopover.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
  onSaveNoteClick: PropTypes.func.isRequired,
  user: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    handle: PropTypes.string,
  }).isRequired,
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      note: PropTypes.string,
      type: PropTypes.oneOf(['image', 'video', 'gif']),
      order: PropTypes.number,
      asset_url: PropTypes.string,
      thumbnail_url: PropTypes.string,
    }),
  ).isRequired,
};

export default PreviewPopover;
