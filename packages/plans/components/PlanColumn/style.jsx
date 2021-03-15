import { grayDarker, blue } from '@bufferapp/ui/style/colors';
import styled from 'styled-components';
import { borderRadius } from '@bufferapp/ui/style/borders';
import { fontWeightBold } from '@bufferapp/ui/style/fonts';

export const ColumnStyle = styled.div`
  box-shadow: 0px 0px 16px #00000014;
  border-radius: ${borderRadius};
  margin-right: 24px;
  padding: 25px 45px;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

export const SubtitleStyle = styled.div`
  color: ${blue};
  font-weight: ${fontWeightBold};
  margin: 22px 0px;
`;

export const LinkStyle = styled.a`
  color: ${grayDarker};
`;

export const ButtonWrapperStyle = styled.div`
  margin: 24px 0px 8px;
`;

export const FooterStyle = styled.div`
  text-align: center;
  margin-top: auto;
`;

export const ImageWrapperStyle = styled.div`
  margin: 0px auto 30px;
`;

export const TopContentStyle = styled.div`
  text-align: center;
`;
