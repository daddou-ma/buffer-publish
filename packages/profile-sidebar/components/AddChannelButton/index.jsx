import React from 'react';
import PropTypes from 'prop-types';
import { NavTag } from '@bufferapp/publish-shared-components';

import {
  CircleIcon,
  SidebarItem,
  ListItemContainer,
  StyledAddIcon,
} from './style';

const AddChannelButton = ({ onAddChannelUpgradeClick, label }) => {
  return (
    <ListItemContainer>
      <SidebarItem
        title={label}
        onItemClick={() => onAddChannelUpgradeClick()}
        /* eslint-disable no-nested-ternary */
        badges={<NavTag type="paywall" />}
        icon={
          <CircleIcon>
            <StyledAddIcon />
          </CircleIcon>
        }
        /* eslint-enable no-nested-ternary */
      />
    </ListItemContainer>
  );
};

AddChannelButton.propTypes = {
  onAddChannelUpgradeClick: PropTypes.func.isRequired,
  label: PropTypes.string,
};

AddChannelButton.defaultProps = {
  label: 'Add Channels',
};

export default AddChannelButton;
