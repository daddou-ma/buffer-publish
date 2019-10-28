import { connect } from 'react-redux';
import UserTags from './components/UserTags';

export default connect(state => ({
  translations: state.i18n.translations['user-tags'],
}))(UserTags);
