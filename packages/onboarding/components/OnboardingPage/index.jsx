import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  ProgressBar,
  SocialButton,
} from '@bufferapp/ui';

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

const OnboardingPage = ({ onConnectSocialAccountClick, translations, onSkipStep }) => (
  <Wrapper>
    <LeftColumn>
      <LogoWrapper>
        <Logo src="https://s3.amazonaws.com/static.buffer.com/login/public/img/buffer-logo.svg" width="112" height="28" alt="Buffer Logo" />
      </LogoWrapper>
      <LeftContentWrapper>
        <LeftContentContainer>
          <Text type="h1">{translations.title}</Text>
          <Text type="p">{translations.description}</Text>
          <SocialButtonWrapper>
            <SocialButton channel="instagram" onClick={onConnectSocialAccountClick} />
            <SocialButton channel="facebook" onClick={onConnectSocialAccountClick} />
            <SocialButton channel="twitter" onClick={onConnectSocialAccountClick} />
          </SocialButtonWrapper>
          <TextWithStyles type="p">
            {translations.cta1}
            <LinkWithStyles
              type="link"
              onClick={() => {}}
              label={translations.ctaChannel1}
            />
            {translations.cta2}
            <LinkWithStyles
              type="link"
              onClick={() => {}}
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

OnboardingPage.propTypes = {
  onConnectSocialAccountClick: PropTypes.func.isRequired,
  onSkipStep: PropTypes.func.isRequired,
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
