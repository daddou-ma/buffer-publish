import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@bufferapp/components';
import ModalActionCreators from '../shared-components/modal/actionCreators';

const openModal = (video, draftId, composerPosition) => {
  ModalActionCreators.openModal('InstagramThumbnailEditor', {
    video,
    draftId,
    composerPosition,
  });
};

const wrapperStyle = {
  padding: '0px 8px 8px',
  width: '144px',
  textAlign: 'center',
};

const InstagramThumbnailButton = ({ video, draftId, composerPosition }) => (
  <div style={wrapperStyle}>
    <Button
      onClick={e => {
        e.preventDefault();
        openModal(video, draftId, composerPosition);
      }}
    >
      {' '}
      Edit Cover
    </Button>
  </div>
);

InstagramThumbnailButton.propTypes = {
  video: PropTypes.object,
  draftId: PropTypes.string.isRequired,
  composerPosition: PropTypes.object,
};

InstagramThumbnailButton.defaultProps = {
  video: {},
  composerPosition: null,
};

export default InstagramThumbnailButton;
