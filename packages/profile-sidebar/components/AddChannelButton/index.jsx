import React from 'react';
import PropTypes from 'prop-types';
import { NavTag } from '@bufferapp/publish-shared-components';

import {
  CircleIcon,
  SidebarItem,
  ListItemContainer,
  StyledAddIcon,
} from './style';

const AddChannelButton = ({ onAddChannelUpgradeClick }) => {
  return (
    <ListItemContainer>
      <SidebarItem
        title="Add Channels"
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
};

export default AddChannelButton;
