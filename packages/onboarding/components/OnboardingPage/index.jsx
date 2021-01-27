import React from 'react';
import PropTypes from 'prop-types';
import { Text, ProgressBar, SocialButton } from '@bufferapp/ui';
import { getURL } from '@bufferapp/publish-server/formatters/src';

import {
  Wrapper,
  LeftColumn,
  LogoWrapper,
  LeftContentWrapper,
  LeftContentContainer,
  Logo,
  ProgressBarWrapper,
  RightColumn,
  RightContentContainer,
  Avatar,
  Name,
  Data,
  Phrase,
  LinkWithStyles,
  ButtonWithStyles,
  SocialButtonWrapper,
  TextWithStyles,
  Footer,
} from './style';

const handleConnectSocialAccountClick = ({
  channel,
  url,
  onConnectSocialAccountClick,
}) => {
  if (channel === 'instagram') {
    /**
     * This silly looking code loads an 'img' with the
     * Instagram logout URL, which ensures the user is
     * logged out of Instagram before we send them to
     * reconnect.
     */
    const img = new Image();
    img.onerror = () => {
      window.location.assign(url);
    };
    img.src = 'https://www.instagram.com/accounts/logoutin';
    document.getElementsByTagName('head')[0].appendChild(img);
  } else {
    window.location.assign(url);
  }
  onConnectSocialAccountClick();
};

const OnboardingPage = ({
  onConnectSocialAccountClick,
  translations,
  onSkipStep,
  accountChannelsURL = null,
}) => {
  const cta = 'publish-app-onboarding-addProfile-1';
  const facebookURL = `https://${getURL.getBaseURL()}/oauth/facebook/choose?cta=${cta}`;
  const instagramURL = `https://${getURL.getBaseURL()}/oauth/instagram/choose_business?cta=${cta}`;
  const twitterURL = `https://${getURL.getBaseURL()}/oauth/twitter?cta=${cta}`;
  const linkedinURL = `https://${getURL.getBaseURL()}/oauth/linkedin?cta=${cta}`
  const pinterestURL = `https://${getURL.getBaseURL()}/oauth/pinterest?cta=${cta}`
  return (
    <Wrapper>
      <LeftColumn>
        <LogoWrapper>
          <Logo
            src="https://s3.amazonaws.com/static.buffer.com/login/public/img/buffer-logo.svg"
            width="112"
            height="28"
            alt="Buffer Logo"
          />
        </LogoWrapper>
        <LeftContentWrapper>
          <LeftContentContainer>
            <Text type="h1">{translations.title}</Text>
            <Text type="p">{translations.description}</Text>
            <SocialButtonWrapper>
              <SocialButton
                channel="instagram"
                onClick={() =>
                  handleConnectSocialAccountClick({
                    channel: 'instagram',
                    url: accountChannelsURL || instagramURL,
                    onConnectSocialAccountClick,
                  })
                }
              />
              <SocialButton
                channel="facebook"
                onClick={() =>
                  handleConnectSocialAccountClick({
                    channel: 'facebook',
                    url: accountChannelsURL || facebookURL,
                    onConnectSocialAccountClick,
                  })
                }
              />
              <SocialButton
                channel="twitter"
                onClick={() =>
                  handleConnectSocialAccountClick({
                    channel: 'twitter',
                    url: accountChannelsURL || twitterURL,
                    onConnectSocialAccountClick,
                  })
                }
              />
            </SocialButtonWrapper>
            <TextWithStyles type="p">
              {translations.cta1}
              <LinkWithStyles
                type="link"
                onClick={() =>
                  handleConnectSocialAccountClick({
                    channel: 'linkedin',
                    url: accountChannelsURL || linkedinURL,
                    onConnectSocialAccountClick,
                  })
                }
                label={translations.ctaChannel1}
              />
              {translations.cta2}
              <LinkWithStyles
                type="link"
                onClick={() =>
                  handleConnectSocialAccountClick({
                    channel: 'pinterest',
                    url: accountChannelsURL || pinterestURL,
                    onConnectSocialAccountClick,
                  })
                }
                label={translations.ctaChannel2}
              />
              {translations.cta3}
            </TextWithStyles>
            <ButtonWithStyles
              type="text"
              onClick={onSkipStep}
              label={translations.skipStep}
            />
            <ProgressBarWrapper>
              <ProgressBar progress="75%" />
            </ProgressBarWrapper>
          </LeftContentContainer>
        </LeftContentWrapper>
        <Footer />
      </LeftColumn>
      <RightColumn>
        <RightContentContainer>
          <Phrase>
            &quot;
            {translations.testemonial}
            &quot;
          </Phrase>
          <Avatar src="https://s3.amazonaws.com/static.buffer.com/login/public/img/signup-avatar-publish.png" />
          <Name>{translations.name}</Name>
          <Data>{translations.role}</Data>
          <Data>{translations.company}</Data>
        </RightContentContainer>
      </RightColumn>
    </Wrapper>
  );
};

OnboardingPage.propTypes = {
  onConnectSocialAccountClick: PropTypes.func.isRequired,
  onSkipStep: PropTypes.func.isRequired,
  accountChannelsURL: PropTypes.string,
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

export default OnboardingPage;
