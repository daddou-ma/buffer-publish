import React from 'react';
import PropTypes from 'prop-types';
import States from '@bufferapp/ui/States';
import Button from '@bufferapp/ui/Button';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: ${props => (props.height ? props.height : '100%')};
`;

export default function GlobalEmptyState({
  imageSrc,
  altText,
  header,
  description,
  secondaryAction,
  primaryAction = null,
  height = null,
}) {
  return (
    <Wrapper height={height}>
      <States>
        <States.Image src={imageSrc} alt={altText} />
        <States.Header>{header}</States.Header>
        <States.Description>{description}</States.Description>
        <States.Buttons>
          <Button
            type="secondary"
            onClick={secondaryAction.onClick}
            label={secondaryAction.label}
          />
          {primaryAction && (
            <Button
              type="primary"
              onClick={primaryAction.onClick}
              label={primaryAction.label}
            />
          )}
        </States.Buttons>
      </States>
    </Wrapper>
  );
}

GlobalEmptyState.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  height: PropTypes.string,
  primaryAction: PropTypes.shape({
    onClick: PropTypes.func,
    label: PropTypes.string,
  }),
  secondaryAction: PropTypes.shape({
    onClick: PropTypes.func,
    label: PropTypes.string,
  }).isRequired,
};