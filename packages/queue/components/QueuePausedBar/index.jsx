import React from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  Card,
  Button,
  Link,
} from '@bufferapp/components';

const pausedBarInnerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const pausedTextContainer = {
  marginBottom: '.5rem',
};

const pausedSubTextContainer = {
  marginBottom: '1rem',
};

const QueuePausedBar = ({ handleClickUnpause, isManager }) => (
  <Card
    reducedPadding
    color="off-white"
  >
    <div style={pausedBarInnerStyle}>
      <div>
        <div style={pausedTextContainer}>
          <Text weight="bold">
            Your queue is currently paused.
          </Text>
        </div>
        <div style={pausedSubTextContainer}>
          {isManager &&
            <Text size="mini">
              None of your posts will go out, and you can&apos;t re-order posts in your queue.&nbsp;
              <Link newTab href="https://faq.buffer.com/article/681-how-to-pause-your-queue">
                Learn more
              </Link>
            </Text>
          }
          {!isManager &&
            <Text size="mini">
              Unfortunately you don&apos;t have permission to unpause it.&nbsp;
              <Link newTab href="https://faq.buffer.com/article/681-how-to-pause-your-queue">
                Learn more
              </Link>
            </Text>
          }
        </div>
        {isManager &&
          <Button
            small
            onClick={handleClickUnpause}
          >
            Resume Queue
          </Button>
        }
      </div>
    </div>
  </Card>
);

QueuePausedBar.propTypes = {
  handleClickUnpause: PropTypes.func.isRequired,
  isManager: PropTypes.bool.isRequired,
};

export default QueuePausedBar;
