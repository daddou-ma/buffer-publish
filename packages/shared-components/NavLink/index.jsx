import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { blue, grayDarker, grayDefault } from '@bufferapp/ui/style/colors';
import {
  fontSize,
  fontSizeSmall,
  fontWeightMedium,
  fontWeight,
} from '@bufferapp/ui/style/fonts';

const NavItemWrapper = styled.li`
  transform: translate(0, 1px);
  margin: 0 22px 0 0;
  display: inline-block;
  min-width: 60px;
  text-align: center;
  border-bottom-color: ${props => (props.selected ? blue : 'unset')};
  border-bottom-style: ${props => (props.selected ? 'solid' : 'none')};
  border-bottom-width: ${props => (props.secondary ? '1px' : '2px')};
`;

const navItemStyles = css`
  padding: ${props =>
    props.$secondary ? '12px 13px 12px 13px' : '18px 13px 17px 13px'};
  display: block;
  text-decoration: none;
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  color: ${props => (props.selected ? grayDarker : grayDefault)};
  font-size: ${props => (props.$secondary ? fontSizeSmall : fontSize)};
  font-weight: ${props => (props.selected ? fontWeightMedium : fontWeight)};
  :hover {
    color: ${grayDarker};
  }
`;

const NavRouteItem = styled(Link)`
  ${navItemStyles}
`;

const NavExternalItem = styled.a`
  ${navItemStyles}
`;

const NavLink = ({
  children,
  to,
  activeOnlyWhenExact,
  disabled,
  secondary,
  href,
  hasSubMenu,
}) => {
  const match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact || true,
  });

  const NavItem = href && !to ? NavExternalItem : NavRouteItem;

  return (
    <NavItemWrapper selected={match}>
      <NavItem
        selected={match}
        disabled={disabled}
        $secondary={secondary}
        to={to}
        href={href}
        aria-haspopup={hasSubMenu ? true : undefined}
      >
        {children}
      </NavItem>
    </NavItemWrapper>
  );
};

NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  activeOnlyWhenExact: PropTypes.bool,
  disabled: PropTypes.bool,
  secondary: PropTypes.bool,
  href: PropTypes.string,
  hasSubMenu: PropTypes.bool,
};

NavLink.defaultProps = {
  to: '',
  href: '',
  activeOnlyWhenExact: true,
  disabled: false,
  secondary: false,
  hasSubMenu: false,
};

export default NavLink;
