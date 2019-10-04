import React from 'react';
import PropTypes from 'prop-types';
import QueueButton from '../QueueButton';

const QueueButtonGroup = ({ onClick, buttons, disabled }) => (
  <div>
    { buttons.map((text, index) => (
      <QueueButton
        key={text}
        text={text}
        total={buttons.length}
        index={index}
        onClick={onClick}
        disabled={disabled}
      />
    ))}
  </div>
);

QueueButtonGroup.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
};

QueueButtonGroup.defaultProps = {
  disabled: false,
};

export default QueueButtonGroup;
