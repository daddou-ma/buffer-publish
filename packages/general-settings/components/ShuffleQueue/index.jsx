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

const buttonWrapperStyle = {
  textAlign: 'right',
  whiteSpace: 'nowrap',
  marginLeft: '0.5rem',
  minWidth: '175px',
  alignSelf: 'flex-end',
  flex: '0.3 1 0%',
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
  avatarUrl,
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
        avatar={avatarUrl}
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
      <Text size="small">
        Your first 200 queued updates will be shuffled into a completely random order.
      </Text>
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
  profileName: null,
  profileService: null,
  avatarUrl: null,
};

ShuffleQueue.propTypes = {
  onShuffleQueueClick: PropTypes.func.isRequired,
  onConfirmShuffleQueueClick: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool,
  profileName: PropTypes.string,
  profileService: PropTypes.string,
  avatarUrl: PropTypes.string,
};

export default ShuffleQueue;
