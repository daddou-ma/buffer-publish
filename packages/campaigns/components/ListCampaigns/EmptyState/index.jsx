import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Button } from '@bufferapp/ui';
import { StepList } from '@bufferapp/publish-shared-components';

const EmptyStateContainer = styled.div`
  display: flex;
  margin-left: 48px;
`;

const Content = styled.div`
  margin-top: 43px;
`;

const Image = styled.img`
  object-fit: contain;
  width: 100%;
`;

const EmptyState = ({ translations, onOpenCreateCampaignClick }) => {
  const {
    step1,
    step2,
    step3,
    createCampaign,
    title,
    learnMore,
    imageTag,
  } = translations;
  const stepsArray = [step1, step2, step3];

  return (
    <EmptyStateContainer>
      <Content>
        <Text type="h1">{title}</Text>
        <StepList steps={stepsArray} />
        <div style={{ alignSelf: 'flex-end', paddingTop: '30px' }}>
          <Button
            type="primary"
            size="large"
            label={createCampaign}
            onClick={onOpenCreateCampaignClick}
          />
          {/* To be replaced by BDS Link, when we create one that's an anchor and not a button */}
          <Button
            type="link"
            size="large"
            label={learnMore}
            // Update FAQ link when it's ready
            onClick={() => {
              window.location.assign('https://faq.buffer.com/');
            }}
          />
        </div>
      </Content>
      <Image
        src="https://buffer-publish.s3.amazonaws.com/images/campaigns-screenshot.jpg"
        alt={imageTag}
      />
    </EmptyStateContainer>
  );
};

EmptyState.propTypes = {
  translations: PropTypes.shape({
    title: PropTypes.string.isRequired,
    step1: PropTypes.string.isRequired,
    step2: PropTypes.string.isRequired,
    step3: PropTypes.string.isRequired,
    createCampaign: PropTypes.string.isRequired,
    learnMore: PropTypes.string.isRequired,
    imageTag: PropTypes.string.isRequired,
  }).isRequired,
  onOpenCreateCampaignClick: PropTypes.func.isRequired,
};

export default EmptyState;
