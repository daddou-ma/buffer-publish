import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const PageWrapper = ({ children }) => {
  return (
    <Wrapper>
      <ProfileSidebarStyle>
        <ProfileSidebar />
      </ProfileSidebarStyle>

      <ContentStyle>{children}</ContentStyle>
    </Wrapper>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.object.isRequired, // eslint-disable-line
};

export default PageWrapper;
