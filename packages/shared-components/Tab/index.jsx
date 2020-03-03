import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { blue, grayDarker, grayDefault } from '@bufferapp/ui/style/colors';
import { fontSize, fontSizeSmall } from '@bufferapp/ui/style/fonts';

const TabItem = styled.li`
  transform: translate(0, 1px);
  margin: 0 22px 0 0;
  display: inline-block;
  min-width: 60px;
  text-align: center;
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  border-bottom-color: ${props => (props.selected ? blue : 'unset')};
  border-bottom-style: ${props => (props.selected ? 'solid' : 'none')};
  border-bottom-width: ${props => (props.secondary ? '1px' : '2px')};
`;

const TabLink = styled.a`
  padding: ${props =>
    props.secondary ? '12px 13px 12px 13px' : '18px 13px 17px 13px'};
  display: block;
  text-decoration: none;
  color: ${props => (props.selected ? grayDarker : grayDefault)};
  font-size: ${props => (props.secondary ? fontSizeSmall : fontSize)};
  :hover {
    color: ${grayDarker};
  }
`;

const Tab = ({ children, selected, tabId, onClick, secondary, disabled }) => (
  <TabItem selected={selected} disabled={disabled} secondary={secondary}>
    <TabLink
      selected={selected}
      secondary={secondary}
      href="#"
      onClick={e => {
        e.preventDefault();
        onClick(tabId);
      }}
    >
      {children}
    </TabLink>
  </TabItem>
);

Tab.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  tabId: PropTypes.string,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
};

Tab.defaultProps = {
  selected: false,
  secondary: false,
  disabled: false,
};

export default Tab;
