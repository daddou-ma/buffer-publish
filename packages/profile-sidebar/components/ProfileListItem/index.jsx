import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SidebarListItem } from '@bufferapp/ui';
import { Warning, Locked } from '@bufferapp/ui/Icon';
import { grayLight, transparent } from '@bufferapp/ui/style/colors';

const ListItemContainer = styled.div`
  margin: 0 0 8px;
  border-radius: 4px;
  background-color: ${props =>
    props.locked
      ? grayLight
      : props.disconnected
      ? 'rgba(224, 54, 79, 0.15)'
      : transparent};
`;

const getCount = ({ pendingCount }) => {
  if (pendingCount < 0 || pendingCount === 0) {
    return '0';
  }
  if (pendingCount) {
    return pendingCount.toString();
  }
};

const handleClick = ({ onClick }) => {
  onClick();
  /* move focus to tabs after selecting profile */
  const queueTab = document.querySelector('#tabs a');
  if (queueTab) queueTab.focus();
};

const ProfileListItem = ({
  avatarUrl,
  type,
  pendingCount,
  handle,
  locked,
  disconnected,
  selected,
  onClick,
  showProfilesDisconnectedModal,
  location,
}) => {
  const user = {
    id: '',
    name: handle,
    profileImageUrl:
      avatarUrl || 'https://s3.amazonaws.com/buffer-ui/Default+Avatar.png',
    network: type,
  };

  const title = location ? `${handle}, ${location} ` : `${handle}`;

  return (
    <ListItemContainer locked={locked} disconnected={disconnected}>
      <SidebarListItem
        title={title}
        onItemClick={() => handleClick({ onClick })}
        badges={getCount({ pendingCount })}
        badgeIcon={locked ? <Locked /> : disconnected ? <Warning /> : null}
        user={user}
        selected={selected}
      />
    </ListItemContainer>
  );
};

ProfileListItem.propTypes = {
  handle: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  type: PropTypes.oneOf([
    'facebook',
    'instagram',
    'twitter',
    'linkedin',
    'pinterest',
  ]).isRequired,
  pendingCount: PropTypes.number,
  locked: PropTypes.bool,
  disconnected: PropTypes.bool,
  selected: PropTypes.bool,
  location: PropTypes.string,
  onClick: PropTypes.func,
};

ProfileListItem.defaultProps = {
  avatarUrl: null,
  locked: false,
  disconnected: false,
  pendingCount: null,
  selected: false,
  location: null,
};

export default ProfileListItem;
