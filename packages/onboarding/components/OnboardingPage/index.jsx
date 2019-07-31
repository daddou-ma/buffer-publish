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

const OnboardingPage = ({ onConnectSocialAccountClick }) => (
  <Wrapper>
    <LeftColumn>
      <LogoWrapper>
        <Logo src="https://s3.amazonaws.com/static.buffer.com/login/public/img/buffer-logo.svg" width="112" height="28" alt="Buffer Logo" />
      </LogoWrapper>
      <LeftContentWrapper>
        <LeftContentContainer>
          <Text type="h1">Your account has been setup!</Text>
          <Text type="p">Now let's connect a social account so you can begin publishing content.</Text>
          <SocialButtonWrapper>
            <SocialButton channel="instagram" onClick={onConnectSocialAccountClick} />
            <SocialButton channel="facebook" onClick={onConnectSocialAccountClick} />
            <SocialButton channel="twitter" onClick={onConnectSocialAccountClick} />
          </SocialButtonWrapper>
          <TextWithStyles type="p">
            You can also connect your
            <LinkWithStyles
              type="link"
              onClick={() => {}}
              label="Linkedin"
            />
            and
            <LinkWithStyles
              type="link"
              onClick={() => {}}
              label="Pinterest"
            />
            accounts.
          </TextWithStyles>
          <ButtonWithStyles
            type="text"
            onClick={() => {}}
            label="Or skip this step"
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
        <Phrase>"Publish helps us build a better model of content that generates more engagement."</Phrase>
        <Avatar src="https://s3.amazonaws.com/static.buffer.com/login/public/img/signup-avatar-publish.png" />
        <Name>Justin Ozanich</Name>
        <Data>Marketing Manager</Data>
        <Data>Foster Coffee Company</Data>
      </RightContentContainer>
    </RightColumn>
  </Wrapper>
);

OnboardingPage.propTypes = {
  onConnectSocialAccountClick: PropTypes.func.isRequired,
};

export default OnboardingPage;
