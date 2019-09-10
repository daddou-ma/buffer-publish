import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white } from '@bufferapp/ui/style/colors';
import { Popover } from '@bufferapp/components';
import NoteWrapper from '../NoteWrapper';
import PreviewMedia from '../PreviewMedia';

const ContentWrapper = styled.div`
  background-color: ${white};
  display: flex;
  height: 592px;
  width: 629px;
`;

const PreviewPopover = ({
  onOverlayClick,
  onSaveNoteClick,
  // dummy data
  user = {
    avatarUrl: 'https://pbs.twimg.com/profile_images/988613046510628866/Io1ZQUpy_400x400.jpg',
    handle: 'joelgascoigne',
  },
  story = {
    note: '',
    type: 'image',
    order: 1,
    asset_url: 'https://images.unsplash.com/photo-1562887189-e5d078343de4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80',
    thumbnail_url: '',
  },
  story1 = {
    note: '',
    type: 'video',
    order: 1,
    asset_url: 'http://content.bitsontherun.com/videos/bkaovAYt-52qL9xLP.mp4',
    thumbnail_url: 'http://assets-jpcust.jwpsrv.com/thumbnails/to6w2sch-320.jpg',
  },
}) => (
  <Popover
    width="100%"
    top="5rem"
    onOverlayClick={onOverlayClick}
  >
    <ContentWrapper>
      <PreviewMedia
        story={story1}
        user={user}
      />
      <NoteWrapper
        onSaveNoteClick={onSaveNoteClick}
        story={story}
      />
    </ContentWrapper>
  </Popover>
);

PreviewPopover.propTypes = {
  onOverlayClick: PropTypes.func.isRequired,
  onSaveNoteClick: PropTypes.func.isRequired,
  user: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    handle: PropTypes.string,
  }).isRequired,
  story: PropTypes.shape({
    note: PropTypes.string,
    type: PropTypes.oneOf(['image', 'video', 'gif']),
    order: PropTypes.number,
    asset_url: PropTypes.string,
    thumbnail_url: PropTypes.string,
  }).isRequired,
};

export default PreviewPopover;
