import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from '@bufferapp/ui';
import DateTimeSlotPickerWrapper from '../DateTimeSlotPickerWrapper';
import { getReadableDateFormat } from '../../utils/AddStory';
import {
  FooterBar,
  ButtonStyle,
  EditStoryStyle,
  EditTextStyle,
  EditDateStyle,
  StyledEditButton,
} from './style';

const AddStoryFooter = ({
  timezone,
  weekStartsMonday,
  uses24hTime,
  isScheduleLoading,
  translations,
  storyGroup,
  onUpdateStoryGroup,
  onCreateStoryGroup,
  onSetShowDatePicker,
  showDatePicker,
  editMode,
}) => {
  const [scheduledAt, setScheduledAt] = useState(storyGroup ? storyGroup.scheduledAt : null);

  const onDateTimeSlotPickerSubmit = (timestamp) => {
    onSetShowDatePicker(false);
    if (editMode) {
      setScheduledAt(timestamp);
    } else {
      onCreateStoryGroup(timestamp);
    }
  };

  const onScheduleClick = () => {
    if (editMode) {
      const { stories, storyGroupId } = storyGroup;
      onUpdateStoryGroup({
        scheduledAt,
        stories,
        storyGroupId,
      });
    } else {
      onSetShowDatePicker(true);
    }
  };

  return (
    <Fragment>
      <FooterBar>
        {editMode && (
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
              onClick={() => onSetShowDatePicker(true)}
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
      </FooterBar>
      {showDatePicker && (
        <DateTimeSlotPickerWrapper
          shouldUse24hTime={uses24hTime}
          timezone={timezone}
          weekStartsMonday={weekStartsMonday}
          editMode={editMode}
          onDateTimeSlotPickerSubmit={timestamp => onDateTimeSlotPickerSubmit(timestamp)}
        />
      )}
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
  storyGroup: PropTypes.shape({
    storyDetails: PropTypes.shape({
      stories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
      })),
    }),
    scheduledAt: PropTypes.number,
  }),
};

AddStoryFooter.defaultProps = {
  storyGroup: {},
};

export default AddStoryFooter;
