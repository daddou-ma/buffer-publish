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

const CloseButton = styled(Button)`
  width: 16px;
  height: 16px;
  line-height: 16px;
  font-size: 16px;
  text-align: center;
  color: #343e47;
  background: #fff;
  border-radius: 50%;
  text-decoration: none;
  border: none;
  padding: 0;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: center;
  :before {
    vertical-align: baseline;
  }
  :hover {
    transform: scale(1.15);
  }
`;

export { CloseButton };

export default Button;
