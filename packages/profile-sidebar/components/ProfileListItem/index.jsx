import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SidebarListItem } from '@bufferapp/ui';
import { Warning } from '@bufferapp/ui/Icon';
import { transparent, red } from '@bufferapp/ui/style/colors';
import { borderRadius } from '@bufferapp/ui/style/borders';

const ListItemContainer = styled.div`
  margin: 0 0 8px;
  border-radius: ${borderRadius};
  background-color: ${transparent};
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
  disconnected,
  selected,
  onClick,
  location,
}) => {
  const user = {
    id: '',
    name: handle,
    profileImageUrl: avatarUrl,
    fallbackUrl: 'https://s3.amazonaws.com/buffer-ui/Default+Avatar.png',
    network: type,
  };

  const title = location ? `${handle} ${location} ` : `${handle}`;
  return (
    <ListItemContainer>
      <SidebarListItem
        title={title}
        onItemClick={() => handleClick({ onClick })}
        badges={`${getCount({ pendingCount })}`}
        badgeIcon={disconnected ? <Warning color={red} /> : null}
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
  disconnected: PropTypes.bool,
  selected: PropTypes.bool,
  location: PropTypes.string,
  onClick: PropTypes.func,
};

ProfileListItem.defaultProps = {
  avatarUrl: null,
  disconnected: false,
  pendingCount: null,
  selected: false,
  location: null,
  onClick: () => {},
};

export default ProfileListItem;
