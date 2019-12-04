import styled from 'styled-components';

export const DotstyleUl = styled.ul`
  position: relative;
  display: inline-block;
  margin: 0;
  padding: 0;
  list-style: none;
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const DotstyleLi = styled.li`
  position: relative;
  display: block;
  float: left;
  margin: 0 4px;
  width: 8px;
  height: 8px;
  cursor: pointer;
`;

export const DotstyleA = styled.a`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  outline: none;
  border-radius: 50%;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.3);
  text-indent: -999em; /* make the text accessible to screen readers */
  cursor: pointer;
  position: absolute;
  -webkit-transition: background-color 0.3s ease;
  transition: background-color 0.3s ease;

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus {
    background-color: black;
  }
`;

export const DotstyleLiCurrentA = styled.a`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  outline: none;
  border-radius: 50%;
  text-indent: -999em; /* make the text accessible to screen readers */
  cursor: pointer;
  position: absolute;
  -webkit-transition: background-color 0.3s ease;
  transition: background-color 0.3s ease;
  background-color: black;
`;

export const DivDotStyle = styled.div`
  text-align: center;
  vertical-align: top;
`;
