import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@bufferapp/ui';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  position: absolute;
  top: -1000px;
  left: -1000px;
  height: 1px;
  width: 1px;
  overflow: hidden;
  :focus {
    left: auto;
    top: auto;
    position: relative;
    height: 44px;
    width: auto;
    overflow: visible;
    margin-left: 7px;
  }
`;

const SkipNavLink = ({ translations, linkAnchor = '' }) => (
  <div>
    <StyledLink href={`#${linkAnchor}`}>{translations.linkText}</StyledLink>
  </div>
);

SkipNavLink.propTypes = {
  linkAnchor: PropTypes.string,
  translations: PropTypes.shape({
    linkText: PropTypes.string,
  }).isRequired,
};

export default SkipNavLink;
