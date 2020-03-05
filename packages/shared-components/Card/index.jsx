import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { gray, white, blue, grayShadow } from '@bufferapp/ui/style/colors';
import { borderRadius } from '@bufferapp/ui/style/borders';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${white};
  box-sizing: border-box;
  border-radius: ${borderRadius};
  width: 100%;
  opacity: ${props => (props.state?.faded ? 0.5 : 1)};
  overflow: hidden;
  box-shadow: ${props => (props.state?.dragging ? '' : grayShadow)};
  border-width: 1px;
  border-style: ${props => (props.state?.dragging ? 'dashed' : 'solid')};
  border-color: ${props =>
    !props.state?.dragging && props.state?.isOver ? blue : gray};
`;

const Card = ({ children, state }) => (
  <CardWrapper state={state}>{children}</CardWrapper>
);

Card.propTypes = {
  children: PropTypes.node,
  state: PropTypes.shape({
    faded: PropTypes.bool,
    dragging: PropTypes.bool,
    isOver: PropTypes.bool,
  }),
};

Card.defaultProps = {
  children: null,
  state: {},
};

export default Card;
