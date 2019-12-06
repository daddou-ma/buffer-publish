import React from 'react';
import PropTypes from 'prop-types';
import DisabledQueue from '../DisabledQueue';
import OnboardingPage from '../OnboardingPage';

const OnboardingManager = ({
  canSeeOnboardingPage,
  onConnectSocialAccountOnboardingClick,
  onSkipStep,
  onManageSocialAccountClick,
  onConnectSocialAccountSidebarClick,
  translations,
}) => (
  <React.Fragment>
    {canSeeOnboardingPage && (
      <OnboardingPage
        onConnectSocialAccountClick={onConnectSocialAccountOnboardingClick}
        onSkipStep={onSkipStep}
        translations={translations}
      />
    )}
    {!canSeeOnboardingPage && (
      <DisabledQueue
        translations={translations}
        onManageSocialAccountClick={onManageSocialAccountClick}
        goToConnectSocialAccount={onConnectSocialAccountSidebarClick}
      />
    )}
  </React.Fragment>
);

OnboardingManager.propTypes = {
  onConnectSocialAccountOnboardingClick: PropTypes.func.isRequired,
  onSkipStep: PropTypes.func.isRequired,
  onManageSocialAccountClick: PropTypes.func.isRequired,
  onConnectSocialAccountSidebarClick: PropTypes.func.isRequired,
  canSeeOnboardingPage: PropTypes.bool.isRequired,
  translations: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    cta1: PropTypes.string,
    ctaChannel1: PropTypes.string,
    cta2: PropTypes.string,
    ctaChannel2: PropTypes.string,
    cta3: PropTypes.string,
    skipStep: PropTypes.string,
    testemonial: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    company: PropTypes.string,
  }).isRequired,
};

export default OnboardingManager;
