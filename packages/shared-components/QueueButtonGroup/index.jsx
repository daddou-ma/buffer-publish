import React from 'react';
import PropTypes from 'prop-types';
import QueueButton from '../QueueButton';

const QueueButtonGroup = ({
  onClick,
  buttons,
  disabled,
  viewType,
  tab,
}) => (
  <div>
    { buttons.map((text, index) => (
      <QueueButton
        key={text}
        text={text}
        total={buttons.length}
        index={index}
        onClick={onClick}
        disabled={disabled}
        tab={tab}
        viewType={viewType}
      />
    ))}
  </div>
);

QueueButtonGroup.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
  viewType: PropTypes.string,
  tab: PropTypes.string,
};

QueueButtonGroup.defaultProps = {
  disabled: false,
  viewType: 'posts',
  tab: 'queue',
};

export default QueueButtonGroup;
