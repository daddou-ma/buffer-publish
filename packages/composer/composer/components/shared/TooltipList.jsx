/**
 * Component that takes an array of messages and generates list markup for use in a tooltip
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const ListStyled = styled.ul`
  margin: 0 0 -7px 0;
  padding-left: 10px;

  ${props =>
    props.messages.length === 1
      ? css`
          list-style-type: none;
          padding-left: 0;
        `
      : ''}
`;

const ListItemStyled = styled.li`
  margin-bottom: 7px;
  line-height: 19px;
`;

const TooltipList = ({ messages = [] }) => {
  return (
    <ListStyled messages={messages}>
      {messages.map(message => (
        <ListItemStyled key={message}>{message}</ListItemStyled>
      ))}
    </ListStyled>
  );
};

TooltipList.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default TooltipList;
