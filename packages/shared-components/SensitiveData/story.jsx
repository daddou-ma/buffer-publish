import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';
import SensitiveData from './index';


storiesOf('SensitiveData', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <SensitiveData>
      <span>Some Text</span>
    </SensitiveData>
  ))
  .add('hide if children are missing', () => (
    <SensitiveData />
  ))
  .add('wrap multiple children', () => (
    <SensitiveData>
      <div>test 1</div>
      <div>test 2</div>
    </SensitiveData>
  ));
