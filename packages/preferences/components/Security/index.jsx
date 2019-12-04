import React, { Fragment } from 'react';

import TwoFactorAuth from '@bufferapp/publish-two-factor-auth';
import { Divider } from '@bufferapp/components';
import { Row } from '@bufferapp/publish-shared-components';
import { Text, Button } from '@bufferapp/ui';

const ChangePassword = () => (
  <Row>
    <div
      style={{
        marginRight: '1rem',
      }}
    >
      <Text type="h3">Password</Text>
      <div
        style={{
          marginTop: '0.5rem',
        }}
      >
        <Text type="p">
          Use your password to sign in to Buffer on the web and mobile apps.
          Make it nice and secure!
        </Text>
      </div>
    </div>
    <Button
      label="Change Your Password"
      type="secondary"
      onClick={() =>
        window.location.assign(
          'https://account.buffer.com?redirect=https%3A%2F%2Fpublish.buffer.com'
        )
      }
    />
  </Row>
);

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
