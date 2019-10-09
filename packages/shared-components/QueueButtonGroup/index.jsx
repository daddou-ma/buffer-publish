import React from 'react';
import PropTypes from 'prop-types';
import QueueButton from '../QueueButton';

const getRemindersType = (index) => {
  if (index === 0) return 'posts';
  if (index === 1) return 'stories';
  return null;
};

const getWeekOrMonth = (index) => {
  if (index === 1) return 'week';
  if (index === 2) return 'month';
  return null;
};

const onClickQueueButton = ({
  onClick,
  index,
  tab,
}) => {
  if (tab === 'reminders') {
    const reminderType = getRemindersType(index);
    onClick(reminderType);
  }

  if (tab === 'queue') {
    const weekOrMonth = getWeekOrMonth(index);
    onClick(weekOrMonth);
  }
};

const getSelectedIndex = ({
  index,
  viewType,
  text,
  tab,
}) => {
  if (tab === 'reminders' && viewType === text.toLowerCase()) {
    return index;
  }
  if (tab === 'queue') {
    return 0;
  }
};

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
        onClick={() => onClickQueueButton({
          onClick,
          index,
          tab,
        })}
        disabled={disabled}
        selectedIndex={getSelectedIndex({
          index,
          viewType,
          text,
          tab,
        })}
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
