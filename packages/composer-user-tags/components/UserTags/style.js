import styled from 'styled-components';
import { Text } from '@bufferapp/ui';

export const UserName = styled.div`
  display: flex;
  margintop: 5px;
`;

export const ButtonWrapper = styled.div`
  marginleft: 5px;
  margintop: 9px;
`;

export const PersonIcon = styled.div`
  position: absolute;
  bottom: 7px;
  left: 7px;
  color: black;
  cursor: pointer;
`;

export const PlainText = styled(Text)`
  margintop: 12px;
`;

export const Modal = styled.div`
  width: 864px;
`;

export const ModalInner = styled.div`
  background-color: white;
  padding: 0px 15px 0px 0px;
  display: flex;
`;

export const RightHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const Image = styled.img`
  max-height: 500px;
  width: auto;
  margin: 0;
  cursor: crosshair;
  display: block;
`;

export const RightContent = styled.div`
  margin-left: 15px;
  width: 275px;
`;
