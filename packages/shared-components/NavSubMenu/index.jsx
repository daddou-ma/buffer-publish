import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { grayLight } from '@bufferapp/ui/style/colors';

const NavSubMenuList = styled.ul`
  margin: 0;
  padding: 0;
  float: left;
  width: 100%;
  border-bottom: 1px solid ${grayLight};
  box-sizing: border-box;
`;

const NavSubMenu = ({ type, children }) => (
  <NavSubMenuList aria-label={`${type} submenu`}>{children}</NavSubMenuList>
);

NavSubMenu.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};

export default NavSubMenu;
