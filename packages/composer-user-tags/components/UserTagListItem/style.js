import styled from 'styled-components';
import { grayLight, grayDarker } from '@bufferapp/ui/style/colors';

export const CloseButton = styled.button`
  background: ${grayLight};
  border: 2px solid ${grayLight};
  box-sizing: borderBox;
  border-radius: 50%;
  color: ${grayDarker};
  vertical-align: middle;
  display: inline-flex;
  margin-right: 8px;
  padding: 0px;
  cursor: pointer;
`;

export const UserName = styled.div`
  display: flex;
  margin-top: 12px;
`;

export const Link = styled.a`
  margin-left: auto;
  cursor: pointer;
  color: inherit;
  align-self: flex-end;
  display: flex;
`;
