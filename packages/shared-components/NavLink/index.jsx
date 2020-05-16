import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
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

const NavItem = styled(Link)`
  padding: ${props =>
    props.secondary ? '12px 13px 12px 13px' : '18px 13px 17px 13px'};
  display: block;
  text-decoration: none;
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  color: ${props => (props.selected ? grayDarker : grayDefault)};
  font-size: ${props => (props.secondary ? fontSizeSmall : fontSize)};
  font-weight: ${props => (props.selected ? fontWeightMedium : fontWeight)};
  :hover {
    color: ${grayDarker};
  }
`;

const NavLink = ({
  children,
  to,
  activeOnlyWhenExact,
  disabled,
  secondary,
}) => {
  const match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <NavItemWrapper selected={match}>
      <NavItem
        selected={match}
        disabled={disabled}
        secondary={secondary}
        to={to}
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
};

NavLink.defaultProps = {
  to: '',
  activeOnlyWhenExact: true,
  disabled: false,
  secondary: false,
};

export default NavLink;
