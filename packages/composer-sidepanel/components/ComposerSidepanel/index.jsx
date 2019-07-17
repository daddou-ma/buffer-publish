import React from 'react';
import PropTypes from 'prop-types';
import { calculateStyles } from '@bufferapp/components/lib/utils';

const sidepanelWrapperStyle = {
  position: 'absolute',
  width: '200px',
  backgroundColor: 'white',
  top: 0,
  right: '-210px',
  height: '100%',
  display: 'none',
};

const ComposerSidepanel = ({ isVisible, children }) =>
  <div
    id="composer-sidepanel"
    style={calculateStyles(
      {
        default: sidepanelWrapperStyle,
        isVisible: {
          display: 'block',
        },
      },
      {
        isVisible,
      },
    )}
  >
    {children}
  </div>;

ComposerSidepanel.propTypes = {
  isVisible: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

ComposerSidepanel.defaultProps = {
  isVisible: false,
};

export default ComposerSidepanel;
