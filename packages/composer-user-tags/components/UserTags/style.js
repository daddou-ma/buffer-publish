import styled from 'styled-components';
import { grayLight, grayLighter, gray } from '@bufferapp/ui/style/colors';

export const PersonIcon = styled.div`
  position: absolute;
  bottom: 7px;
  left: 7px;
  color: black;
  cursor: pointer;
`;

export const TextWrapper = styled.span`
  margin: 2px 0px 16px;
  display: flex;
  color: ${gray};
`;

export const Modal = styled.div`
  width: 864px;
  display: flex;
`;

export const ModalInner = styled.div`
  background-color: white;
  padding: 0px 15px 0px 0px;
  display: flex;
`;

export const Image = styled.img`
  max-height: 500px;
  width: auto;
  margin: 0;
  cursor: crosshair;
  display: block;
`;

export const RightContent = styled.div`
  width: 305px;
  display: flex;
  flex-direction: column;
`;

export const TagList = styled.div`
  margin-bottom: 12px;
  padding: 0 24px;
`;

export const TopContent = styled.div`
  margin-bottom: auto;
`;

export const BottomContent = styled.div`
  padding: 0 24px 24px;
`;

export const Line = styled.hr`
  width: 100%;
  border: 1px solid ${grayLight};
`;

export const RightHeader = styled.div`
  padding: 0 24px 24px;
`;

export const ListWrapper = styled.div`
  display: flex;
  background-color: ${grayLighter};
  padding: 0px 24px;
  min-height: 112px;
`;
