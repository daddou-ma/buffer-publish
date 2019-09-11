import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Slider } from '@bufferapp/publish-shared-components';
import { Popover } from '@bufferapp/components';
import NoteWrapper from '../NoteWrapper';
import PreviewMedia from '../PreviewMedia';

const SliderContainer = styled.div`
  height: 592px;
`;

const stories = [
  {
    note: 'Note 1',
    type: 'image',
    order: 0,
    asset_url: 'https://images.unsplash.com/photo-1562887189-e5d078343de4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80',
    thumbnail_url: '',
  },
  {
    note: 'Note 2',
    type: 'video',
    order: 1,
    asset_url: 'http://content.bitsontherun.com/videos/bkaovAYt-52qL9xLP.mp4',
    thumbnail_url: 'http://assets-jpcust.jwpsrv.com/thumbnails/to6w2sch-320.jpg',
  },
];

const PreviewPopover = ({
  onCloseClick,
  onSaveNoteClick,
  //stories,
  user,
}) => {
  const [currentStory, setCurrentStory] = useState(0);
  const storyElement = stories[currentStory];

  const showLeftArrow = currentStory > 0;
  const showRightArrow = currentStory < (stories.length - 1);

  const onArrowClick = (type) => {
    if (type === 'left' && showLeftArrow) {
      setCurrentStory(currentStory - 1);
    } else if (type === 'right' && showRightArrow) {
      setCurrentStory(currentStory + 1);
    }
  };

  return (
    <Popover
      width="100%"
      top="5rem"
    >
      <SliderContainer>
        <Slider
          height={592}
          width={629}
          onCloseClick={onCloseClick}
          showLeftArrow={showLeftArrow}
          showRightArrow={showRightArrow}
          onArrowClick={onArrowClick}
        >
          <PreviewMedia
            story={storyElement}
            user={user}
          />
          <NoteWrapper
            onSaveNoteClick={onSaveNoteClick}
            story={storyElement}
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
