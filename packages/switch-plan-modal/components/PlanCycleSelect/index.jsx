import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Text } from '@bufferapp/ui';

import { borderRadius } from '@bufferapp/ui/style/borders';
import { blue, blueLighter, white } from '@bufferapp/ui/style/colors';
import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';

const CheckmarkIconContainer = styled.div`
  position: absolute;
  color: ${white};
  top: 50%;
  left: 15px;
  transform: translateY(-11px);
`;

const Button = styled.button`
  display: block;
  flex: 1;
  padding: 0.8rem 0.25rem;
  border-radius: ${borderRadius};
  cursor: pointer;
  position: relative;
  background: ${props => (props.selected ? blue : white)};
  border: ${props =>
    props.selected ? '1px solid transparent' : `1px solid ${blueLighter}`};
  margin-right: ${props => (props.first ? '25px' : 0)};
  transition: all 0.5s;

  p {
    margin: 0;
  }
`;

const PlanCycleButton = ({
  first,
  label,
  description,
  cycle,
  selectedCycle,
  selectCycle,
}) => {
  const selected = selectedCycle === cycle;
  return (
    <Button
      type="button"
      selected={selected}
      first={first}
      onClick={() => selectCycle(cycle)}
    >
      <Text type="h3" as="p" color={selected ? 'white' : 'grayDark'}>
        {label}
      </Text>
      <Text type="p" color={selected ? 'white' : 'grayDark'}>
        {description}
      </Text>
      {selected && (
        <CheckmarkIconContainer>
          <CheckmarkIcon size="large" />
        </CheckmarkIconContainer>
      )}
    </Button>
  );
};

PlanCycleButton.propTypes = {
  first: PropTypes.bool,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cycle: PropTypes.string.isRequired,
  selectedCycle: PropTypes.string.isRequired,
  selectCycle: PropTypes.func.isRequired,
};

PlanCycleButton.defaultProps = {
  first: false,
};

const getYearlyPlan = (
  isNonprofit,
  { nonprofitYearlyPrice, planYearlyPrice }
) => (isNonprofit ? nonprofitYearlyPrice : planYearlyPrice);

const getMonthlyPlan = (
  isNonprofit,
  { nonprofitMonthlyPrice, planMonthlyPrice }
) => (isNonprofit ? nonprofitMonthlyPrice : planMonthlyPrice);

const getMonthlyPromoPlan = (
  isNonprofit,
  { nonprofitPromoMonthlyPrice, planPromoMonthlyPrice }
) => (isNonprofit ? nonprofitPromoMonthlyPrice : planPromoMonthlyPrice);

const PlanCycleSelect = ({
  translations,
  cycle,
  selectCycle,
  isNonprofit,
  isPromo,
}) => (
  <div style={{ display: 'flex' }}>
    <PlanCycleButton
      first
      label={
        isPromo
          ? getMonthlyPromoPlan(isNonprofit, translations)
          : getMonthlyPlan(isNonprofit, translations)
      }
      description={translations.planMonthlyDescription}
      cycle="month"
      selectedCycle={cycle}
      selectCycle={selectCycle}
    />
    {!isPromo && (
      <PlanCycleButton
        label={getYearlyPlan(isNonprofit, translations)}
        description={translations.planYearlyDescription}
        cycle="year"
        selectedCycle={cycle}
        selectCycle={selectCycle}
      />
    )}
  </div>
);

PlanCycleSelect.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  cycle: PropTypes.string.isRequired,
  selectCycle: PropTypes.func.isRequired,
  isNonprofit: PropTypes.bool.isRequired,
};

export default PlanCycleSelect;
