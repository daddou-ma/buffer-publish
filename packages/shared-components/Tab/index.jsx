import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@bufferapp/components';
import { curiousBlue } from '@bufferapp/components/style/color';
import { calculateStyles } from '@bufferapp/components/lib/utils';

import HoverableText from '../HoverableText';

const Tab = ({ children, selected, tabId, onClick, secondary, disabled }) => (
  <div
    style={calculateStyles(
      {
        default: {
          transform: 'translate(0, 1px)',
          margin: '0 22px 0 0',
          display: 'inline-block',
          minWidth: '60px',
          textAlign: 'center',
        },
        selected: {
          borderBottom: secondary
            ? `1px solid ${curiousBlue}`
            : `2px solid ${curiousBlue}`,
        },
        disabled: {
          pointerEvents: 'none',
        },
      },
      {
        selected,
        disabled,
      }
    )}
  >
    <Link
      padding={secondary ? '12px 13px 12px 13px' : '18px 13px 17px 13px'}
      block
      href={'#'}
      onClick={e => {
        e.preventDefault();
        onClick(tabId);
      }}
      unstyled
    >
      <HoverableText
        color={selected ? 'black' : 'shuttleGray'}
        hoverColor="black"
        size={secondary ? 'small' : 'mini'}
      >
        {children}
      </HoverableText>
    </Link>
  </div>
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
