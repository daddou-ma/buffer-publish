import React from 'react';
import PropTypes from 'prop-types';

import { Button, Text } from '@bufferapp/ui';
import Avatar from '@bufferapp/ui/Avatar';
import CrossIcon from '@bufferapp/ui/Icon/Icons/Cross';

const profileBadgeStyle = {
  position: 'relative',
  height: '2rem',
  width: '2rem',
  flexShrink: '0',
};

const middleContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
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
        <CrossIcon size="large" />
      </a>
    </span>
    <Text type="h3">{heading}</Text>
    <div style={middleContainerStyle}>
      <Text>
        <div style={textContainerStyle} dangerouslySetInnerHTML={{ __html: body }} />
      </Text>
      <div style={profileBadgeStyle}>
        <Avatar
          src={avatar}
          alt=""
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
  onCloseModal: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  heading: PropTypes.string,
  body: PropTypes.string,
  btnText: PropTypes.string.isRequired,
};

export default ConfirmModal;
