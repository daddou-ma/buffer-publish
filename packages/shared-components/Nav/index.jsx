import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Divider } from '@bufferapp/components';

const NavList = styled.ul`
  margin: 0;
  padding: 0;
`;

const Nav = ({ children }) => (
  <nav>
    <NavList>{children}</NavList>
    <Divider marginTop="0" marginBottom="0" />
  </nav>
);

Nav.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Nav;
