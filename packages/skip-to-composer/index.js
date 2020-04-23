import { connect } from 'react-redux';
import { actions as queueActions } from '@bufferapp/publish-queue';
import SkipToComposer from './components/SkipToComposer';

export default connect(
  (state, ownProps) => ({
    shouldDisplayBtn: ownProps.tabId === 'queue',
  }),
  () => ({
    onSkipToComposerClick: () => queueActions.handleComposerPlaceholderClick(),
  })
)(SkipToComposer);
