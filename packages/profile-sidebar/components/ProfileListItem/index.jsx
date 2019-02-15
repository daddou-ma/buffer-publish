import React from 'react';
import PropTypes from 'prop-types';
import { Text, LockIcon, Link } from '@bufferapp/components';
import { SensitiveData } from '@bufferapp/publish-shared-components';
import { calculateStyles } from '@bufferapp/components/lib/utils';
import { curiousBlueUltraLight } from '@bufferapp/components/style/color';
import ProfileBadge from '../ProfileBadge';

const NewDisconnectedIcon = ({ showProfilesDisconnectedModal }) => (
  <Link
    unstyled
    onClick={(e) => {
      e.stopPropagation();
      showProfilesDisconnectedModal();
    }}
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM7 4C7 3.44771 7.44772 3 8 3C8.55229 3 9 3.44771 9 4V9C9 9.55228 8.55229 10 8 10C7.44772 10 7 9.55228 7 9V4ZM8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11Z"
        fill="#E0364F"
      />
    </svg>
  </Link>
);
NewDisconnectedIcon.propTypes = {
  showProfilesDisconnectedModal: PropTypes.func.isRequired,
};

const profileBadgeWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  marginRight: '16px',
};

const Notifications = ({ notifications }) => (
  <Text size="mini">{notifications}</Text>
);

Notifications.propTypes = {
  notifications: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Notifications.defaultProps = {
  notifications: null,
};

const ProfileListItem = ({
  avatarUrl,
  type,
  notifications,
  handle,
  locked,
  disconnected,
  selected,
  onClick,
  showProfilesDisconnectedModal,
}) => {
  const handleClick = () => {
    onClick();
    /* move focus to tabs after selecting profile */
    const queueTab = document.querySelector('#tabs a');
    if (queueTab) queueTab.focus();
  };

  return (
    <Link
      href={'#'}
      onClick={e => {
        e.preventDefault();
        handleClick();
      }}
      unstyled
    >
      <div
        style={calculateStyles(
          {
            default: {
              display: 'flex',
              alignItems: 'center',
              padding: '0.5rem',
              justifyContent: 'space-between',
              lineHeight: 1,
            },
            selected: {
              background: curiousBlueUltraLight,
              borderRadius: '4px',
            },
          },
          {
            selected,
          },
        )}
      >
        <div style={profileBadgeWrapperStyle}>
          <div style={{ marginRight: '16px' }}>
            <ProfileBadge avatarUrl={avatarUrl} type={type} />
          </div>
          <SensitiveData>
            <Text size={'small'} color={selected ? 'black' : 'shuttleGray'}>
              {handle}
            </Text>
          </SensitiveData>
        </div>
        {locked ? (
          <LockIcon />
        ) : disconnected ? (
          <NewDisconnectedIcon
            showProfilesDisconnectedModal={showProfilesDisconnectedModal}
          />
        ) : (
          <Notifications notifications={notifications} />
        )}
      </div>
    </Link>
  );
};

ProfileListItem.propTypes = {
  ...Notifications.propTypes,
  ...ProfileBadge.propTypes,
  handle: PropTypes.string.isRequired,
  locked: PropTypes.bool,
  selected: PropTypes.bool,
};

ProfileListItem.defaultProps = {
  locked: false,
  selected: false,
};

export default ProfileListItem;
