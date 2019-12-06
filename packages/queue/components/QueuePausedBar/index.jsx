import React from 'react';
import PropTypes from 'prop-types';

import { Card, Link } from '@bufferapp/components';

import { Text, Button } from '@bufferapp/ui';

const pausedBarInnerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 1rem 1rem',
};

const pausedTextContainer = {
  marginTop: 0,
};

const QueuePausedBar = ({ handleClickUnpause, isManager }) => (
  <Card noPadding color="off-white">
    <div style={pausedBarInnerStyle}>
      <div>
        <div style={pausedTextContainer}>
          <Text type="h3">Your queue is currently paused.</Text>
        </div>
        <div>
          {isManager && (
            <Text type="p">
              None of your posts will go out, and you can&apos;t re-order posts
              in your queue.&nbsp;
              <Link
                newTab
                href="https://faq.buffer.com/article/681-how-to-pause-your-queue"
              >
                Learn more
              </Link>
            </Text>
          )}
          {!isManager && (
            <Text size="p">
              Unfortunately you don&apos;t have permission to unpause it.&nbsp;
              <Link
                newTab
                href="https://faq.buffer.com/article/681-how-to-pause-your-queue"
              >
                Learn more
              </Link>
            </Text>
          )}
        </div>
        {isManager && (
          <Button
            type="primary"
            size="small"
            onClick={handleClickUnpause}
            label="Resume Queue"
          />
        )}
      </div>
    </div>
  </Card>
);

QueuePausedBar.propTypes = {
  handleClickUnpause: PropTypes.func.isRequired,
  isManager: PropTypes.bool.isRequired,
};

export default QueuePausedBar;
