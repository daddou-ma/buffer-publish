import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled, { css } from 'styled-components';

import {
  Button,
  Text,
} from '@bufferapp/components';
import Calendar from './Calendar';
import Presets from './Presets';

const Header = styled.div`
  margin: 0.75rem 0;
`;

const Clear = styled.div`
  position: absolute;
  right: 8px;
  top: 6px;
`;

const Inputs = styled.form`
  display: flex;
  align-content: center;
  justify-content: space-between;
`;

const InputContainer = styled.div`
  width: 48%;
  position: relative;
`;

const DateInput = styled.input`
  width: 100%;
  font-size: 0.75rem;
  padding: 0.5rem;
  margin: 0;
  box-sizing: border-box;
  background: #FFFFFF;
  border: 1px solid #DEDEDE;
  border-radius: 3px;

  &:focus {
    outline: none;
  }
`;

const CustomDateRangeContainer = styled.div`
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: all 500ms ease-in-out;

  ${props => props.calendarOpen && css`
    max-height: 1000px;
    opacity: 1;
  `}
`;

const Footer = styled.div`
  margin: 0.75rem 0 0.5rem;
  display: flex;
  justify-content: center;
`;

class Form extends Component {
  componentWillUpdate (nextProps) {
    if (nextProps.startDate === null && this._startDate) {
      this._startDate.focus();
    }
  }

  updateSelectedDateRange() {
    const {
      startDate,
      endDate,
      // Actions
      setDateRange,
      close,
    } = this.props;

    if (startDate !== null && endDate !== null) {
      setDateRange(startDate, endDate);
      close();
    }
  }

  applyCustomDateRange() {
    const {
      startDate,
      endDate,
      // Actions
      setDateRange,
      close,
    } = this.props;

    if (startDate !== null && endDate !== null) {
      setDateRange(startDate, endDate);
      close();
    }
  }

  render () {
    // State
    const {
      presets,
      calendarOpen,
      startDate,
      endDate,
      month,
    } = this.props;

    // Actions
    const {
      setStartDate,
      setEndDate,
      selectPreset,
      setMonth,
      clearStartDate,
      clearEndDate,
      maxDate,
      minDate,
    } = this.props;

    const startDateFocus = startDate === null;
    const endDateFocus = startDate !== null && endDate === null;
    const dateFormat = 'MM/DD/YY';
    const startDateFormat = startDate ? `${moment.unix(startDate).format(dateFormat)}` : '';
    const endDateFormat = endDate ? `${moment.unix(endDate).format(dateFormat)}` : '';

    return (
      <div>
        <Presets
          presets={presets}
          selectPreset={selectPreset}
          minStartDate={minDate}
          startDate={startDate}
          endDate={endDate}
        />
        <CustomDateRangeContainer calendarOpen={calendarOpen}>
          { calendarOpen &&
          <div>
            <Header><Text size="extra-small">Select a custom date range:</Text></Header>
            <Inputs>
              <InputContainer>
                <DateInput
                  innerRef={(node) => { this._startDate = node; }}
                  type="text"
                  name="start"
                  value={startDateFormat}
                  placeholder="Date from"
                  readOnly
                />
                <Clear>
                  <Button
                    noStyle
                    onClick={(e) => { e.preventDefault(); clearStartDate(); }}
                  >
                    <Text>x</Text>
                  </Button>
                </Clear>
              </InputContainer>
              <InputContainer>
                <DateInput
                  type="text"
                  name="end"
                  value={endDateFormat}
                  placeholder="Date to"
                  readOnly
                />
                <Clear>
                  <Button
                    noStyle
                    onClick={(e) => { e.preventDefault(); clearEndDate(); }}
                  >
                    <Text>x</Text>
                  </Button>
                </Clear>
              </InputContainer>
            </Inputs>
            <Calendar
              isOpen
              startDate={startDate}
              endDate={endDate}
              focusStartDate={startDateFocus}
              focusEndDate={endDateFocus}
              currentMonth={month}

              maxStartDate={minDate}
              maxEndDate={maxDate}
              selectStartDate={setStartDate}
              selectEndDate={setEndDate}
              selectMonth={setMonth}
            />
            <Footer>
              <Button
                disabled={(startDate === null) || (endDate === null)}
                onClick={() => this.applyCustomDateRange()}
              >
                Apply This Date Range
              </Button>
            </Footer>
          </div>
          }
        </CustomDateRangeContainer>
      </div>
    );
  }
}

Form.defaultProps = {
  startDate: null,
  endDate: null,
  minDate: null,
};

Form.propTypes = {
  startDate: PropTypes.number,
  endDate: PropTypes.number,
  month: PropTypes.number.isRequired,
  calendarOpen: PropTypes.bool.isRequired,
  minDate: PropTypes.number,
  maxDate: PropTypes.number.isRequired,

  // Actions
  selectPreset: PropTypes.func.isRequired,
  setStartDate: PropTypes.func.isRequired,
  clearStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  clearEndDate: PropTypes.func.isRequired,
  setDateRange: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  setMonth: PropTypes.func.isRequired,
};

export default Form;
