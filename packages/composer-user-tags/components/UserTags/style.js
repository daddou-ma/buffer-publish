import styled, { css } from 'styled-components';
import { grayLight, grayLighter, gray } from '@bufferapp/ui/style/colors';
import { borderRadius } from '@bufferapp/ui/style/borders';
import { Text } from '@bufferapp/ui';
import { MAX_HEIGHT } from '../../utils/Tags';

export const PersonIcon = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  cursor: pointer;
  color: #fff;
  width: 28px;
  height: 28px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextWrapper = styled.span`
  margin: 2px 0px 16px;
  display: flex;
  color: ${gray};
`;

export const Modal = styled.div`
  display: flex;
`;

export const ModalInner = styled.div`
  background-color: white;
  display: flex;
`;

export const Image = styled.img`
  max-height: ${MAX_HEIGHT}px;
  max-width: 100%;
  width: auto;
  margin: 0;
  cursor: crosshair;
  display: block;
`;

export const ResponsiveContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: black;
`;

export const RightContent = styled.div`
  width: 350px;
  min-height: 499px; /* Set min height so modal will stay same size on input display */
  display: flex;
  flex-direction: column;
`;

export const TagList = styled.div`
  overflow: scroll;
  height: 248px;
  overflow-x: hidden;
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
  padding: 6px 24px 24px;
`;

export const Title = styled(Text)`
  margin-bottom: 10px;
`;

export const FooterButtons = styled.div`
  display: flex;
  ${({ disabled }) =>
    disabled
      ? css`
          pointer-events: none;
          opacity: 0.5;
        `
      : ''}
`;

export const SaveButton = styled.div`
  width: 100%;
`;

export const ImageWrapper = styled.div`
  position: relative;
`;

export const InputWrapper = styled.form`
  display: ${({ coordinates }) => (coordinates.y ? 'block' : 'none')};
  position: absolute;
  left: ${({ coordinates }) => `${coordinates.clientX}%`};
  top: ${({ coordinates }) => `${coordinates.clientY}%`};
  background-color: ${grayLighter};
  height: ${({ error }) => (error ? '160px' : '140px')};
  width: 258px;
  border-radius: ${borderRadius};
  padding: 16px;
  box-sizing: border-box;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.16);
  transform: translateX(-50%)
    translateY(
      ${({ coordinates }) => (Number(coordinates.y) > 0.5 ? '-156' : '16')}px
    );
  z-index: 10;
`;

export const CoordinateMarker = styled.div`
  display: ${({ coordinates }) => (coordinates.y ? 'block' : 'none')};
  position: absolute;
  left: ${({ coordinates }) => `${coordinates.clientX}%`};
  top: ${({ coordinates }) => `${coordinates.clientY}%`};
  width: 16px;
  height: 16px;
  background: rgba(44, 75, 255, 0.8);
  border: 2px solid #fff;
  box-sizing: border-box;
  border-radius: 100%;
  transform: translate(-8px, -8px);
  pointer-events: none;
`;
