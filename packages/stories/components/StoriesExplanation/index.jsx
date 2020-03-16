import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@bufferapp/components';
import { Button, Text } from '@bufferapp/ui';
import StepCard from '../StepCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(Text)`
  margin: 32px 0;
  text-align: center;
`;

const RemindersButton = styled(Button)`
  margin: 32px 0 6px;
`;

const StoriesExplanation = ({ translations, onSetRemindersClick }) => (
  <Container>
    <Title type="h2">{translations.start.title}</Title>
    <div>
      <StepCard
        imageUrl="https://buffer-publish.s3.amazonaws.com/images/reminders-step1.jpg"
        number={1}
        title={translations.start.step1Title}
        description={translations.start.step1Description}
      />
      <StepCard
        imageUrl="https://buffer-publish.s3.amazonaws.com/images/reminders-step2.jpg"
        number={2}
        title={translations.start.step2Title}
        description={translations.start.step2Description}
      />
      <StepCard
        imageUrl="https://buffer-publish.s3.amazonaws.com/images/reminders-step3.jpg"
        number={3}
        title={translations.start.step3Title}
        description={translations.start.step3Description}
      />
    </div>
    <RemindersButton
      type="primary"
      size="large"
      label={translations.start.setReminders}
      onClick={onSetRemindersClick}
    />
    <Link
      href="https://support.buffer.com/hc/en-us/articles/360037766294-How-Instagram-works-with-Buffer-Publish"
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
      step1Title: PropTypes.string.isRequired,
      step1Description: PropTypes.string.isRequired,
      step2Title: PropTypes.string.isRequired,
      step2Description: PropTypes.string.isRequired,
      step3Title: PropTypes.string.isRequired,
      step3Description: PropTypes.string.isRequired,
      learnMore: PropTypes.string.isRequired,
      setReminders: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onSetRemindersClick: PropTypes.func.isRequired,
};

export default StoriesExplanation;
