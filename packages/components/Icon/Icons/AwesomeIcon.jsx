import React from 'react';
import Icon from '../../Icon';

const AwesomeIcon = ({ color, size }) =>
  <Icon color={color} size={size}>
    <path d="M8.00003076,12.8453201 L4.8023779,14.5264257 C3.82877852,15.0382772 3.19173216,14.5657514 3.37619612,13.490244 L3.98689347,9.92960521 L1.39993797,7.40794682 C0.612279521,6.64016959 0.864820138,5.88828399 1.94469094,5.73136958 L5.51977551,5.21187939 L7.11860194,1.97230321 C7.60540163,0.985939291 8.39852667,0.993774264 8.88145957,1.97230321 L10.480286,5.21187939 L14.0553706,5.73136958 C15.1438878,5.88954039 15.3815254,6.64626827 14.6001235,7.40794682 L12.013168,9.92960521 L12.6238654,13.490244 C12.8098063,14.5743628 12.1635494,15.0342114 11.1976836,14.5264257 L8.00003076,12.8453201 Z" />
  </Icon>;

AwesomeIcon.propTypes = {
  ...Icon.propTypes,
};

export default AwesomeIcon;
