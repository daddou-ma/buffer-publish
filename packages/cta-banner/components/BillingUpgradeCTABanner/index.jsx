import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@bufferapp/ui';
import { Text } from '@bufferapp/components';
import { TranslationReplacer } from '@bufferapp/publish-i18n';
import FeatureLoader from '@bufferapp/product-features';

const textColor = 'white';

const styling = {
  backgroundColor: '#121E66',
  color: textColor,
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const textStyle = {
  marginRight: '10px',
};

const BillingUpgradeCTABanner = ({
  translations,
  trial,
  isPremiumBusinessPlan,
  onClickStartSubscription,
  profileCount,
}) => {
  if (!trial || (trial && !trial.onTrial) || profileCount === 0) {
    return null;
  }

  const currentPlan = styles => (
    <Text {...styles}>
      <FeatureLoader supportedPlans="free">Free</FeatureLoader>
      <FeatureLoader supportedPlans="pro">Pro</FeatureLoader>
      <FeatureLoader supportedPlans="business">
        {isPremiumBusinessPlan ? 'Premium' : 'Business'}
      </FeatureLoader>
    </Text>
  );

  const timeRemaining = (
    <Text weight="bold" color={textColor} size="mini">
      {trial.trialTimeRemaining} remaining
    </Text>
  );
  const postTrialCost = (
    <Text weight="bold" color={textColor} size="mini">
      {trial.postTrialCost}
    </Text>
  );

  const trialRemaining = [
    { replaceString: '{remaining}', replaceWith: timeRemaining },
    {
      replaceString: '{plan}',
      replaceWith: currentPlan({ color: textColor, size: 'mini' }),
    },
  ];

  const billedAmountEnd = [
    { replaceString: '{billedAmount}', replaceWith: postTrialCost },
  ];

  let BannerText;
  if (!trial.hasCardDetails) {
    const planTrial = [
      {
        replaceString: '{plan}',
        replaceWith: currentPlan({
          color: textColor,
          weight: 'bold',
          size: 'mini',
        }),
      },
    ];
    BannerText = (
      <Fragment>
        <Text weight="bold" color={textColor} size="mini">
          <TranslationReplacer
            translation={translations.planTrial}
            replacementStrings={planTrial}
          />
        </Text>
        <Text color={textColor} size="mini">
          {translations.completeBilling}
        </Text>
      </Fragment>
    );
  } else {
    BannerText = (
      <Fragment>
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
      </Fragment>
    );
  }

  return (
    <div style={styling}>
      <div style={textStyle}>{BannerText}</div>
      <Button
        type="primary"
        size="small"
        onClick={() => onClickStartSubscription()}
        label={translations.startSubscription}
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
    startSubscription: PropTypes.string,
  }).isRequired, // eslint-disable-line
  trial: PropTypes.shape({
    hasCardDetails: PropTypes.bool,
    hasTrialExtended: PropTypes.bool,
    onTrial: PropTypes.bool,
    postTrialCost: PropTypes.string,
    trialLength: PropTypes.number,
    trialTimeRemaining: PropTypes.string,
  }),
  onClickStartSubscription: PropTypes.func.isRequired,
  isPremiumBusinessPlan: PropTypes.bool,
  profileCount: PropTypes.number,
};

BillingUpgradeCTABanner.defaultProps = {
  profileCount: 0,
  isPremiumBusinessPlan: false,
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
