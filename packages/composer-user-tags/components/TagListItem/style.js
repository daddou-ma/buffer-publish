import styled from 'styled-components';
import { grayLight, grayLighter, grayDarker } from '@bufferapp/ui/style/colors';

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
  border-bottom: ${props =>
    props.lastItem ? 'none' : `1px solid ${grayLighter}`};
  padding: 12px 24px;
`;

export const Link = styled.a`
  margin-left: auto;
  cursor: pointer;
  color: inherit;
  align-self: flex-end;
  display: flex;
`;
