import { connect } from 'react-redux';
import SkipNavLink from './components/SkipNavLink';

// https://stackoverflow.com/questions/8376525/get-value-of-a-string-after-a-slash-in-javascript
export const getMainContentId = pathname =>
  pathname ? `main-${/[^/]*$/.exec(pathname)[0]}` : '';

export default connect(state => ({
  linkAnchor: getMainContentId(state.router?.location?.pathname),
  translations: state.i18n.translations.skipNavLink,
}))(SkipNavLink);
