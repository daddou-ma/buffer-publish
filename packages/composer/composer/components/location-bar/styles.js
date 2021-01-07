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

export const RemoveInput = styled.span`
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KPGcgaWQ9IkNhbnZhcyIgZmlsbD0ibm9uZSI+CjxnIGlkPSJYIj4KPGNpcmNsZSBpZD0iRWxsaXBzZSIgY3g9IjgiIGN5PSI4IiByPSI4IiBmaWxsPSIjMTkyNTM0Ii8+CjxnIGlkPSJHcm91cCI+CjxyZWN0IGlkPSJSZWN0YW5nbGUgMiIgd2lkdGg9IjEiIGhlaWdodD0iMTAiIHJ4PSIwLjUiIHRyYW5zZm9ybT0ibWF0cml4KDAuNzA3MTA3IC0wLjcwNzEwNyAwLjcwNzEwNyAwLjcwNzEwNyA0IDQuNzA3MTEpIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCBpZD0iUmVjdGFuZ2xlIDIuMSIgd2lkdGg9IjEiIGhlaWdodD0iMTAiIHJ4PSIwLjUiIHRyYW5zZm9ybT0ibWF0cml4KC0wLjcwNzEwNyAtMC43MDcxMDcgLTAuNzA3MTA3IDAuNzA3MTA3IDExLjc3ODEgNC43MDcxMSkiIGZpbGw9IndoaXRlIi8+CjwvZz4KPC9nPgo8L2c+Cjwvc3ZnPgo=');
  width: 16px;
  height: 16px;
  position: absolute;
  top: 10px;
  right: 8px;
  z-index: 1;
  cursor: pointer;
`;

export const Title = styled.p`
  font-weight: bold;
  padding: 0;
  margin: 0;
`;

export const Description = styled.div`
  width: 75%;
  float: left;
  padding-left: 10px;
`;

export const Menu = styled.menu`
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px;
  background: ${white};
  overflow: auto;
  position: absolute;
  margin-left: 5px;
  overflow: auto;
  width: 600px;
  z-index: 100;
  font-size: ${fontSizeSmall};
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
`;
