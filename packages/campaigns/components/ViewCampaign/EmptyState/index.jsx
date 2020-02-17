import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Button } from '@bufferapp/ui';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #b8b8b8;
  border-radius: 4px;
  padding: 28px 20px;
  background-image: url('https://s3.amazonaws.com/buffer-publish/images/campaigns-yellow-background.svg'),
    url('https://s3.amazonaws.com/buffer-publish/images/camapigns-green-background.svg');
  background-position: right bottom, left top;
  background-repeat: no-repeat, no-repeat;
`;

const SubText = styled.div`
  max-width: 400px;
  p {
    margin: 0px 0px 24px;
    text-align: center;
  }
`;

const LinkButton = styled.div`
  margin-top: 10px;
`;

const EmptyState = ({
  translations,
  onCreatePostClick,
  onDeleteCampaignClick,
  onEditCampaignClick,
}) => (
  <Container>
    <Text type="h1">{translations.title}</Text>
    <SubText>
      <Text type="p">{translations.subtext}</Text>
    </SubText>
    <Button
      onClick={onCreatePostClick}
      type="primary"
      isSplit
      label={translations.createPosts}
      onSelectClick={selectedItem => {
        if (typeof selectedItem.selectedItemClick !== 'undefined') {
          selectedItem.selectedItemClick();
        }
        return false;
      }}
      items={[
        {
          id: '1',
          title: translations.createPost,
          selectedItemClick: onCreatePostClick,
        },
        {
          id: '2',
          title: translations.editCampaign,
          selectedItemClick: onEditCampaignClick,
        },
        {
          id: '3',
          title: translations.deleteCampaign,
          selectedItemClick: onDeleteCampaignClick,
        },
      ]}
    />
    <LinkButton>
      <Button label={translations.learnMore} type="link" />
    </LinkButton>
  </Container>
);

EmptyState.propTypes = {
  translations: PropTypes.shape({
    learnMore: PropTypes.string,
    createPosts: PropTypes.string,
    createPost: PropTypes.string,
    subtext: PropTypes.string,
    title: PropTypes.string,
    editCampaign: PropTypes.string,
    deleteCampaign: PropTypes.string,
  }).isRequired,
  onCreatePostClick: PropTypes.func.isRequired,
  onDeleteCampaignClick: PropTypes.func.isRequired,
  onEditCampaignClick: PropTypes.func.isRequired,
};

export default EmptyState;
