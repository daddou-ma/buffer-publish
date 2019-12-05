import React from 'react';
import PropTypes from 'prop-types';

import {
  Text,
} from '@bufferapp/components';

import {
  borderRadius,
} from '@bufferapp/components/style/border';

import { CircleCheckmarkIcon } from '@bufferapp/components/Icon/Icons';

const getPlanCycleStyle = (selected, first) => ({
  display: 'block',
  flex: '1',
  padding: '0.8rem 0.25rem',
  borderRadius,
  cursor: 'pointer',
  position: 'relative',
  background: selected ? '#2C4BFF' : 'white',
  border: selected ? '1px solid transparent' : '1px solid #ABB7FF',
  marginRight: first ? '25px' : 0,
  transition: 'all 0.5s',
});

const checkmarkContainerStyle = {
  position: 'absolute',
  top: '50%',
  left: '15px',
  transform: 'translateY(-11px)',
};

const PlanCycleButton = ({ first, label, description, cycle, selectedCycle, selectCycle }) => {
  const selected = selectedCycle === cycle;
  return (
    <button style={getPlanCycleStyle(selected, first)} onClick={() => selectCycle(cycle)}>
      <Text
        size="large"
        weight="bold"
        color={selected ? 'white' : 'black'}
      >
        {label}
      </Text>
      <br />
      <Text
        size="small"
        color={selected ? 'white' : 'black'}
      >
        {description}
      </Text>
      {selected &&
        <div style={checkmarkContainerStyle}>
          <CircleCheckmarkIcon color="white" size={{ width: '22px' }} />
        </div>
      }
    </button>
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

const getYearlyPlan = (isNonprofit, { nonprofitYearlyPrice, planYearlyPrice }) => (
  isNonprofit ? nonprofitYearlyPrice : planYearlyPrice
);

const getMonthlyPlan = (isNonprofit, { nonprofitMonthlyPrice, planMonthlyPrice }) => (
  isNonprofit ? nonprofitMonthlyPrice : planMonthlyPrice
);

const getMonthlyPromoPlan = (isNonprofit, { nonprofitPromoMonthlyPrice, planPromoMonthlyPrice }) => (
  isNonprofit ? nonprofitPromoMonthlyPrice : planPromoMonthlyPrice
);

const PlanCycleSelect = ({ translations, cycle, selectCycle, isNonprofit, isPromo }) => (
  <div style={{ display: 'flex' }}>
    <PlanCycleButton
      first
      label={
        isPromo
          ? getMonthlyPromoPlan(isNonprofit, translations)
          : getMonthlyPlan(isNonprofit, translations)
      }
      description={translations.planMonthlyDescription}
      cycle={'month'}
      selectedCycle={cycle}
      selectCycle={selectCycle}
    />
    {!isPromo && (
      <PlanCycleButton
        label={getYearlyPlan(isNonprofit, translations)}
        description={translations.planYearlyDescription}
        cycle={'year'}
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
