import React from 'react';
import PropTypes from 'prop-types';
import { getURL } from '@bufferapp/publish-server/formatters';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import { BusinessTrialOrUpgradeCard } from '@bufferapp/publish-shared-components';

const startTrial = () =>
  window.location.assign(
    `${getURL.getStartTrialURL({
      trialType: 'small',
      cta: SEGMENT_NAMES.DRAFTS_SBP_TRIAL,
      nextUrl: 'https://publish.buffer.com',
    })}`
  );

const goToBilling = () =>
  window.location.assign(
    `${getURL.getBillingURL({
      cta: SEGMENT_NAMES.DRAFTS_BUSINESS_UPGRADE,
    })}`
  );

const Paywall = ({
  onFreePlan,
  canStartBusinessTrial,
  onUpgradeButtonClick,
}) => {
  const ctaConfig = {
    cta: {
      free: 'Upgrade',
      pro: 'Upgrade to Buffer for Business',
      proWithBusinessTrialAccess:
        'Start a Free 14-Day Trial of the Business Plan',
    },
    action: {
      free: onUpgradeButtonClick,
      pro: goToBilling,
      proWithBusinessTrialAccess: startTrial,
    },
  };

  const proType = canStartBusinessTrial ? 'proWithBusinessTrialAccess' : 'pro';
  const planType = onFreePlan ? 'free' : proType;

  return (
    <BusinessTrialOrUpgradeCard
      heading="Collaborate With Your Team"
      body="Add your team to your Buffer account so you can collaborate and save even more time."
      cta={ctaConfig.cta[planType]}
      onCtaClick={ctaConfig.action[planType]}
      backgroundImage="squares"
    />
  );
};

Paywall.propTypes = {
  onFreePlan: PropTypes.bool.isRequired,
  canStartBusinessTrial: PropTypes.bool.isRequired,
  onUpgradeButtonClick: PropTypes.func.isRequired,
};

export default Paywall;
