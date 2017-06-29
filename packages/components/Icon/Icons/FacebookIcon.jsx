import React from 'react';
import Icon from '../../Icon';

const FacebookIcon = ({ color, size }) =>
  <Icon color={color} size={size}>
    <path d="M6.36466699,16 L6.36466699,8.70169121 L4,8.70169121 L4,5.85735974 L6.36466699,5.85735974 L6.36466699,3.75977121 C6.36466699,1.32549518 7.79607203,0 9.8868861,0 C10.8883393,0 11.7490588,0.0774635455 12,0.1120644 L12,2.65600395 L10.5498305,2.65671009 C9.41281051,2.65671009 9.19266757,3.21787946 9.19266757,4.0413798 L9.19266757,5.85735974 L11.9044098,5.85735974 L11.5512837,8.70169121 L9.19266757,8.70169121 L9.19266757,16 L6.36466699,16 Z" />
  </Icon>;

FacebookIcon.propTypes = {
  ...Icon.propTypes,
};

export default FacebookIcon;
