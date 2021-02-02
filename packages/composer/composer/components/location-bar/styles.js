import styled from 'styled-components';
import { white, grayLight, grayDarker } from '@bufferapp/ui/style/colors';
import { fontWeightSemiBold, fontSizeSmall } from '@bufferapp/ui/style/fonts';

export const Container = styled.div`
  padding: 3px 10px 11px;
  width: 100%;
  box-sizing: border-box;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  float: left;
`;

export const Wrapper = styled.div`
  float: left;
  padding-top: 1px;
  position: relative;
  display: flex;
  width: 100%;
`;

export const Label = styled.label`
  font-weight: ${fontWeightSemiBold};
  font-size: ${fontSizeSmall};
  color: ${grayDarker};
  width: 120px;
  padding-top: 6px;
`;

export const AutocompleteContainer = styled.span`
  flex-grow: 1;
`;

export const Name = styled.p`
  font-weight: ${fontWeightSemiBold};
  padding: 0;
  margin: 0;
`;

export const Menu = styled.div`
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px;
  background: ${white};
  overflow: auto;
  position: absolute;
  margin-left: 5px;
  z-index: 100;
  font-size: ${fontSizeSmall};
  max-height: 225px;
`;

export const Row = styled.span`
  float: left;
  width: 100%;
  cursor: pointer;
  padding-top: 5px;
  padding-bottom: 7px;
  :nth-of-type(1) {
    padding-top: 8px;
  }
  background-color: ${props => (props.highlighted ? grayLight : 'none')};

  p {
    padding: 0;
    margin: 0 0 0 10px;
  }
`;

export const Button = styled.button`
  position: absolute;
  cursor: pointer;
  top: 8px;
  right: -2px;
  border: 0;
  background: none;
  color: #b8b8b8;

  &:hover {
    color: #333;
  }

  &:focus {
    outline: none;
  }
`;