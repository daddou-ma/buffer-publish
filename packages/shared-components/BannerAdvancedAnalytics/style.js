import styled from 'styled-components';
import { blueDark } from '@bufferapp/ui/style/colors';
import Button from '@bufferapp/ui/Button';

import AnalyzeLogo from './analyzeLogo';

export const ModalWrapper = styled.div`
  clear: both;
  margin-bottom: 20px;
  margin-top: 10px;
  max-width: 652px;
  background-color: rgba(171, 183, 255, 0.2);
  color: ${blueDark};
  padding: 16px 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-radius: 4px;
`;

export const AnalyzeIcon = styled(AnalyzeLogo)`
  margin-right: 9px;
  vertical-align: bottom;
`;

export const CTAButton = styled(Button)`
  margin-left: 12px;
  font-weight: normal;
`;
