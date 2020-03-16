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
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: ${props => (props.fullSize ? '100%' : '864px')};
`;

const PageWrapper = ({ children, fullSize }) => {
  return (
    <Wrapper>
      <ProfileSidebarStyle>
        <ProfileSidebar />
      </ProfileSidebarStyle>

      <ContentStyle fullSize={fullSize}>{children}</ContentStyle>
    </Wrapper>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.object.isRequired, // eslint-disable-line
  fullSize: PropTypes.bool,
};

export default PageWrapper;
