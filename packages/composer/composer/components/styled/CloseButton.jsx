import React from 'react';
import PropTypes from 'prop-types';
import { CloseButton as Button } from './styled/Button';

const CloseButton = ({
  onClick,
  title = null,
  label = 'Click to close',
  className = '',
}) => (
  <Button
    className={['bi bi-circle-x', className, 'js-disable-dragging'].join(' ')}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
    data-tip={title}
    aria-label={label}
  />
);

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default CloseButton;
