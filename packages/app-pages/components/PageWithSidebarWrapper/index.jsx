import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ProfileSidebar from '@bufferapp/publish-profile-sidebar';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const ProfileSidebarStyle = styled.div`
  flex-basis: 16rem;
  width: 16rem;
  min-width: 16rem;
  position: sticky;
  bottom: 0;
  top: 0;
  max-height: 100vh;
`;

const ContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const PageWithSidebarWrapper = ({ children, profileId, tabId }) => {
  return (
    <Wrapper>
      <ProfileSidebarStyle>
        <ProfileSidebar profileId={profileId} tabId={tabId} />
      </ProfileSidebarStyle>
      <ContentStyle>{children}</ContentStyle>
    </Wrapper>
  );
};

PageWithSidebarWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  profileId: PropTypes.string,
  tabId: PropTypes.string,
};

PageWithSidebarWrapper.defaultProps = {
  profileId: null,
  tabId: null,
};

export default PageWithSidebarWrapper;
