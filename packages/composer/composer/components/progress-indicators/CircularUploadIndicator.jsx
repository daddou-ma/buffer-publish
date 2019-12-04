/**
 * Progress indicator that builds on top of CircularIndicator. For displaying
 * feedback when uploading a file, we're simply extending the default behavior
 * by setting an initial progress value in order to play with reassurance and
 * perceived speed.
 *
 * This component accepts the same props as CircularIndicator.
 */
import React from 'react';
import CircularIndicator from './CircularIndicator';

const CircularUploadIndicator = props => (
  <CircularIndicator initialProgress={5} {...props} />
);

export default CircularUploadIndicator;
