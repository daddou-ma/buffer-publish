import React from 'react';
import PropTypes from 'prop-types';
import DisabledQueue from '../DisabledQueue';
import OnboardingPage from '../OnboardingPage';

const OnboardingManager = ({
  canSeeOnboardingPage,
  showUpgradeToProCta,
  profileLimit,
  onConnectSocialAccountOnboardingClick,
  onSkipStep,
  manageChannelsURL,
  connectChannelsURL,
  connectDirectURLs,
  translations,
}) => (
  <>
    {canSeeOnboardingPage && (
      <OnboardingPage
        onConnectSocialAccountClick={onConnectSocialAccountOnboardingClick}
        onSkipStep={onSkipStep}
        translations={translations}
        connectURLs={connectDirectURLs}
      />
    )}
    {!canSeeOnboardingPage && (
      <DisabledQueue
        showUpgradeToProCta={showUpgradeToProCta}
        profileLimit={profileLimit}
        translations={translations}
        manageChannelsURL={manageChannelsURL}
        connectChannelsURL={connectChannelsURL}
      />
    )}
  </>
);

OnboardingManager.propTypes = {
  showUpgradeToProCta: PropTypes.bool.isRequired,
  profileLimit: PropTypes.number.isRequired,
  onConnectSocialAccountOnboardingClick: PropTypes.func.isRequired,
  onSkipStep: PropTypes.func.isRequired,
  manageChannelsURL: PropTypes.func.isRequired,
  connectChannelsURL: PropTypes.func.isRequired,
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
  connectDirectURLs: PropTypes.shape({
    facebook: PropTypes.string,
    instagram: PropTypes.string,
    twitter: PropTypes.string,
    linkedin: PropTypes.string,
    pinterest: PropTypes.string,
  }).isRequired,
};

export default OnboardingManager;
