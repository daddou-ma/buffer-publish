import React from 'react';
import PropTypes from 'prop-types';
import { Text, LockIcon, Link } from '@bufferapp/components';
import { SensitiveData } from '@bufferapp/publish-shared-components';
import { calculateStyles } from '@bufferapp/components/lib/utils';
import Avatar from '@bufferapp/ui/Avatar';
import { blue } from '@bufferapp/ui/style/colors';

const NewDisconnectedIcon = ({ showProfilesDisconnectedModal, selected }) => (
  <Link
    unstyled
    onClick={e => {
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
        fill={selected ? 'white' : '#E0364F'}
      />
    </svg>
  </Link>
);
NewDisconnectedIcon.propTypes = {
  showProfilesDisconnectedModal: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

const profileBadgeWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
};

const containerUnstyled = {
  textDecoration: 'none',
  outline: 'none',
};

const PendingCountNotification = ({ pendingCount, selected }) => (
  <Text size="mini" color={selected ? 'white' : 'shuttleGray'}>
    {pendingCount < 0 ? 0 : pendingCount}
  </Text>
);

const handleStyle = {
  width: '120px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

PendingCountNotification.propTypes = {
  pendingCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

PendingCountNotification.defaultProps = {
  pendingCount: null,
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
  const handleClick = () => {
    onClick();
    /* move focus to tabs after selecting profile */
    const queueTab = document.querySelector('#tabs a');
    if (queueTab) queueTab.focus();
  };

  return (
    <div
      onClick={e => {
        e.preventDefault();
        handleClick();
      }}
      style={containerUnstyled}
    >
      <div
        style={calculateStyles(
          {
            default: {
              display: 'flex',
              alignItems: 'center',
              padding: '8px 16px',
              justifyContent: 'space-between',
              lineHeight: 1,
            },
            selected: {
              background: blue,
              color: '#fff',
              borderRadius: '4px',
            },
          },
          {
            selected,
          }
        )}
      >
        <div
          style={profileBadgeWrapperStyle}
          title={location ? `${handle} ${location}` : `${handle}`}
        >
          <div style={{ marginRight: '16px' }}>
            <Avatar
              src={avatarUrl}
              fallbackUrl="https://s3.amazonaws.com/buffer-ui/Default+Avatar.png"
              alt={handle}
              size="small"
              type="social"
              network={type}
            />
          </div>
          <span style={handleStyle}>
            <SensitiveData>
              <Text size={'mini'} color={selected ? 'white' : 'shuttleGray'}>
                {handle}
              </Text>
            </SensitiveData>
          </span>
        </div>
        {locked ? (
          <LockIcon color={selected ? 'white' : 'shuttleGray'} />
        ) : disconnected ? (
          <NewDisconnectedIcon
            showProfilesDisconnectedModal={showProfilesDisconnectedModal}
            selected={selected}
          />
        ) : (
          <PendingCountNotification
            pendingCount={pendingCount}
            selected={selected}
          />
        )}
      </div>
    </div>
  );
};

ProfileListItem.propTypes = {
  ...PendingCountNotification.propTypes,
  handle: PropTypes.string.isRequired,
  locked: PropTypes.bool,
  selected: PropTypes.bool,
  location: PropTypes.string,
};

ProfileListItem.defaultProps = {
  locked: false,
  selected: false,
};

export default ProfileListItem;
