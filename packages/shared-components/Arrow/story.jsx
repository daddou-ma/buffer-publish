import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import styled from 'styled-components';
import Arrow from './index';

const ContentWrapper = styled.div`
  display: flex;
  width: 592px;
  height: 592px;
`;

const Content = styled.div`
  display: flex;
  width: 300px;
  justify-content: center;
`;

storiesOf('Arrow', module)
  .addDecorator(withA11y)
  .add('should show left arrow', () => <Arrow isLeft />)
  .add('should show left and right arrows', () => (
    <ContentWrapper>
      <Arrow isLeft onClick={() => {}} />
      <Content>Content here</Content>
      <Arrow isLeft={false} onClick={() => {}} />
    </ContentWrapper>
  ))
  .add('should show right arrow', () => <Arrow isLeft={false} />);
