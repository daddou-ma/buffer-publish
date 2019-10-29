import { connect } from 'react-redux';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import UserTags from './components/UserTags';

export default connect(
  state => ({
    translations: state.i18n.translations['user-tags'],
  }),
  dispatch => ({
    trackTag: ({ channel, username }) => {
      const metadata = {
        channelId: channel.id,
        channelServiceId: channel.serviceId,
        channelUsername: channel.service ? channel.service.username : null,
        taggedUsername: username,
      };
      dispatch(analyticsActions.trackEvent('Instagram User Tagged', metadata));
    },
    trackAllTags: ({ channel, tags }) => {
      const getTaggedUsernames = () => tags.map(tag => tag.username);
      const metadata = {
        channelId: channel.id,
        channelServiceId: channel.serviceId,
        channelUsername: channel.service ? channel.service.username : null,
        taggedUsernames: getTaggedUsernames(tags),
        taggedUserCount: tags.length,
      };
      dispatch(analyticsActions.trackEvent('Instagram Tags Saved', metadata));
    },
  })
)(UserTags);
