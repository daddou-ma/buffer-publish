import React from 'react';
import styled from 'styled-components';
import { gray, grayLighter } from '@bufferapp/ui/style/colors';

const Container = styled.div`
  display: flex;
  border: 1px solid ${gray};
  border-radius: 4px;
  margin-top: 15px;
  flex-direction: column;
`;

const Circle = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: ${grayLighter};
  margin-right: 8px;
`;

const SmallCircle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${grayLighter};
`;

const CircleWrapper = styled.div`
  position: relative;
`;

const Square = styled.div`
  height: 150px;
  width: 150px;
  background-color: ${grayLighter};
  margin-left: 10px;
  border-radius: 4px;
`;

const Header = styled.div`
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  padding: 10px;
  flex-direction: row;
`;

const Line = styled.div`
  border-radius: 4px;
  width: ${props => (props.width ? props.width : '100%')};
  height: ${props => (props.height ? props.height : '10px')};
  background-color: ${grayLighter};
`;

const Content = styled.div`
  display: flex;
  padding: 20px 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const Footer = styled.div`
  display: flex;
  border-top: 1px solid #e0e0e0;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
`;

const LinesWrapper = styled.div`
  display: flex;
  width: 85%;
  flex-direction: column;

  div {
    margin-bottom: 10px;
  }
`;

const LineWrapper = styled.div`
  margin-left: 10px;
`;

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

ExamplePost.propTypes = {};

export default ExamplePost;
