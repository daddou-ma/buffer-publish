import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link, useRouteMatch } from 'react-router-dom';
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

const FakeItem = styled.span`
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
  forceSelect,
  testId,
}) => {
  const match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  const NavItem = () => {
    // NavItem opening external page
    if (href && !to)
      return (
        <NavExternalItem $secondary={secondary} href={href}>
          {children}
        </NavExternalItem>
      );
    // Disabled/Fake NavItem, for disabled queue
    if (disabled)
      return (
        <FakeItem selected={forceSelect} disabled={disabled}>
          {children}
        </FakeItem>
      );
    // Regular NavItem
    return (
      <NavRouteItem
        selected={match}
        $secondary={secondary}
        to={to}
        aria-haspopup={hasSubMenu ? true : undefined}
        data-testid={testId}
      >
        {children}
      </NavRouteItem>
    );
  };

  return (
    <NavItemWrapper selected={forceSelect || match}>
      <NavItem />
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
  forceSelect: PropTypes.bool,
  testId: PropTypes.string,
};

NavLink.defaultProps = {
  to: '',
  href: '',
  activeOnlyWhenExact: true,
  disabled: false,
  secondary: false,
  hasSubMenu: false,
  forceSelect: false,
  testId: undefined,
};

export default NavLink;
