import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@bufferapp/components';
import { Text, Button } from '@bufferapp/ui';
import { blue, gray } from '@bufferapp/ui/style/colors';

const QueueBannerCard = styled.div`
  display: flex;
  margin-bottom: 24px;
  position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${gray};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  box-sizing: border-box;
  border-right: 0;
  padding: 24px 32px;
  align-items: end;
`;

const Title = styled(Text)`
  margin: 0 0 8px;
`;

const ButtonWithStyles = styled(Button)`
  margin-top: 16px;
`;

const TextWithStyles = styled(Text)`
  margin: 0;
`;

const TextLink = styled.span`
  color: ${blue};
`;

const RemindersBanner = ({ onSetRemindersClick }) => (
  <QueueBannerCard>
    <ContentWrapper>
      <Title type="h3">Set up Reminders to complete your Instagram post.</Title>
      <TextWithStyles type="p">
        Due to Instagram limitations, we can&apos;t auto publish some of your
        queued posts. Set up Reminders to make sure all your content gets
        published on time.&nbsp;
        <Link
          href="https://faq.buffer.com/article/950-publish-how-instagram-works"
          newTab
          unstyled
        >
          <TextLink>Learn more here.</TextLink>
        </Link>
      </TextWithStyles>
      <ButtonWithStyles
        type="primary"
        onClick={() => onSetRemindersClick({ type: 'banner' })}
        label="Set Up Reminders"
      />
    </ContentWrapper>
    <img
      height="100%"
      alt="push_notifications_snippet"
      src="https://buffer-publish.s3.amazonaws.com/images/ig-reminders-snippet.png"
    />
  </QueueBannerCard>
);

RemindersBanner.propTypes = {
  onSetRemindersClick: PropTypes.func.isRequired,
};

export default RemindersBanner;
