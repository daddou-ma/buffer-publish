import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontSizeSmall, fontWeightMedium } from '@bufferapp/ui/style/fonts';
import { Flash } from '@bufferapp/ui/Icon';
import {
  white,
  green,
  grayDarker,
  grayLight,
  purpleDarker,
  purpleLighter,
} from '@bufferapp/ui/style/colors';

const Tag = styled.span`
  display: ${({ type }) => (type === 'paywall' ? 'flex' : 'inline-block')};
  padding: ${({ type }) => (type === 'paywall' ? '4px 8px' : '2px 8px')};
  font-weight: ${fontWeightMedium};
  font-size: ${fontSizeSmall};
  margin-left: 8px;
  border-radius: 100px;
  color: ${({ type }) => (type === 'counter' ? grayDarker : white)};
  background-color: ${({ type }) => {
    if (type === 'counter') {
      return grayLight;
    }
    if (type === 'paywall') {
      return purpleLighter;
    }
    return green;
  }};
`;

const NavTag = ({ type, labelName }) => (
  <Tag type={type}>
    {type === 'paywall' ? <Flash color={purpleDarker} /> : labelName}
  </Tag>
);

NavTag.propTypes = {
  type: PropTypes.oneOf(['counter', 'new', 'paywall']).isRequired,
  labelName: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

NavTag.defaultProps = {
  labelName: 'New',
};

export default NavTag;
