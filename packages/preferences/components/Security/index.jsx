import React, { Fragment } from 'react';

import ChangePassword from '@bufferapp/change-password';
import TwoFactorAuth from '@bufferapp/publish-two-factor-auth';
import { Divider } from '@bufferapp/components';
import { Text } from '@bufferapp/ui';

const Security = () => (
  <Fragment>
    <Text type="h2">Security</Text>
    <Text type="p">Add an extra layer of security to your account.</Text>
    <Divider />
    <ChangePassword />
    <Divider />
    <TwoFactorAuth />
    <Divider />
  </Fragment>
);

export default Security;
