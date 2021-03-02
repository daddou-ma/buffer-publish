import styled from 'styled-components';
import {
  fontFamily,
  fontSize,
  fontWeightBold,
  fontWeightMedium,
  lineHeight,
} from '@bufferapp/ui/style/fonts';
import { white, blue } from '@bufferapp/ui/style/colors';
import { Button, Text } from '@bufferapp/ui';

export const mobileThreshold = '1250px';

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const LeftColumn = styled.div`
  width: calc(100% * 2 / 3);
  flex-direction: column;
  justify-content: space-between;
  display: flex;

  @media only screen and (max-width: ${mobileThreshold}) {
    width: 100%;
  }
`;

export const LogoWrapper = styled.div`
  margin: 16px 56px;
`;

export const Logo = styled.img`
  margin-top: 24px;
`;

export const SocialButtonWrapper = styled.div`
  > * {
    margin-bottom: 16px;
  }
`;

export const LinkWithStyles = styled(Button)`
  display: inline-block;
  padding-left: 6px;
  padding-right: 6px;
  color: ${blue};
`;

export const TextWithStyles = styled(Text)`
  margin-bottom: 26px;
`;

export const ButtonWithStyles = styled(Button)`
  margin: 0 auto 38px;
`;

export const LeftContentWrapper = styled.div`
  padding: 0px 56px;
  margin: 16px 0px;
`;

export const LeftContentContainer = styled.div`
  max-width: 480px;
  margin: auto;
`;

export const ProgressBarWrapper = styled.div`
  width: 140px;
  margin: 0 auto;
`;

export const RightColumn = styled.div`
  width: calc(100% / 3);
  background: url(https://s3.amazonaws.com/static.buffer.com/login/public/img/signup-bkg-publish.png);
  background-position: left center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  @media only screen and (max-width: ${mobileThreshold}) {
    display: none;
  }
`;

export const RightContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  text-align: center;
  font-family: ${fontFamily};
  font-weight: ${fontWeightBold};
  color: ${white};
`;

export const Phrase = styled.p`
  line-height: 32px;
  font-size: 24px;
  margin-bottom: 16px;
  letter-spacing: -0.75px;
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  margin: 8px 0px;
`;

export const Name = styled.p`
  letter-spacing: -0.75px;
  line-height: ${lineHeight};
  font-size: 16px;
  margin-bottom: 10px;
`;

export const Data = styled.p`
  font-weight: ${fontWeightMedium};
  line-height: ${lineHeight};
  font-size: ${fontSize};
  margin-bottom: 10px;
`;

export const Footer = styled.div`
  width: 100%;
  padding: 0px 56px;
  margin: 16px 0px;
`;
