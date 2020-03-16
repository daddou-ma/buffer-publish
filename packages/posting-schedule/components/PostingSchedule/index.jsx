import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  IconArrowPopover,
  LoadingAnimation,
  Link,
  Popover,
} from '@bufferapp/components';

import { Text, Button } from '@bufferapp/ui';

import InfoIcon from '@bufferapp/ui/Icon/Icons/Info';

import {
  ScheduleTable,
  EmptyState,
  SensitiveData,
  ConfirmModal,
} from '@bufferapp/publish-shared-components';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';

import PostingTimeForm from '../PostingTimeForm';
import TimezoneInputForm from '../TimezoneInputForm';
import debounce from '../../utils/debounce';

const ErrorBoundary = getErrorBoundary(true);

const headerStyle = {
  marginBottom: '0.5rem',
  width: '100%',
};

const timezoneStyle = {
  marginTop: '1rem',
  marginBottom: '1.5rem',
  width: '100%',
};

const sectionStyle = {
  marginTop: '1.5rem',
  marginBottom: '1.5rem',
  width: '100%',
};

const postingTimesSection = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  marginTop: '1.5rem',
  marginBottom: '1.5rem',
  alignItems: 'center',
};

const postingTimesStyle = {
  margin: '0 auto 0 0',
};

const loadingContainerStyle = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  paddingTop: '5rem',
};

const scheduleLoadingContainerStyle = {
  textAlign: 'center',
};

const pauseQueueContainerStyle = {
  fontSize: ' 0.75rem',
  marginBottom: '1.5rem',
  marginTop: '1rem',
  textAlign: 'right',
  whiteSpace: 'nowrap',
};

const pauseButtonContainerStyle = {
  margin: '1rem 0 .25rem',
  display: 'flex',
  justifyContent: 'flex-end',
};

const tableStyle = {
  flexBasis: '100%',
};

const timezoneAndPauseContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
};

