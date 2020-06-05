import styled from 'styled-components';
import { grayLight } from '@bufferapp/ui/style/colors';
import { borderRadius } from '@bufferapp/ui/style/borders';
import { Button } from '@bufferapp/ui';

export const InputWrapper = styled.div`
  border: 1px solid ${grayLight};
  border-radius: ${borderRadius};
  padding: 8px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

export const StyledButton = styled(Button)`
  margin-left: 1rem;
`;
