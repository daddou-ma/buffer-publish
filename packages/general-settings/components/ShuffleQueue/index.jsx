import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Divider } from '@bufferapp/components';
import { Text, Button } from '@bufferapp/ui';
import { ConfirmModal } from '@bufferapp/publish-shared-components';

const shuffleQueueWrapperStyle = {
  display: 'flex',
  flexDirection: 'row',
  padding: '0.5rem 0px',
};

const buttonWrapperStyle = {
  marginLeft: '0.5rem',
  minWidth: '175px',
  alignSelf: 'center',
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
  loading,
}) => (
  <div>
    <Divider />
    <div style={shuffleQueueWrapperStyle}>
      {showModal && (
        <Popover onOverlayClick={onCloseModal}>
          <ConfirmModal
            onConfirmClick={onConfirmShuffleQueueClick}
            onCloseModal={onCloseModal}
            profileService={profileService}
            avatar={avatarUrl}
            heading={'Are you sure?'}
            body={`Your first 200 queued updates for <span style="font-weight:bold">${profileName}</span> will be shuffled
          into a completely random order.`}
            btnText={loading ? 'Shuffling Queue..' : 'Shuffle Queue'}
          />
        </Popover>
      )}
      <div style={leftContentStyle}>
        <Text type="h3">Shuffle Queue</Text>
        <Text type="p">
          Your first 200 queued updates will be shuffled into a completely
          random order.
        </Text>
      </div>
      <div style={buttonWrapperStyle}>
        <Button
          fullWidth
          type="primary"
          label="Shuffle Queue"
          onClick={onShuffleQueueClick}
        />
      </div>
    </div>
  </div>
);

ShuffleQueue.defaultProps = {
  showModal: false,
  profileName: null,
  profileService: null,
  avatarUrl: null,
  loading: false,
};

ShuffleQueue.propTypes = {
  onShuffleQueueClick: PropTypes.func.isRequired,
  onConfirmShuffleQueueClick: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool,
  profileName: PropTypes.string,
  profileService: PropTypes.string,
  avatarUrl: PropTypes.string,
  loading: PropTypes.bool,
};

export default ShuffleQueue;