/* eslint no-console: 0 */
const PostingSchedule = ({
  days,
  items,
  loading,
  scheduleLoading,
  onUpdateTime,
  onAddPostingTime,
  onUpdateTimezone,
  onGetTimezones,
  postingScheduleHeader,
  hasTwentyFourHourTimeFormat,
  onRemoveTimeClick,
  onTimezoneInputFocus,
  onTimezoneInputBlur,
  onPauseToggleClick,
  paused,
  onPauseClick,
  onUnpauseClick,
  showClearAllModal,
  onClearAllClick,
  profileName,
  onConfirmClearClick,
  closePopover,
  avatar,
  profileService,
  isManager,
}) => {
  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <LoadingAnimation />
      </div>
    );
  }
  const emptySchedule =
    days.filter(day => day.postingTimesTotal > 0).length < 1;
  // TODO: is this the right place?
  if (items.length > 0) {
    items.forEach(item => (item.label = item.city));
  }

  const debouncedOnChange = debounce(onGetTimezones, 500);
  return (
    <ErrorBoundary>
      <div>
        <div style={headerStyle}>
          <SensitiveData>
            <Text type="h3">{postingScheduleHeader}</Text>
          </SensitiveData>
        </div>
        <Divider />
        <div style={timezoneAndPauseContainerStyle}>
          <div style={timezoneStyle}>
            <TimezoneInputForm
              handleSubmit={({ city, timezone }) =>
                onUpdateTimezone({ city, timezone })
              }
              items={items}
              onTimezoneChange={debouncedOnChange}
              onTimezoneInputFocus={onTimezoneInputFocus}
              onTimezoneInputBlur={onTimezoneInputBlur}
              disabled={!isManager}
            />
          </div>
          {isManager && (
            <div style={pauseQueueContainerStyle}>
              <Text>
                {paused
                  ? 'Your queue has been paused! '
                  : 'Stop all posts from being sent on this Social Account? '}
                <Link
                  newTab
                  href="https://support.buffer.com/hc/en-us/articles/360037966374-Pausing-your-Queue"
                >
                  Learn more
                </Link>
              </Text>
              <div style={pauseButtonContainerStyle}>
                <Button
                  type="primary"
                  size="small"
                  label={paused ? 'Resume Queue' : 'Pause Queue'}
                  onClick={paused ? onUnpauseClick : onPauseClick}
                />
              </div>
            </div>
          )}
        </div>
        {isManager && (
          <span>
            <Divider />
            <div style={sectionStyle}>
              <PostingTimeForm
                onSubmit={({ day, time }) => {
                  // spreading props so we don't modify the original object
                  let { hours, minutes } = time;
                  // check for null
                  hours = hours || 0;
                  minutes = minutes || 0;

                  hours = parseInt(hours, 10) < 10 ? `0${hours}` : hours;
                  minutes =
                    parseInt(minutes, 10) < 10 ? `0${minutes}` : minutes;

                  onAddPostingTime({
                    day,
                    time: { hours, minutes },
                  });
                }}
                twentyfourHourTime={hasTwentyFourHourTimeFormat}
              />
            </div>
          </span>
        )}
        <Divider />
        <div style={postingTimesSection}>
          <div style={postingTimesStyle}>
            <Text type="h3">
              Posting times
              {/* Need to move the tooltip a bit for visual accuracy! */}
              <div
                style={{
                  display: 'inline-block',
                  position: 'relative',
                  top: '2px',
                  left: '5px',
                }}
              >
                <IconArrowPopover
                  icon={<InfoIcon />}
                  position="below"
                  shadow
                  oneLine={false}
                  width="320px"
                  label="Posting Times"
                >
                  <div style={{ padding: '.5rem .25rem' }}>
                    {/* eslint-disable max-len */}
                    Your posting schedule tells Buffer when to send out posts in
                    your Queue. <br />
                    <br />
                    For example, the next 10 posts you add to your Queue will go
                    out in the next 10 upcoming time/date slots you decide
                    below. You can change this schedule at any time!
                  </div>
                </IconArrowPopover>
              </div>
            </Text>
          </div>
          {!emptySchedule && isManager && (
            <Button
              type="secondary"
              label="Clear all Posting Times"
              onClick={onClearAllClick}
            />
          )}
          {showClearAllModal && (
            <Popover onOverlayClick={closePopover}>
              <ConfirmModal
                onConfirmClick={onConfirmClearClick}
                profileName={profileName}
                profileService={profileService}
                onCloseModal={closePopover}
                avatar={avatar}
                heading={'Are you sure?'}
                body={`Would you like us to remove all your posting times for <span style="font-weight: bold">${profileName}</span>?`}
                btnText={"I'm Sure, Empty It"}
              />
            </Popover>
          )}
          <div style={tableStyle}>
            <Divider color="white" />
            {scheduleLoading && (
              <div style={scheduleLoadingContainerStyle}>
                <LoadingAnimation />
              </div>
            )}
            {!scheduleLoading && emptySchedule && (
              <EmptyState
                title="Looks like you don't have any posting times set!"
                subtitle="Add a new posting time to start publishing posts from your queue."
                heroImg="https://s3.amazonaws.com/buffer-publish/images/clock2x.png"
                heroImgSize={{ width: '40px', height: '40px' }}
                height={'30vh'}
              />
            )}
            {!emptySchedule && (
              <ScheduleTable
                disabled={!isManager}
                days={days}
                select24Hours={hasTwentyFourHourTimeFormat}
                onRemoveTimeClick={onRemoveTimeClick}
                onUpdateTime={onUpdateTime}
                onPauseToggleClick={onPauseToggleClick}
              />
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

PostingSchedule.propTypes = {
  days: PropTypes.arrayOf(
    PropTypes.shape({
      dayName: PropTypes.string,
      postingTimesTotal: PropTypes.number,
      times: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.oneOfType([
            PropTypes.shape({
              hours: PropTypes.number.isRequired,
              minutes: PropTypes.number.isRequired,
            }),
            PropTypes.string,
          ]),
        }).isRequired
      ).isRequired,
    })
  ).isRequired,
  hasTwentyFourHourTimeFormat: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  scheduleLoading: PropTypes.bool.isRequired,
  postingScheduleHeader: PropTypes.string.isRequired,
  onRemoveTimeClick: PropTypes.func.isRequired,
  onUpdateTime: PropTypes.func.isRequired,
  onAddPostingTime: PropTypes.func.isRequired,
  onUpdateTimezone: PropTypes.func.isRequired,
  onGetTimezones: PropTypes.func.isRequired,
  onTimezoneInputFocus: PropTypes.func.isRequired,
  onTimezoneInputBlur: PropTypes.func.isRequired,
  onPauseToggleClick: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired,
  onPauseClick: PropTypes.func.isRequired,
  onUnpauseClick: PropTypes.func.isRequired,
  onClearAllClick: PropTypes.func.isRequired,
  showClearAllModal: PropTypes.bool.isRequired,
  profileName: PropTypes.string.isRequired,
  onConfirmClearClick: PropTypes.func.isRequired,
  closePopover: PropTypes.func,
  avatar: PropTypes.string,
  profileService: PropTypes.string.isRequired,
  isManager: PropTypes.bool.isRequired,
};

PostingSchedule.defaultProps = {
  loading: false,
};

export default PostingSchedule;
