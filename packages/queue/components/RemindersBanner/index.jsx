import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@bufferapp/components';
import { QueueBanner } from '@bufferapp/publish-shared-components';
import { Text } from '@bufferapp/ui';
import { blue } from '@bufferapp/ui/style/colors';

const TextWithStyles = styled(Text)`
  margin: 0;
`;

const TextLink = styled.span`
  color: ${blue};
`;

const content = (
  <TextWithStyles type="p">
    Due to Instagram limitations, we cannot auto publish some of your queued
    posts. <br />
    Set up mobile Reminders to make sure all your content gets publish on
    time.&nbsp;
    <Link
      href="https://faq.buffer.com/article/950-publish-how-instagram-works"
      newTab
      unstyled
    >
      <TextLink>Learn more here.</TextLink>
    </Link>
  </TextWithStyles>
);

const RemindersBanner = ({ onSetRemindersClick }) => (
  <QueueBanner
    title="Uh-oh! Some of your content can't be published."
    content={content}
    onClick={onSetRemindersClick}
    actionLabel="Set Up Reminders"
  />
);

RemindersBanner.propTypes = {
  onSetRemindersClick: PropTypes.func.isRequired,
};

export default RemindersBanner;
