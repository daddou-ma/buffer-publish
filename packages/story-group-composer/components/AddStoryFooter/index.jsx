import React, { Fragment, useState } from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import { Button, Text } from '@bufferapp/ui';
import DateTimeSlotPickerWrapper from '../DateTimeSlotPickerWrapper';
import {
  FooterBar,
  ButtonStyle,
  EditStoryStyle,
  EditTextStyle,
  EditDateStyle,
  StyledEditButton,
} from './style';

const getReadableDateFormat = ({ uses24hTime, scheduledAt }) => {
  const readableFormat = uses24hTime ? 'MMM D, H:mm' : 'MMM D, h:mm A';
  return moment.unix(scheduledAt).format(readableFormat);
};

const AddStoryFooter = ({
  timezone,
  weekStartsMonday,
  uses24hTime,
  isScheduleLoading,
  translations,
  editingStoryGroup,
  onUpdateStoryGroup,
  onCreateStoryGroup,
  onSetShowDatePicker,
  showDatePicker,
}) => {
  const [scheduledAt, setScheduledAt] = useState(editingStoryGroup ? editingStoryGroup.scheduledAt : null);

  const onDateTimeSlotPickerSubmit = (timestamp) => {
    onSetShowDatePicker(false);
    if (editingStoryGroup) {
      setScheduledAt(timestamp);
    } else {
      onCreateStoryGroup(timestamp);
    }
  };

  const onScheduleClick = () => {
    if (editingStoryGroup) {
      onUpdateStoryGroup({
        scheduledAt,
        stories: editingStoryGroup.storyDetails.stories,
        storyGroupId: editingStoryGroup.id,
      });
    } else {
      onSetShowDatePicker(true);
    }
  };

  return (
    <Fragment>
      <FooterBar>
        {editingStoryGroup && (
          <EditStoryStyle>
            <EditTextStyle>
              <Text type="p">Story Schedule:</Text>
            </EditTextStyle>
            <EditDateStyle>
              <Text>
                {getReadableDateFormat({ scheduledAt, uses24hTime })}
              </Text>
            </EditDateStyle>
            <StyledEditButton
              label="Edit"
              type="secondary"
              size="small"
              onClick={() => { onSetShowDatePicker(true); }}
            />
          </EditStoryStyle>
        )}
        <ButtonStyle>
          <Button
            type="secondary"
            label={translations.previewButton}
            onClick={() => {}}
          />
        </ButtonStyle>
        <Button
          onClick={onScheduleClick}
          type="primary"
          disabled={isScheduleLoading}
          label={isScheduleLoading
            ? translations.scheduleLoadingButton
            : translations.scheduleButton}
        />
        {showDatePicker && (
          <DateTimeSlotPickerWrapper
            shouldUse24hTime={uses24hTime}
            timezone={timezone}
            weekStartsMonday={weekStartsMonday}
            editMode={!!editingStoryGroup}
            onDateTimeSlotPickerSubmit={timestamp => onDateTimeSlotPickerSubmit(timestamp)}
          />
        )}
      </FooterBar>
    </Fragment>
  );
};

AddStoryFooter.propTypes = {
  ...DateTimeSlotPickerWrapper.propTypes,
  isScheduleLoading: PropTypes.bool.isRequired,
  onUpdateStoryGroup: PropTypes.func.isRequired,
  onSetShowDatePicker: PropTypes.func.isRequired,
  showDatePicker: PropTypes.bool.isRequired,
  translations: PropTypes.shape({
    scheduleLoadingButton: PropTypes.string,
    scheduleButton: PropTypes.string,
    previewButton: PropTypes.string,
  }).isRequired,
  editingStoryGroup: PropTypes.shape({
    storyDetails: PropTypes.shape({
      stories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
      })),
    }),
    scheduledAt: PropTypes.number,
  }),
};

AddStoryFooter.defaultProps = {
  editingStoryGroup: null,
};

export default AddStoryFooter;
