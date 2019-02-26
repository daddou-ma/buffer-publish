import React from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  Card,
  Button,
} from '@bufferapp/components';

// import { } from '@bufferapp/publish-shared-components';

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

const QueuePausedBar = ({ handleClickUnpause }) => (
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
          <Text size="mini">
            None of your posts will go out, and you can&apos;t re-order posts in your queue.
          </Text>
        </div>
        <Button
          small
          onClick={handleClickUnpause}
        >
          Resume Queue
        </Button>
        <Button
          small
          secondary
          borderless
          onClick={(e) => { e.preventDefault(); window.open('https://faq.buffer.com/article/681-how-to-pause-your-queue'); }}
        >
          Learn more
        </Button>
      </div>
    </div>
  </Card>
);

QueuePausedBar.propTypes = {
  handleClickUnpause: PropTypes.func.isRequired,
};

export default QueuePausedBar;
