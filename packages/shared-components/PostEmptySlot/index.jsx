import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  LinkedInIcon,
} from '@bufferapp/components';

import {
  SERVICE_TWITTER,
  SERVICE_FACEBOOK,
  SERVICE_LINKEDIN,
  SERVICE_PINTEREST,
  SERVICE_INSTAGRAM,
} from '@bufferapp/publish-constants';

const getBgStyle = (isHovering, focus) => {
  if (isHovering || focus) return '#FFFFFF';
  return '#F5F5F5';
};

const emptySlotStyle = (isHovering, focus, service) => ({
  background: getBgStyle(isHovering, focus),
  cursor: service === 'noProfile' ? 'auto' : 'pointer',
  border: isHovering ? '1px solid #B8B8B8' : '1px solid transparent',
  borderRadius: '4px',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: 'normal',
  fontSize: '14px',
  color: focus ? '#3D3D3D' : '#636363',
  height: '48px',
  display: 'flex',
  justifyContent: 'center',
  transition: 'all 0.1s ease-out',
  marginBottom: '8px',
  boxShadow: focus ? '0 0 0 3px #ABB7FF' : 'none',
  position: 'relative',
});

const timeStyle = {
  padding: '15px',
};

const iconStyle = {
  verticalAlign: 'middle',
  display: 'inline-block',
  marginRight: '3px',
};

const iconMap = new Map([
  [SERVICE_TWITTER, { component: TwitterIcon }],
  [SERVICE_FACEBOOK, { component: FacebookIcon }],
  [SERVICE_LINKEDIN, { component: LinkedInIcon }],
  [SERVICE_PINTEREST, { component: PinterestIcon }],
  [SERVICE_INSTAGRAM, { component: InstagramIcon }],
]);

// eslint-disable-next-line react/prop-types
const Message = ({ message }) => <span>{message}</span>;

const getHoverMsg = ({ service, customHoverMessage }) => {
  if (customHoverMessage) {
    return <Message message={customHoverMessage} />;
  }

  if (service === 'noProfile') {
    return (
      <Message message="Connect a social account to schedule posts to your queue" />
    );
  }

  const icon = iconMap.get(service);
  if (icon) {
    const { component: IconComponent } = icon;
    return (
      <div>
        <span style={iconStyle}>
          <IconComponent />
        </span>
        <span>
          {' '}
          {service === 'twitter' ? 'Schedule a Tweet' : 'Schedule a Post'}{' '}
        </span>
      </div>
    );
  }
};

class PostEmptySlot extends Component {
  constructor() {
    super();
    this.state = { isHovering: false };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    this.setState({ isHovering: true });
  }

  onMouseLeave() {
    this.setState({ isHovering: false });
  }

  render() {
    const { service, time, onClick, focus, customHoverMessage } = this.props;
    const { isHovering } = this.state;
    return (
      // eslint-disable-next-line
      <div
        style={emptySlotStyle(isHovering, focus, service)}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={onClick}
      >
        <div style={timeStyle}>
          {isHovering ? getHoverMsg({ service, customHoverMessage }) : time}
        </div>
      </div>
    );
  }
}

PostEmptySlot.propTypes = {
  time: PropTypes.string,
  service: PropTypes.string,
  customHoverMessage: PropTypes.string,
  onClick: PropTypes.func,
  focus: PropTypes.bool,
};

export default PostEmptySlot;
