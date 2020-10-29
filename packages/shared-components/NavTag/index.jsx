import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontSizeSmall, fontWeightMedium } from '@bufferapp/ui/style/fonts';
import {
  white,
  green,
  grayDarker,
  grayLight,
} from '@bufferapp/ui/style/colors';

const Tag = styled.span`
  padding: 2px 8px;
  font-weight: ${fontWeightMedium};
  font-size: ${fontSizeSmall};
  margin-left: 8px;
  border-radius: 100px;
  color: ${({ type }) => (type === 'counter' ? grayDarker : white)};
  background-color: ${({ type }) => (type === 'counter' ? grayLight : green)};
`;

const NavTag = ({ type, labelName }) => <Tag type={type}>{labelName}</Tag>;

NavTag.propTypes = {
  type: PropTypes.oneOf(['counter', 'new']).isRequired,
  labelName: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

NavTag.defaultProps = {
  labelName: 'New',
};

export default NavTag;
