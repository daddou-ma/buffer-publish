import React from 'react';
// import PropTypes from 'prop-types';
import { Divider } from '@bufferapp/components';
import { Row } from '@bufferapp/publish-shared-components';
import { Button, Text } from '@bufferapp/ui';

const openExtensionLink = () => {
  window.open('https://buffer.com/extensions', '_blank');
};

const openLinkGooglePlay = () => {
  window.open(
    'https://play.google.com/store/apps/details?id=org.buffer.android',
    '_blank'
  );
};

const openLinkAppStore = () => {
  window.open(
    'https://itunes.apple.com/app/apple-store/id490474324?pt=936146&ct=Web%20App%20Sidebar&mt=8',
    '_blank'
  );
};

const ExtrasLinks = () => (
  <div>
    <Text type="h2">Buffer Apps & Extras</Text>
    <Text type="p">
      Get the most out of Buffer with our mobile apps and browser extension.
    </Text>
    <Divider />
    <Row>
      <div>
        <Text type="h3">Browser Extension</Text>
        <Text type="p">
          Our browser extension lets you share content as you browse the web.
        </Text>
      </div>
      <Button
        type="secondary"
        label="Install the Browser extension"
        onClick={() => openExtensionLink()}
      />
    </Row>
    <Divider />
    <div>
      <Text type="h3">Mobile Apps</Text>
      <Text type="p">
        Share content and manage your Buffer account on the go with our mobile
        apps.
      </Text>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            marginRight: '0.5rem',
          }}
        >
          <Button
            type="secondary"
            label="View on Apple Store"
            onClick={() => openLinkAppStore()}
          />
        </div>
        <Button
          type="secondary"
          label="View on Google Play"
          onClick={() => openLinkGooglePlay()}
        />
      </div>
    </div>
    <Divider />
  </div>
);

export default ExtrasLinks;
