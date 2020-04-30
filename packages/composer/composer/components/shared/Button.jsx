import styled from 'styled-components';

const Button = styled.button`
  color: inherit;
  font: inherit;
  margin: 0;
  overflow: visible;

  text-transform: none;
  -webkit-appearance: button;
  cursor: pointer;

  .button[disabled],
  &[data-disabled='true'] .button {
    cursor: default;
  }
  ::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`;

export default Button;
