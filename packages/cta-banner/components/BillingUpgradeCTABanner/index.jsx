import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '@bufferapp/components';
import { TranslationReplacer } from '@bufferapp/publish-i18n';

const textColor = 'white';

const styling = {
  backgroundColor: '#1F35B3',
  color: textColor,
  padding: '5px',
  textAlign: 'center',
};

const buttonStyle = {
  color: textColor,
  cursor: 'pointer',
  display: 'inline-block',
  margin: '0 0 0 1rem',
  padding: '0.5rem',
  backgroundColor: '#121E66',
  border: '1px solid #121E66',
  borderRadius: '4px',
  outline: 'none',
};

// TODO: Replace this with new UI component buttons
const CTAButton = ({ style, label, text, onClick }) => (
  <button
    style={style}
    aria-label={label}
    onClick={onClick}
  >
    <Text color={textColor} size="mini">
      {text}
    </Text>
  </button>);

CTAButton.propTypes = {
  style: PropTypes.object.isRequired, // eslint-disable-line
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const BillingUpgradeCTABanner = ({
    translations,
    trial,
    onClickManageBilling,
    onClickAddBilling,
    profileCount,
    plan,
  }) => {
  if (!trial || (trial && !trial.onTrial) || profileCount == 0) {
    return null;
  }
// removed feature loader because user data wasn't getting updated on fetch
  const currentPlan = styles => (
    <Text {...styles}>
      { plan === 'pro' ? 'Pro' : 'Business' }
    </Text>
  );

  if (!trial.hasCardDetails) {
    const planTrial = [
      { replaceString: '{plan}', replaceWith: currentPlan({ color: textColor, weight: 'bold', size: 'mini' }) },
    ];
    return (
      <div style={styling}>
        <Text weight="bold" color={textColor} size="mini">
          <TranslationReplacer
            translation={translations.planTrial}
            replacementStrings={planTrial}
          />
        </Text>
        <Text color={textColor} size="mini">{translations.completeBilling}</Text>
        <CTAButton
          style={buttonStyle}
          label={translations.addBilling}
          text={translations.addBilling}
          onClick={() => onClickManageBilling()}
        />
      </div>);
  }

  const timeRemaining = <Text weight="bold" color={textColor} size="mini">{trial.trialTimeRemaining} remaining</Text>;
  const postTrialCost = <Text weight="bold" color={textColor} size="mini">{trial.postTrialCost}</Text>;

  const trialRemaining = [
    { replaceString: '{remaining}', replaceWith: timeRemaining },
    { replaceString: '{plan}', replaceWith: currentPlan({ color: textColor, size: 'mini' }) },
  ];

  const billedAmountEnd = [
    { replaceString: '{billedAmount}', replaceWith: postTrialCost },
  ];

  return (
    <div style={styling}>
      <Text color={textColor} size="mini">
        <TranslationReplacer
          translation={translations.remainingTrial}
          replacementStrings={trialRemaining}
        />
      </Text>
      <Text color={textColor} size="mini">
        <TranslationReplacer
          translation={translations.billedTrialEnd}
          replacementStrings={billedAmountEnd}
        />
      </Text>
      <CTAButton
        style={buttonStyle}
        label={translations.manageBilling}
        text={translations.manageBilling}
        onClick={() => onClickAddBilling()}
      />
    </div>
  );
};

BillingUpgradeCTABanner.propTypes = {
  translations: PropTypes.shape({
    remainingTrial: PropTypes.string,
    billedTrialEnd: PropTypes.string,
    completeBilling: PropTypes.string,
    planTrial: PropTypes.string,
    addBilling: PropTypes.string,
    manageBilling: PropTypes.string,
  }).isRequired, // eslint-disable-line
  trial: PropTypes.shape({
    hasCardDetails: PropTypes.bool,
    hasTrialExtended: PropTypes.bool,
    onTrial: PropTypes.bool,
    postTrialCost: PropTypes.string,
    trialLength: PropTypes.number,
    trialTimeRemaining: PropTypes.string,
  }),
  onClickManageBilling: PropTypes.func.isRequired,
  onClickAddBilling: PropTypes.func.isRequired,
  profileCount: PropTypes.number,
  plan: PropTypes.string.isRequired,
};

BillingUpgradeCTABanner.defaultProps = {
  profileCount: 0,
  trial: {
    hasCardDetails: false,
    hasTrialExtended: false,
    onTrial: false,
    postTrialCost: '',
    trialLength: 0,
    trialTimeRemaining: '',
  },
};

export default BillingUpgradeCTABanner;
