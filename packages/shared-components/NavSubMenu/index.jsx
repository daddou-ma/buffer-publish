import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Divider } from '@bufferapp/components';

const NavSubMenuList = styled.ul`
  margin: 0;
  padding: 0;
  float: left;
  width: 100%;
`;

const NavSubMenu = ({ children }) => (
  <NavSubMenuList>
    {children}
    <Divider marginTop="0" marginBottom="0" />
  </NavSubMenuList>
);

NavSubMenu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavSubMenu;
