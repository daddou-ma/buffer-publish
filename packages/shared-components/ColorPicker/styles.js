import styled from 'styled-components';
import Button from '@bufferapp/ui/Button';

export const colorSwatches = {
  black: '#000000',
  white: '#FFFFFF',
  darkPurple: '#3A619C',
  purple: '#979BC8',
  lightBlue: '#0098DB',
  aqua: '#2AB4B4',
  yellow: '#FCE86A',
  brown: '#AF847A',
  orange: '#E7764C',
  red: '#E94D41',
};

export const DEFAULT_COLOR = colorSwatches.black;

export const ColorPickerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ColorSelectorWrapper = styled.div`
  position: relative;
  margin-left: 10px;
`;

export const CheckmarkWrapper = styled.div`
  position: absolute;
  display: flex;
`;

export const CircleColorWrapper = styled.div`
  display: flex;
  flex: 20%;
  justify-content: center;
`;

export const ColorPreview = styled.div`
  width: 37px;
  height: 38px;
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
  background-color: ${props => (props.color ? props.color : DEFAULT_COLOR)};
  border-right: ${props =>
    props.color === colorSwatches.white
      ? '1px solid lightgrey'
      : `1px solid ${props.color}`};
`;

export const ButtonWrapper = styled.div`
  width: 130px;
`;

export const StyledButton = styled(Button)`
  padding-left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CircleColor = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0px;
  border-radius: 50%;
  background-color: ${props => props.color || DEFAULT_COLOR};
  color: ${props => props.colorContrast || colorSwatches.white};
  border: ${props =>
    props.color === colorSwatches.white
      ? '1px solid #000000'
      : `1px solid ${props.color}`};
  margin-bottom: ${props => (props.selectable ? '10px' : '0px')};
  cursor: ${props => (props.selectable ? 'pointer' : 'auto')};
  :hover {
    :after {
      display: ${props => (props.selectable ? 'block' : 'none')};
      content: '';
      width: 30px;
      height: 28px;
      border: 1px solid #4307ff;
      border-radius: 50%;
      margin: -5px -5px;
    }
  }
`;

export const ColorPopup = styled.div.attrs(props => ({
  style: {
    left: `${props.left}px` || 0,
  },
}))`
  position: absolute;
  z-index: 1000;
  width: 155px;
  height: 121px;
  background-color: white;
  border-radius: 5px;
  padding: 15px 16px 10px 16px;
  border: 1px solid lightgrey;
  top: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ColorContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ColorInputWrapper = styled.div`
  background-color: ${props => (props.color ? props.color : DEFAULT_COLOR)};
  border: 1px solid lightgrey;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  z-index: 9;
  cursor: pointer;
  height: 33px;
  width: 33px;
`;

export const ColorInput = styled.input`
  opacity: 0;
  height: 29px;
  width: 29px;
  border: 1px solid gray;
  border-right: none;
  cursor: pointer;
`;

export const InputWrapper = styled.div`
  margin-left: -2px;
`;

export const ColorSwatchesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
