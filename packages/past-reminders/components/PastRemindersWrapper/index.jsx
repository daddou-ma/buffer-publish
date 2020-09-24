import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Divider, Text } from '@bufferapp/components';
import styled from 'styled-components';
import { QueueButtonGroup } from '@bufferapp/publish-shared-components';
import LockedProfileNotification from '@bufferapp/publish-locked-profile-notification';
import InstagramPersonalProfileNotification from '@bufferapp/publish-ig-personal-profile-notification';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import ProfilesDisconnectedBanner from '@bufferapp/publish-profiles-disconnected-banner';
import PastRemindersPosts from '../PastRemindersPosts';

const ErrorBoundary = getErrorBoundary(true);

const HeaderWrapper = styled.div`
  margin-bottom: 1.5rem,
  width: 100%,
`;

const TitleWrapper = styled.div`
  margin-bottom: 8px;
`;

const ButtonRelativeContainer = styled.div`
  position: relative;
`;

const ButtonWrapper = styled.div`
  position: absolute
  right: 0;
  top: 15px;
`;

const Header = ({ header, subHeader }) => (
  <HeaderWrapper>
    <TitleWrapper>
      <Text color="black">{header}</Text>
    </TitleWrapper>
    <Text color="shuttleGray" size="mini">
      {subHeader}
    </Text>
    <Divider />
  </HeaderWrapper>
);

Header.propTypes = {
  header: PropTypes.string,
  subHeader: PropTypes.string,
};

Header.defaultProps = {
  header: null,
  subHeader: null,
};

const PastRemindersWrapper = props => {
  const {
    isLockedProfile,
    isDisconnectedProfile,
    viewType,
    onToggleViewType,
    profileId,
    shouldDisplayIGPersonalNotification,
  } = props;

  useEffect(() => {
    onToggleViewType('posts');
  }, [profileId]);

  if (shouldDisplayIGPersonalNotification) {
    return <InstagramPersonalProfileNotification />;
  }

  if (isLockedProfile) {
    return <LockedProfileNotification />;
  }

  return (
    <ErrorBoundary>
      {isDisconnectedProfile && <ProfilesDisconnectedBanner />}
      <Header {...props} />
      <ButtonRelativeContainer>
        <ButtonWrapper>
          <QueueButtonGroup
            tab="pastReminders"
            viewType={viewType}
            buttons={['Posts', 'Stories']}
            onClick={type => onToggleViewType(type)}
          />
        </ButtonWrapper>
      </ButtonRelativeContainer>
      <PastRemindersPosts viewType={viewType} {...props} />
    </ErrorBoundary>
  );
};

PastRemindersWrapper.propTypes = {
  viewType: PropTypes.string,
  total: PropTypes.number,
  isLockedProfile: PropTypes.bool,
  isDisconnectedProfile: PropTypes.bool,
  onToggleViewType: PropTypes.func,
  profileId: PropTypes.string.isRequired,
  shouldDisplayIGPersonalNotification: PropTypes.bool,
};

PastRemindersWrapper.defaultProps = {
  viewType: 'posts',
  total: 0,
  isLockedProfile: false,
  isDisconnectedProfile: false,
  onToggleViewType: () => {},
  shouldDisplayIGPersonalNotification: false,
};

export default PastRemindersWrapper;
