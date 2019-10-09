import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Text,
} from '@bufferapp/components';
import styled from 'styled-components';
import { QueueButtonGroup } from '@bufferapp/publish-shared-components';
import LockedProfileNotification from '@bufferapp/publish-locked-profile-notification';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import PastRemindersPosts from '../PastRemindersPosts';
import PastRemindersStories from '../PastRemindersStories';

const ErrorBoundary = getErrorBoundary(true);

const Header = styled.div`
  margin-bottom: 1.5rem,
  width: 100%,
`;

const TitleWrapper = styled.div`
  margin-bottom: 8px,
`;

const ButtonRelativeContainer = styled.div`
  position: relative;
`;

const ButtonWrapper = styled.div`
  position: absolute
  right: 0;
  top: 15px;
`;

const PastRemindersWrapper = (props) => {
  const {
    header,
    subHeader,
    isLockedProfile,
    viewType,
    onToggleViewType,
  } = props;

  if (isLockedProfile) {
    return <LockedProfileNotification />;
  }

  return (
    <ErrorBoundary>
      <Header>
        <TitleWrapper>
          <Text color="black">{header}</Text>
        </TitleWrapper>
        <Text color="shuttleGray" size="mini">{subHeader}</Text>
        <Divider />
      </Header>
      <ButtonRelativeContainer>
        <ButtonWrapper>
          <QueueButtonGroup
            tab="reminders"
            viewType={viewType}
            buttons={['Posts', 'Stories']}
            onClick={type => onToggleViewType(type)}
          />
        </ButtonWrapper>
      </ButtonRelativeContainer>
      {viewType === 'posts' && <PastRemindersPosts {...props} />}
      {viewType === 'stories' && <PastRemindersStories {...props} />}
    </ErrorBoundary>
  );
};

PastRemindersWrapper.propTypes = {
  header: PropTypes.string,
  subHeader: PropTypes.string,
  viewType: PropTypes.string,
  total: PropTypes.number,
  isLockedProfile: PropTypes.bool,
  onToggleViewType: PropTypes.func,
};

PastRemindersWrapper.defaultProps = {
  header: null,
  subHeader: null,
  viewType: 'posts',
  total: 0,
  isLockedProfile: false,
  onToggleViewType: () => {},
};

export default PastRemindersWrapper;
