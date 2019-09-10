import moment from 'moment-timezone';
import styled from 'styled-components';
import { Button } from '@bufferapp/ui';

export const FooterBar = styled.div`
  padding: 16px 3px 3px;
  display: flex;
`;

export const ButtonStyle = styled.div`
  margin-left: auto;
  margin-right: 8px;
`;

export const EditStoryStyle = styled.div`
  display: flex;
`;

export const EditTextStyle = styled.span`
  margin: auto;
`;

export const EditDateStyle = styled.span`
  margin: auto;
  font-weight: 500;
  font-size: 14px;
  margin-left: 5px;
`;

export const StyledEditButton = styled(Button)`
  margin: auto;
  margin-left: 8px;
`;
