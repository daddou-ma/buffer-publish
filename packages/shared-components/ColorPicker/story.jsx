import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import styled from 'styled-components';
import ColorPicker from './index';

const DEFAULT_COLOR = '#000000';

const Wrapper = styled.div`
  width: 820px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

storiesOf('ColorPicker', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <ColorPicker
      label="Link Color"
      defaultColor={DEFAULT_COLOR}
      onChange={action('onChange')}
      onBlur={action('onBlur')}
    />
  ))
  .add('To the right', () => (
    <Wrapper>
      <ColorPicker
        label="Link Color"
        defaultColor={DEFAULT_COLOR}
        onChange={action('onChange')}
        onBlur={action('onBlur')}
      />
    </Wrapper>
  ));
