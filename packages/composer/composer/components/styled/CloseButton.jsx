import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';

const ButtonStyled = styled(Button)`
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

const CloseButton = ({
  onClick,
  title = null,
  label = 'Click to close',
  className = '',
}) => (
  <ButtonStyled
    className={['bi bi-circle-x', className, 'js-disable-dragging'].join(' ')}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
    data-tip={title}
    aria-label={label}
  />
);

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default CloseButton;
