import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import ArrowDownIcon from '@bufferapp/components/Icon/Icons/ArrowDownIcon';
import ArrowUpIcon from '@bufferapp/components/Icon/Icons/ArrowUpIcon';
import Title from './Title';
import { gray } from '@bufferapp/ui/style/colors';

const Button = styled.button`
  cursor: pointer;
  display: flex;
  padding: 0.75rem 1rem;
  color: #333333;
  text-decoration: none;
  text-shadow: none;
  text-align: left;
  border: 1px solid ${gray};
  border-radius: 3px;
  background: #fff;
  width: 100%;
  height:42px;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);

  outline: none !important;
  outline-color: transparent !important;
  outline-style: none !important;

  transition: all 0.2s ease-out;
  &:hover { 
    border: 1px solid #168eea;
  }
  &:active {
    border: 1px solid #0e5c98;
  }

  ${props => props.loading && css`
    pointer-events: none;
  `}
`;

const Arrow = styled.span`
  margin-left: auto;
`;

const DatePickerButton = ({ presets, isOpen, loading, startDate, endDate, handleClick }) => (
  <Button
    loading={loading}
    disabled={loading}
    onClick={handleClick}
  >
    <Title presets={presets} loading={loading} startDate={startDate} endDate={endDate} />
    { !loading ?
      <Arrow>
        { isOpen ?
          <ArrowUpIcon size="small" /> :
          <ArrowDownIcon size="small" /> }
      </Arrow> : null}
  </Button>
);

DatePickerButton.defaultProps = {
  startDate: 0,
  endDate: 0,
  loading: false,
};

DatePickerButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  startDate: PropTypes.number,
  endDate: PropTypes.number,
};

export default DatePickerButton;
