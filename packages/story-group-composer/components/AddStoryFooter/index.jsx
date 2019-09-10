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
  onDateTimeSlotPickerSubmit,
  timezone,
  weekStartsMonday,
  uses24hTime,
  isScheduleLoading,
  translations,
  editingStoryGroup,
  onUpdateStoryGroup,
  setShowDatePicker,
  showDatePicker,
}) => {
  const [scheduledAt, setScheduledAt] = useState(editingStoryGroup ? editingStoryGroup.scheduledAt : null);

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
              onClick={() => { setShowDatePicker(true); }}
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
          onClick={() => (editingStoryGroup
            ? onUpdateStoryGroup({
              scheduledAt,
              stories: editingStoryGroup.storyDetails.stories,
              storyGroupId: editingStoryGroup.id,
            })
            : setShowDatePicker(true)
          )}
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
            onDateTimeSlotPickerSubmit={(timestamp) => {
              setShowDatePicker(false);
              if (editingStoryGroup) {
                setScheduledAt(timestamp);
              } else {
                onDateTimeSlotPickerSubmit(timestamp);
              }
            }}
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
  setShowDatePicker: PropTypes.func.isRequired,
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
