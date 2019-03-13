import React from 'react';
import PropTypes from 'prop-types';
import QueueButton from '../QueueButton';

const QueueButtonGroup = ({ onClick, buttons }) => (
  <div>
    { buttons.map((text, index) => (
      <QueueButton
        key={text}
        text={text}
        index={index}
        onClick={onClick}
      />
    ))}
  </div>
);

QueueButtonGroup.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default QueueButtonGroup;
