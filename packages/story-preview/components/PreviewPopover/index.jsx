import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Slider } from '@bufferapp/publish-shared-components';
import { Popover } from '@bufferapp/components';
import NoteWrapper from '../NoteWrapper';
import PreviewMedia from '../PreviewMedia';
import { storyPropTypes, userPropTypes } from '../../utils/commonPropTypes';

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
  view,
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
      view={view}
    />
  </Fragment>
);

/* eslint-enable react/prop-types */

const PreviewPopover = ({
  onCloseClick,
  onSaveNoteClick,
  stories,
  user,
  view,
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
            view={view}
          />
        </Slider>
      </SliderContainer>
    </Popover>
  );
};

PreviewPopover.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
  onSaveNoteClick: PropTypes.func.isRequired,
  user: userPropTypes, // eslint-disable-line react/require-default-props
  stories: PropTypes.arrayOf(storyPropTypes).isRequired,
  view: PropTypes.oneOf(['composer', 'queue']).isRequired,
};

export default PreviewPopover;
