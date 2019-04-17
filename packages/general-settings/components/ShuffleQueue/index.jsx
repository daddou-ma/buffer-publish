import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button, Popover } from '@bufferapp/components';
import { ConfirmModal } from '@bufferapp/publish-shared-components';

const shuffleQueueWrapperStyle = {
  display: 'flex',
  flexDirection: 'row',
  padding: '0.5rem 0px',
};

const headerTextWrapperStyle = {
  display: 'flex',
  marginBottom: '0.5rem',
  marginTop: '0.5rem',
};

const textWrapperStyle = {
  // flex: '1 1 0%',
};

const buttonWrapperStyle = {
  textAlign: 'right',
  whiteSpace: 'nowrap',
  marginLeft: '0.5rem',
  minWidth: '175px',
  alignSelf: 'flex-end',
};

const leftContentStyle = {
  flex: '1 1 0%',
};

const ShuffleQueue = ({
  onShuffleQueueClick,
  onConfirmShuffleQueueClick,
  onCloseModal,
  profileName,
  profileService,
  avatar,
  showModal,
}) => (
  <div style={shuffleQueueWrapperStyle}>
    {showModal && <Popover
      onOverlayClick={onCloseModal}
    >
      <ConfirmModal
        onConfirmClick={onConfirmShuffleQueueClick}
        onCloseModal={onCloseModal}
        profileService={profileService}
        avatar={avatar}
        heading={'Are you sure?'}
        body={`Your first 200 queued updates for <span style="font-weight:bold">${profileName}</span> will be shuffled
        into a completely random order.`}
        btnText={'Shuffle Queue'}
      />
    </Popover>}
    <div style={leftContentStyle}>
      <div style={headerTextWrapperStyle}>
        <Text color={'black'}>
          Shuffle Queue
        </Text>
      </div>
      <div style={textWrapperStyle}>
        <Text size="small">
          Your first 200 queued updates will be shuffled into a completely random order.
        </Text>
      </div>
    </div>
    <div style={buttonWrapperStyle}>
      <Button
        fillContainer
        onClick={onShuffleQueueClick}
      >
        Shuffle Queue
      </Button>
    </div>
  </div>
);

ShuffleQueue.defaultProps = {
  showModal: false,
};

ShuffleQueue.propTypes = {
  onShuffleQueueClick: PropTypes.func.isRequired,
  onConfirmShuffleQueueClick: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  profileName: PropTypes.string.isRequired,
  profileService: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  showModal: PropTypes.bool,
};

export default ShuffleQueue;
