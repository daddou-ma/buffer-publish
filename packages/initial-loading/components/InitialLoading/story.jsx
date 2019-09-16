import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y/register';
import { Provider } from 'react-redux';

import InitialLoading from './index';

const storeFake = state => ({
  default: () => { },
  subscribe: () => { },
  dispatch: () => { },
  getState: () => ({ ...state }),
});

storiesOf('InitialLoading', module)
  .addDecorator(checkA11y)
  .addDecorator(getStory => <Provider store={storeFake}>{getStory()}</Provider>)
  .add('default', () => (
    <InitialLoading onCompomentMount={action('onComponentMount')} />
  ));
