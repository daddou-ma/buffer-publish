import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@bufferapp/components';

const Tabs = ({ children, selectedTabId, onTabClick, secondary }) => (
  <React.Fragment>
    {React.Children.map(children, tab => {
      if (!tab || !tab.props.tabId) return tab;
      return React.cloneElement(tab, {
        selected: selectedTabId === tab.props.tabId,
        onClick: tab.props.onClick || onTabClick,
        secondary,
      });
    })}
    <Divider marginTop={'0'} marginBottom={'0'} />
  </React.Fragment>
);

Tabs.propTypes = {
  children: PropTypes.node,
  selectedTabId: PropTypes.string,
  onTabClick: PropTypes.func,
  secondary: PropTypes.bool,
};

export default Tabs;
