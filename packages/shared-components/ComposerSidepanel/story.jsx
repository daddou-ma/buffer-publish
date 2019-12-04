import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import ComposerSidepanel from './index';

const wrapperStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: 'lightgrey',
};

const composerStyle = {
  position: 'relative',
  width: '500px',
  height: '500px',
  backgroundColor: 'white',
};

storiesOf('ComposerSidepanel', module)
  .addDecorator(withA11y)
  .add('should show composer sidepanel', () => (
    <div style={wrapperStyle}>
      <div style={composerStyle}>
        <ComposerSidepanel isVisible onClose={action('onClose')}>
          Sidepanel content
        </ComposerSidepanel>
      </div>
    </div>
  ))
  .addDecorator(withA11y)
  .add('should not show composer sidepanel', () => (
    <div style={wrapperStyle}>
      <div style={composerStyle}>
        <ComposerSidepanel isVisible={false} onClose={action('onClose')}>
          Sidepanel content
        </ComposerSidepanel>
      </div>
    </div>
  ));
