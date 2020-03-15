import React from 'react';

import {
  Circle,
  CircleWrapper,
  Container,
  Content,
  Footer,
  Header,
  Line,
  LineWrapper,
  LinesWrapper,
  SmallCircle,
  Square,
} from './style';

const ExamplePost = () => {
  return (
    <Container>
      <Header>
        <CircleWrapper>
          <Circle />
          <SmallCircle />
        </CircleWrapper>
        <LineWrapper>
          <Line width="87px" />
        </LineWrapper>
      </Header>
      <Content>
        <LinesWrapper>
          <Line />
          <Line width="400px" />
        </LinesWrapper>
        <Square />
      </Content>
      <Footer>
        <Line width="408px" />
        <Line height="30px" width="100px" />
      </Footer>
    </Container>
  );
};

export default ExamplePost;
