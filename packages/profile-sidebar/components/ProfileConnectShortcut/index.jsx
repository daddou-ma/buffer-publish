import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@bufferapp/components';
import { ProfileBadgeIcon } from '../ProfileBadge';

const handleClick = (network, url) => {
  if (network === 'instagram') {
    /**
     * This silly looking code loads an 'img' with the
     * Instagram logout URL, which ensures the user is
     * logged out of Instagram before we send them to
     * reconnect.
     */
    const img = new Image();
    img.onerror = () => {
      window.location.assign(url);
    };
    img.src = 'https://www.instagram.com/accounts/logoutin';
    document.getElementsByTagName('head')[0].appendChild(img);
  } else {
    window.location.assign(url);
  }
};

const getStyle = hovered => ({
  display: 'flex',
  alignItems: 'center',
  lineHeight: 1,
  border: '1px dashed  rgba(89, 98, 106, .3)', // shuttleGray faded
  borderStyle: hovered ? 'solid' : 'dashed',
  borderRadius: '6px',
  background: hovered ? '#fff' : 'transparent',
  margin: '8px 0 0 0',
  textDecoration: 'none',
  padding: '14px',
  flexShrink: 0,
});

class ProfileConnectShortcut extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      hovered: false,
    };
  }

  render() {
    const { label, network, url } = this.props;
    return (
      <a
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
        style={getStyle(this.state.hovered)}
        href="#"
        key={`${network}-connect`}
        notifications=""
        onClick={() => handleClick(network, url)}
      >
        <ProfileBadgeIcon type={network} />
        <span style={{ marginLeft: '8px' }}>
          <Text size="small" color="shuttleGray" weight="bold">
            {label}
          </Text>
        </span>
      </a>
    );
  }
}

ProfileConnectShortcut.propTypes = {
  label: PropTypes.string.isRequired,
  network: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default ProfileConnectShortcut;
