import React, { useState } from 'react';
import PropTypes from 'prop-types';
import QueueButton from '../QueueButton';

const REMINDERS = 'pastReminders';

const onClickButton = (tab, index, onClick) => {
  let viewType = {
    1: 'week',
    2: 'month',
  };

  if (tab === REMINDERS) {
    viewType = {
      0: 'posts',
      1: 'stories',
    };
  }

  return onClick(viewType[index] || viewType['0']);
};

const QueueButtonGroup = ({
  onClick,
  buttons,
  disabled,
  tab,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      { buttons.map((text, index) => (
        <QueueButton
          key={text}
          text={text}
          total={buttons.length}
          index={index}
          onClick={() => {
            if (selectedIndex !== index) {
              setSelectedIndex(tab === REMINDERS ? index : 0);
              onClickButton(tab, index, onClick);
            }
          }}
          disabled={disabled}
          selectedIndex={selectedIndex}
        />
      ))}
    </div>
  );
};

QueueButtonGroup.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
  tab: PropTypes.string,
};

QueueButtonGroup.defaultProps = {
  disabled: false,
  tab: 'queue',
};

export default QueueButtonGroup;
