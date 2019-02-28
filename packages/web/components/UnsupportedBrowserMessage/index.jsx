import React from 'react';

import {
  Popover,
  Card,
  Text,
  Button,
} from '@bufferapp/components';

const divStyle = {
  display: 'inline-block',
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: '400px',
  height: '90px',
  margin: 'auto',
  padding: '20px',
  border: '2px solid #d6d6d6',
};

const backPublish = (e) => {
  e.preventDefault();
  window.location.href = 'https://buffer.com/back_publish';
};

const UnsupportedBrowserMessage = () => (
  <Popover>
    <Card>
      <div style={{ maxWidth: '380px', textAlign: 'center', margin: '10px 40px' }}>
        <div style={{ margin: '16px 0 24px' }}><Text>
          Oops, sorry! Internet Explorer is not supported. Please use a different browser like <a target='_blank' href="https://www.google.com/chrome/">Chrome</a> or <a target='_blank' href="https://www.mozilla.org/en-US/firefox/">Firefox</a>, or go back to the Classic version of Buffer.
        </Text></div>
        <Button onClick={backPublish}>Go back to Classic</Button>
      </div>
    </Card>
  </Popover>
);

export default UnsupportedBrowserMessage;
