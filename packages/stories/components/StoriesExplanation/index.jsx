import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@bufferapp/components';
import { Button, Text } from '@bufferapp/ui';
import StepGrid from '../StepGrid';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 60px;
  max-width: 1025px;
`;

const Title = styled(Text)`
  margin: 32px 0;
  text-align: center;
`;

const StoriesExplanation = ({ translations, onSetRemindersClick }) => (
  <Container>
    <Title type="h2">{translations.start.title}</Title>
    <StepGrid translations={translations.start} />
    <Button
      type="primary"
      label={translations.start.setReminders}
      onClick={onSetRemindersClick}
    />
    <Link
      href="https://faq.buffer.com/article/950-publish-how-instagram-works"
      unstyled
      newTab
    >
      <Text type="p">{translations.start.learnMore}</Text>
    </Link>
  </Container>
);

StoriesExplanation.propTypes = {
  translations: PropTypes.shape({
    start: PropTypes.shape({
      title: PropTypes.string.isRequired,
      learnMore: PropTypes.string.isRequired,
      setReminders: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onSetRemindersClick: PropTypes.func.isRequired,
};

export default StoriesExplanation;
