import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from '@bufferapp/ui';
import { white } from '@bufferapp/ui/style/colors';
import styled from 'styled-components';
import { WithFeatureLoader } from '@bufferapp/product-features';
import { Trans, useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  background-color: #121e66;
  color: ${white};
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextWrapper = styled.div`
  margin-right: 10px;
`;

const TextWithStyles = styled(Text)`
  margin: 0;
  display: inline;
`;

const BannerText = ({ t, trial, plan }) => (
  <TextWrapper>
    {!trial.hasCardDetails ? (
      <React.Fragment>
        <Text type="label" color={white}>
          {t('billing-upgrade-cta-banner.planTrial', {
            plan,
          })}
        </Text>
        <TextWithStyles type="p" color={white}>
          {t('billing-upgrade-cta-banner.completeBilling')}
        </TextWithStyles>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <TextWithStyles type="p" color={white}>
          <Trans i18nKey="billing-upgrade-cta-banner.remainingTrial">
            You have
            <strong>{{ remaining: trial.trialTimeRemaining }}</strong>
            on your {{ plan }} plan trial.
          </Trans>
        </TextWithStyles>
        <TextWithStyles type="p" color={white}>
          <Trans i18nKey="billing-upgrade-cta-banner.billedTrialEnd">
            You&apos;ll be billed
            <strong>{{ billedAmount: trial.postTrialCost || '' }}</strong>
            at the end of your trial.
          </Trans>
        </TextWithStyles>
      </React.Fragment>
    )}
  </TextWrapper>
);

BannerText.propTypes = {
  trial: PropTypes.shape({
    hasCardDetails: PropTypes.bool,
    postTrialCost: PropTypes.string,
    trialTimeRemaining: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
  plan: PropTypes.string.isRequired,
};

const BillingUpgradeCTABanner = ({
  trial,
  isPremiumBusinessPlan,
  onClickStartSubscription,
  profileCount,
  features,
}) => {
  if (!trial || (trial && !trial.onTrial) || profileCount === 0) {
    return null;
  }

  const { t } = useTranslation();

  const getCurrentPlan = () => {
    if (features.isSupportedPlan('free')) return 'Free';
    if (features.isSupportedPlan('pro')) return 'Pro';
    if (features.isSupportedPlan('business'))
      return isPremiumBusinessPlan ? 'Premium' : 'Business';

    return 'Free';
  };

  return (
    <Wrapper>
      <BannerText t={t} trial={trial} plan={getCurrentPlan()} />
      <Button
        type="primary"
        size="small"
        onClick={() => onClickStartSubscription()}
        label={t('billing-upgrade-cta-banner.startSubscription')}
      />
    </Wrapper>
  );
};

BillingUpgradeCTABanner.propTypes = {
  trial: PropTypes.shape({
    hasCardDetails: PropTypes.bool,
    onTrial: PropTypes.bool,
    postTrialCost: PropTypes.string,
    trialLength: PropTypes.number,
    trialTimeRemaining: PropTypes.string,
  }).isRequired,
  onClickStartSubscription: PropTypes.func.isRequired,
  isPremiumBusinessPlan: PropTypes.bool.isRequired,
  profileCount: PropTypes.number,
  features: PropTypes.object.isRequired, // eslint-disable-line
};

BillingUpgradeCTABanner.defaultProps = {
  profileCount: 0,
};

export default WithFeatureLoader(BillingUpgradeCTABanner);
