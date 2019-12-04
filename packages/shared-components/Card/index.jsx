import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { gray, white } from '@bufferapp/ui/style/colors';
import { borderRadius } from '@bufferapp/ui/style/borders';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${white};
  border: 1px solid ${gray};
  box-sizing: border-box;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16);
  border-radius: ${borderRadius};
  width: 100%;
`;

const Card = ({ children }) => <CardWrapper>{children}</CardWrapper>;

Card.propTypes = {
  children: PropTypes.node,
};

Card.defaultProps = {
  children: null,
};

export default Card;
