import styled from 'styled-components';

const Button = styled.button`
  color: inherit; /* 1 */
  font: inherit; /* 2 */
  margin: 0; /* 3 */
  overflow: visible;

  text-transform: none;
  -webkit-appearance: button; /* 2 */
  cursor: pointer;

  /* 3 */
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
