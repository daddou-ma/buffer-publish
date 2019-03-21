import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider, Text, Toggle,
} from '@bufferapp/components';

const instagramRemindersStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '0.5rem 0',
};

const textWrapperStyle = {
  display: 'flex',
  marginBottom: '0.5rem',
  marginTop: '0.5rem',
};

const textStyle = {
  flex: 1,
};

const enableRemindersWrapperStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: '1 1 0%',
};

const enableRemindersStyle = {
  marginBottom: '0.5rem',
};

const switchStyle = {
  flex: 0.3,
  whiteSpace: 'nowrap',
  marginLeft: '1rem',
  textAlign: 'right',
};

const InstagramReminders = ({
  onToggleRemindersClick,
  remindersAreEnabled,
  isManager,
}) => (
  <div>
    <div style={instagramRemindersStyle}>
      <div style={textStyle}>
        <div style={textWrapperStyle}>
          <Text color={'black'}>
            Instagram Reminders
          </Text>
        </div>
        <div style={textWrapperStyle}>
          <Text size={'small'}>
            You can ensure all your Instagram posts will be sent
            out as a Reminder in the settings below. This means that
            Buffer will not post directly to Instagram for you.
          </Text>
        </div>
      </div>
      <div style={enableRemindersWrapperStyle}>
        <div style={textStyle}>
          <div style={textWrapperStyle}>
            <Text color={'black'} weight={'thin'}>
              Set Instagram Reminders for all posts
            </Text>
          </div>
          <div style={enableRemindersStyle}>
            <Text size={'small'}>
              All your posts will be sent as Reminders (not posted directly) if this is turned on.
            </Text>
          </div>
        </div>
        <div style={switchStyle}>
          <Toggle
            onText={'Reminders only'}
            offText={'Disabled'}
            disabled={isManager === false}
            on={remindersAreEnabled}
            size={'small'}
            onClick={() => onToggleRemindersClick(!remindersAreEnabled)}
          />
        </div>
      </div>
    </div>
    <Divider />
  </div>
);

InstagramReminders.propTypes = {
  onToggleRemindersClick: PropTypes.func.isRequired,
  remindersAreEnabled: PropTypes.bool.isRequired,
  isManager: PropTypes.bool.isRequired,
};

export default InstagramReminders;
