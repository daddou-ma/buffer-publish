/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled, { css } from 'styled-components';

import Button from './Button';
import Dropdown from './Dropdown';
import Form from './Form';

const Container = styled.div`
  position: relative;
  width: 16rem;
`;

const ClickCatcher = styled.div`
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;

  ${props => props.isOpen && css`
    display: block;
  `}
`;

const DatePicker = (props) => {
  const {
    isOpen,
    loading,
    startDate,
    endDate,
    presets,
    // Actions
    open,
    close,
  } = props;

  return (
    <Container>
      <Button
        isOpen={isOpen}
        loading={loading}
        startDate={startDate}
        endDate={endDate}
        presets={presets}
        handleClick={() => (isOpen ? close() : open())}
      />
      <Dropdown isOpen={isOpen}>
        <Form {...props} />
      </Dropdown>

      <ClickCatcher
        isOpen={isOpen}
        tabIndex="0"
        role="button"
        onClick={close}
      />
    </Container>
  );
};

DatePicker.defaultProps = {
  customStartDate: -1,
  customEndDate: -1,
  customMonth: moment().startOf('month').unix(),
  startDate: null,
  endDate: null,
  loading: false,
};

DatePicker.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  startDate: PropTypes.number,
  endDate: PropTypes.number,

  // Actions
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default DatePicker;
