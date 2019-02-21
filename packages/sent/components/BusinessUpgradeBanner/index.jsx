import React from 'react';
import PropTypes from 'prop-types';

import FeatureLoader from '@bufferapp/product-features';
import { BusinessTrialOrUpgradeBanner } from '@bufferapp/publish-shared-components';
import { trackAction } from '@bufferapp/publish-data-tracking';

const BusinessUpgradeBanner = ({ canStartBusinessTrial }) => {
  const banner = canStartBusinessTrial
  ? {
    cta: 'Learn About Buffer for Business',
    subtext: 'TRY IT FREE FOR 14 DAYS',
    link: 'https://buffer.com/business',
    trackedAction: 'post_analytics_banner_b4b_learn_click',
  }
  : {
    cta: 'Upgrade to Buffer for Business',
    link: 'https://buffer.com/app/account/receipts?content_only=true',
    trackedAction: 'post_analytics_banner_b4b_upgrade_click',
  };
  return (
    <FeatureLoader supportedPlans={'pro'}>
      <BusinessTrialOrUpgradeBanner
        body="Get in-depth post analytics by upgrading to Buffer for Business."
        cta={banner.cta}
        subtext={banner.subtext}
        onCtaClick={() => {
          trackAction({ location: 'sent', action: banner.trackedAction }, {
            success: window.location.assign(banner.link),
            error: window.location.assign(banner.link),
          });
        }}
      />
    </FeatureLoader>
  );
};

BusinessUpgradeBanner.propTypes = {
  canStartBusinessTrial: PropTypes.bool.isRequired,
};

export default BusinessUpgradeBanner;
