import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Button, Link } from '@bufferapp/ui';
import { Checklist } from '@bufferapp/publish-shared-components';

const EmptyStateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 48px;
`;

const Content = styled.div`
  margin-top: 43px;
`;

const Image = styled.img`
  object-fit: contain;
  max-width: 1200px;
  width: 100%;
`;

const LinkWithStyles = styled(Link)`
  display: inline-block;
  padding: 16px;
`;

const ImageWrapper = styled.span`
  margin-left: 40px;
  margin-top: 14px;
`;

const EmptyState = ({ translations, onOpenCreateCampaignClick }) => {
  const {
    item1,
    item2,
    item3,
    createCampaign,
    title,
    subtext,
    learnMore,
    imageTag,
  } = translations;
  const itemsArray = [item1, item2, item3];

  return (
    <EmptyStateContainer>
      <Content>
        <Text type="h1">{title}</Text>
        <Text type="p">{subtext}</Text>
        <Checklist items={itemsArray} />
        <div style={{ alignSelf: 'flex-end', paddingTop: '30px' }}>
          <Button
            type="primary"
            size="large"
            label={createCampaign}
            onClick={onOpenCreateCampaignClick}
          />
          <LinkWithStyles
            href="https://faq.buffer.com/" // Update FAQ link when it's ready
            newTab
          >
            {learnMore}
          </LinkWithStyles>
        </div>
      </Content>
      <ImageWrapper>
        <Image
          src="https://buffer-publish.s3.amazonaws.com/images/campaigns-emptystate-screenshot.png"
          alt={imageTag}
        />
      </ImageWrapper>
    </EmptyStateContainer>
  );
};

EmptyState.propTypes = {
  translations: PropTypes.shape({
    title: PropTypes.string.isRequired,
    item1: PropTypes.string.isRequired,
    item2: PropTypes.string.isRequired,
    item3: PropTypes.string.isRequired,
    createCampaign: PropTypes.string.isRequired,
    learnMore: PropTypes.string.isRequired,
    imageTag: PropTypes.string.isRequired,
    subtext: PropTypes.string.isRequired,
  }).isRequired,
  onOpenCreateCampaignClick: PropTypes.func.isRequired,
};

export default EmptyState;
