import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@bufferapp/ui';
import { Text, CloseIcon } from '@bufferapp/components';
import Avatar from '@bufferapp/ui/Avatar';

const profileBadgeStyle = {
  position: 'relative',
  height: '2rem',
  width: '2rem',
  flexShrink: '0',
  paddingRight: '10px',
};

const middleContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: '15px',
};

const containerStyle = {
  backgroundColor: 'white',
  padding: '20px',
  maxWidth: '355px',
};

const buttonsStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'space-between',
};

const closeButtonStyle = {
  position: 'absolute',
  right: '15px',
};

const textContainerStyle = {
  marginRight: '15px',
};

const linkStyle = {
  cursor: 'pointer',
};

const ConfirmModal = ({
  profileService,
  onConfirmClick,
  onCloseModal,
  avatar,
  heading,
  body,
  btnText,
}) => (
  <div style={containerStyle}>
    <span style={closeButtonStyle}>
      <a style={linkStyle} onClick={onCloseModal}>
        <CloseIcon />
      </a>
    </span>
    <Text size="large" weight="medium">{heading}</Text>
    <div style={middleContainerStyle}>
      <Text>
        <div style={textContainerStyle} dangerouslySetInnerHTML={{ __html: body }} />
      </Text>
      <div style={profileBadgeStyle}>
        <Avatar
          src={avatar}
          fallbackUrl="https://s3.amazonaws.com/buffer-ui/Default+Avatar.png"
          alt="avatar for social network"
          size="small"
          type="social"
          network={profileService}
        />
      </div>
    </div>
    <div style={buttonsStyle}>
      <Button tertiary onClick={onCloseModal} label="Cancel" />
      <Button tertiary onClick={onConfirmClick} label={btnText} />
    </div>
  </div>);

ConfirmModal.propTypes = {
  profileService: PropTypes.string.isRequired,
  onConfirmClick: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func,
  avatar: PropTypes.string.isRequired,
  heading: PropTypes.string,
  body: PropTypes.string,
  btnText: PropTypes.string.isRequired,
};

export default ConfirmModal;
