import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Divider } from '@bufferapp/components';

const NavList = styled.ul`
  margin: 0;
  padding: 0;
  position: relative;
`;

const NavWrapper = styled.nav`
  padding: 0 0.5rem;
`;

const Nav = ({ children }) => (
  <NavWrapper>
    <NavList>{children}</NavList>
    <Divider marginTop="0" marginBottom="0" />
  </NavWrapper>
);

Nav.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Nav;
