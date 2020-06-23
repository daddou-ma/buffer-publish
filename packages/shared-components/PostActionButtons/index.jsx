/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@bufferapp/ui';

const ButtonWrapper = styled.div`
  padding-left: 1rem;
  padding-bottom: 0.5rem;
  min-width: 146px;
`;

const PostActionButtons = ({
  shouldShowShareAgainButton = false,
  shouldShowSendToMobileButton = false,
  onShareAgainClick,
  onMobileClick,
}) => {
  if (!shouldShowShareAgainButton && !shouldShowSendToMobileButton) return null;

  const fullWidth = shouldShowShareAgainButton && shouldShowSendToMobileButton;

  return (
    <div>
      {shouldShowShareAgainButton && (
        <ButtonWrapper>
          <Button
            fullWidth={fullWidth}
            type="secondary"
            label="Share Again"
            onClick={onShareAgainClick}
          />
        </ButtonWrapper>
      )}
      {shouldShowSendToMobileButton && (
        <ButtonWrapper>
          <Button
            fullWidth
            type="secondary"
            label="Send to Mobile"
            onClick={onMobileClick}
          />
        </ButtonWrapper>
      )}
    </div>
  );
};

PostActionButtons.propTypes = {
  shouldShowShareAgainButton: PropTypes.bool,
  shouldShowSendToMobileButton: PropTypes.bool,
  onShareAgainClick: PropTypes.func.isRequired,
  onMobileClick: PropTypes.func,
};

PostActionButtons.defaultProps = {
  onMobileClick: () => {},
};

export default PostActionButtons;
