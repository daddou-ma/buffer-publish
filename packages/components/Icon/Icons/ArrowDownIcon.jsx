import React from 'react';
import Icon from '../../Icon';

const ArrowDownIcon = ({ color, size }) =>
  <Icon color={color} size={size}>
    <path d="M4.90573685,4.61438297 C4.5159485,4.22537555 4.51510793,3.59709045 4.90996552,3.20500565 L4.90996552,3.20500565 C5.30208929,2.81563546 5.93536183,2.81786315 6.32490003,3.21046581 L11.2750374,8.19954548 C11.6643604,8.59193123 11.6645756,9.22591178 11.2750374,9.61606213 L6.32490003,14.5739785 C5.93557705,14.9639132 5.3048231,14.9648641 4.90996552,14.5699959 L4.90996552,14.5699959 C4.51784174,14.1778616 4.51273549,13.5497061 4.9163418,13.1493324 L8.84038203,9.25672113 C9.03897712,9.05971665 9.04484713,8.74520064 8.84038203,8.54114518 L4.90573685,4.61438297 Z" transform="translate(8.089966, 8.890003) scale(-1, 1) rotate(-270.000000) translate(-8.089966, -8.890003) " />
  </Icon>;

ArrowDownIcon.propTypes = {
  ...Icon.propTypes,
};

export default ArrowDownIcon;
