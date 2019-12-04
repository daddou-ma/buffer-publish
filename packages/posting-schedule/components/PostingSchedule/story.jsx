import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { reducer as formReducer } from 'redux-form';
import {
  ConnectedRouter as Router,
  connectRouter,
} from 'connected-react-router';
import createHistory from 'history/createHashHistory';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import PostingSchedule from './index';
import {
  settingsHeader,
  days,
  initialValues,
  profileTimezone,
  timezones,
} from './settingsData';

const history = createHistory();
const store = createStore(
  combineReducers({ form: formReducer, router: connectRouter(history) })
);

const avatarUrl =
  'https://buffer-uploads.s3.amazonaws.com/503a5c8ffc99f72a7f00002e/f49c2ff693f1c307af5e1b3d84e581ca.png';

storiesOf('PostingSchedule', module)
  .addDecorator(withA11y)
  .addDecorator(getStory => (
    <Provider store={store}>
      <Router history={history}>{getStory()}</Router>
    </Provider>
  ))
  .add('default', () => (
    <PostingSchedule
      isManager
      scheduleLoading={false}
      postingScheduleHeader={settingsHeader}
      days={days}
      hasTwentyFourHourTimeFormat={false}
      initialValues={initialValues}
      items={timezones}
      profileTimezone={profileTimezone}
      onUpdateTime={action('on-update-time')}
      onRemoveTimeClick={action('on-remove-time-click')}
      onAddPostingTime={action('on-update-time')}
      onUpdateTimezone={action('on-update-timezone')}
      onTimezoneInputFocus={action('on-timezone-input-focus')}
      onTimezoneInputBlur={action('on-timezone-input-blur')}
      onPauseToggleClick={action('on-pause-toggle-click')}
      paused={false}
      onPauseClick={action('on-pause-click')}
      onUnpauseClick={action('on-unpause-click')}
      showClearAllModal={false}
      onClearAllClick={action('on-clear-all-click')}
      onGetTimezones={action('on-get-timezones')}
      profileName="Joel"
      profileType="profile"
      onConfirmClearClick={action('on-confirm-clear-click')}
      profileService="twitter"
    />
  ))
  .add('isContributor', () => (
    <PostingSchedule
      isManager={false}
      scheduleLoading={false}
      postingScheduleHeader={settingsHeader}
      days={days}
      hasTwentyFourHourTimeFormat={false}
      initialValues={initialValues}
      items={timezones}
      profileTimezone={profileTimezone}
      onUpdateTime={action('on-update-time')}
      onRemoveTimeClick={action('on-remove-time-click')}
      onAddPostingTime={action('on-update-time')}
      onUpdateTimezone={action('on-update-timezone')}
      onTimezoneInputFocus={action('on-timezone-input-focus')}
      onTimezoneInputBlur={action('on-timezone-input-blur')}
      onPauseToggleClick={action('on-pause-toggle-click')}
      paused={false}
      onPauseClick={action('on-pause-click')}
      onUnpauseClick={action('on-unpause-click')}
      showClearAllModal={false}
      onClearAllClick={action('on-clear-all-click')}
      onGetTimezones={action('on-get-timezones')}
      profileName="Joel"
      profileType="profile"
      onConfirmClearClick={action('on-confirm-clear-click')}
      profileService="twitter"
    />
  ))
  .add('Clear all modal', () => (
    <PostingSchedule
      isManager={false}
      scheduleLoading={false}
      postingScheduleHeader={settingsHeader}
      days={days}
      hasTwentyFourHourTimeFormat={false}
      initialValues={initialValues}
      items={timezones}
      profileTimezone={profileTimezone}
      onUpdateTime={action('on-update-time')}
      onRemoveTimeClick={action('on-remove-time-click')}
      onAddPostingTime={action('on-update-time')}
      onUpdateTimezone={action('on-update-timezone')}
      onTimezoneInputFocus={action('on-timezone-input-focus')}
      onTimezoneInputBlur={action('on-timezone-input-blur')}
      onPauseToggleClick={action('on-pause-toggle-click')}
      paused={false}
      onPauseClick={action('on-pause-click')}
      onUnpauseClick={action('on-unpause-click')}
      showClearAllModal
      onClearAllClick={action('on-clear-all-click')}
      onGetTimezones={action('on-get-timezones')}
      profileName="Joel"
      profileType="profile"
      onConfirmClearClick={action('on-confirm-clear-click')}
      profileService="twitter"
      avatar={avatarUrl}
    />
  ))
  .add('isLoading', () => (
    <PostingSchedule
      isManager
      scheduleLoading
      postingScheduleHeader={settingsHeader}
      days={days}
      hasTwentyFourHourTimeFormat={false}
      initialValues={initialValues}
      items={timezones}
      profileTimezone={profileTimezone}
      onUpdateTime={action('on-update-time')}
      onRemoveTimeClick={action('on-remove-time-click')}
      onAddPostingTime={action('on-update-time')}
      onUpdateTimezone={action('on-update-timezone')}
      onTimezoneInputFocus={action('on-timezone-input-focus')}
      onTimezoneInputBlur={action('on-timezone-input-blur')}
      onPauseToggleClick={action('on-pause-toggle-click')}
      paused={false}
      onPauseClick={action('on-pause-click')}
      onUnpauseClick={action('on-unpause-click')}
      showClearAllModal={false}
      onClearAllClick={action('on-clear-all-click')}
      onGetTimezones={action('on-get-timezones')}
      profileName="Joel"
      profileType="profile"
      onConfirmClearClick={action('on-confirm-clear-click')}
      profileService="twitter"
    />
  ));
