import styled from 'styled-components';
import { grayLight, grayLighter, grayDarker } from '@bufferapp/ui/style/colors';

export const CloseButton = styled.button`
  background: ${grayLight};
  border: 2px solid ${grayLight};
  width: 20px;
  height: 20px;
  border-radius: 100%;
  color: ${grayDarker};
  margin-right: 8px;
  padding: 0px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserName = styled.div`
  display: flex;
  align-items: center;
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
