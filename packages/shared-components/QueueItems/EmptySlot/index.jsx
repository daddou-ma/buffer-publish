import React from 'react';
import PropTypes from 'prop-types';

import PostEmptySlot from '../../PostEmptySlot/dropTarget';

const EmptySlot = ({
  item,
  pinned,
  customLabel,
  customHoverMessage,
  onEmptySlotClick,
}) => {
  const { id, slot, profileService } = item;
  return (
    <PostEmptySlot
      key={id}
      time={slot.label}
      timestamp={slot.timestamp}
      day={slot.dayText}
      service={profileService}
      customLabel={customLabel}
      customHoverMessage={customHoverMessage}
      onClick={() =>
        onEmptySlotClick({
          dueTime: slot.label,
          profile_service: profileService,
          scheduled_at: slot.timestamp,
          scheduledAt: slot.timestamp,
          due_at: slot.timestamp,
          pinned,
        })
      }
    />
  );
};

EmptySlot.propTypes = {
  item: PropTypes.shape({
    slot: PropTypes.shape({
      dayText: PropTypes.string,
      label: PropTypes.string,
      timestamp: PropTypes.string,
    }),
    id: PropTypes.string,
    profileService: PropTypes.string,
  }).isRequired,
  onEmptySlotClick: PropTypes.func,
  pinned: PropTypes.bool,
  customLabel: PropTypes.string,
  customHoverMessage: PropTypes.string,
};

EmptySlot.defaultProps = {
  pinned: false,
  customLabel: null,
  customHoverMessage: null,
  onEmptySlotClick: () => {},
};

export default EmptySlot;
