import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { white, gray } from '@bufferapp/ui/style/colors';

const Container = styled.div`
  z-index: 2;
  display: none;
  position: absolute;
  width: 100%;
  top: 2.25rem;
  background: ${white};
  border: 1px solid ${gray};
  border-width: 0 1px 1px;
  border-radius: 3;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);

  ${props => props.isOpen && css`
    display: block;
  `}
`;

const Dropdown = ({ isOpen, children }) => (
  <Container isOpen={isOpen}>
    {children}
  </Container>
);

Dropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Dropdown;
