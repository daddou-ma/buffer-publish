import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import TwoFactorAuth from './index';
import machine from '../../machine';

const transitionAction = action('transition');
const stories = storiesOf('TwoFactorAuth', module).addDecorator(withA11y);

Object.keys(machine).forEach(machineState => {
  stories.add(machineState, () => (
    <TwoFactorAuth
      machineState={machineState}
      isEnabled={machineState === 'enabled'}
      transition={transitionAction}
      method={'sms'}
      phoneNumber="+15142345566"
      updatePhoneNumber=""
      editMode={false}
      recoveryCode={'ABCD-EFG-HIJK-LKM'}
      setPhoneNumber={action('setPhoneNumber')}
      submitPhoneNumber={action('submitPhoneNumber')}
      loading={false}
      error=""
      setupApp={action('setupApp')}
      qrCode={'dasd'}
      updateMethod={'sms'}
      submitCode={action('submitCode')}
      handleRecoveryCodeSelect={action('handleRecoveryCodeSelect')}
    />
  ));
});
