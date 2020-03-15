import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Button, Link } from '@bufferapp/ui';
import { gray } from '@bufferapp/ui/style/colors';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid ${gray};
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

const LinkWithStyles = styled(Link)`
  display: inline-block;
  padding: 16px;
`;

const EmptyState = ({ translations, onCreatePostClick }) => (
  <Container>
    <Text type="h1">{translations.title}</Text>
    <SubText>
      <Text type="p">{translations.subtext}</Text>
    </SubText>
    <Button
      onClick={onCreatePostClick}
      type="primary"
      label={translations.createPosts}
    />
    <LinkWithStyles
      href="https://faq.buffer.com/" // Update FAQ link when it's ready
      newTab
    >
      {translations.learnMore}
    </LinkWithStyles>
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
};

export default EmptyState;
