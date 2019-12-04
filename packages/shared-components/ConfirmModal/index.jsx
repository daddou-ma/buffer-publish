import React from 'react';
import PropTypes from 'prop-types';

import { Button, Text } from '@bufferapp/ui';
import Avatar from '@bufferapp/ui/Avatar';

const profileBadgeStyle = {
  paddingRight: '10px',
};

const middleContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const containerStyle = {
  backgroundColor: 'white',
  padding: '20px',
  maxWidth: '355px',
};

const buttonsStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'flex-end',
};

const textContainerStyle = {
  marginRight: '15px',
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
    <Text type="h3">{heading}</Text>
    <div style={middleContainerStyle}>
      <Text type="p">
        <div
          style={textContainerStyle}
          dangerouslySetInnerHTML={{ __html: body }}
        />
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
      <Button type="Text" onClick={onCloseModal} label="Cancel" />
      <Button type="primary" onClick={onConfirmClick} label={btnText} />
    </div>
  </div>
);

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
