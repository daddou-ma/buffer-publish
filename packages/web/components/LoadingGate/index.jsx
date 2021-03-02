import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { useUser } from '@bufferapp/app-shell';
import { BufferLoading } from '@bufferapp/publish-shared-components';

const LoadingGateLoader = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  height: inherit;
  align-items: center;
`;

const LoadingGate = ({ ready, children }) => {
  const user = useUser();
  const orgSelectedLoaded = user && user.loading !== true;

  return (
    <>
      {ready && orgSelectedLoaded ? (
        children
      ) : (
        <LoadingGateLoader>
          <BufferLoading size={64} />
        </LoadingGateLoader>
      )}
    </>
  );
};

LoadingGate.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

LoadingGate.defaultProps = {
  ready: false,
};

/**
 * We use this component to delay rendering children until we have
 * enough data loaded into the state.
 */
export default connect(state => {
  const orgsLoaded = state.organizations.loaded;
  const userLoaded = state.user.loaded;
  const profilesLoaded = state.profileSidebar.loaded;

  return {
    ready: orgsLoaded && userLoaded && profilesLoaded,
  };
})(LoadingGate);
