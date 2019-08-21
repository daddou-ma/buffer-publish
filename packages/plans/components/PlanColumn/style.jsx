import { grayDarker, blue } from '@bufferapp/ui/style/colors';
import { Text } from '@bufferapp/ui';
import styled from 'styled-components';

export const ColumnStyle = styled.div`
  box-shadow: 0px 0px 16px #00000014;
  border-radius: 4px;
  margin-right: 24px;
  padding: 45px;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

export const SubtitleStyle = styled.div`
  color: ${blue};
  font-weight: 700;
  margin: 22px 0px;
`;

export const LinkStyle = styled.a`
  color: ${grayDarker};
`;

export const TextStyle = styled(Text)`
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
