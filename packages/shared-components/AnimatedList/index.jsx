import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const animation = ({ numberItems }) =>
  css`
    ${pulse} ${numberItems}s ease infinite forwards;
  `;

const createCSS = ({ numberItems }) => {
  let styles = '';
  for (let i = 1; i < numberItems + 1; i += 1) {
    styles += `
     > :nth-child(${i}){
        animation-delay: ${0.5 * (i - 1)}s  ; 
     }
   `;
  }

  return css`
    ${styles}
  `;
};

const StyledList = styled.span`
  > * {
    animation: ${animation};
    opacity: 0;
  }
  ${createCSS}
`;

const AnimatedList = ({ numberItems, children }) => (
  <StyledList numberItems={numberItems}>{children}</StyledList>
);

AnimatedList.propTypes = {
  numberItems: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default AnimatedList;
