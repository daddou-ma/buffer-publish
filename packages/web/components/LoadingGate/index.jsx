import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const LoadingGate = ({ ready, children }) => (ready ? children : null);

LoadingGate.propTypes = {
  ready: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
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
