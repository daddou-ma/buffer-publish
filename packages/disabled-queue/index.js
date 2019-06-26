import { connect } from 'react-redux';
import DisabledQueue from './components/DisabledQueue';


export default connect(
  state => ({
    translations: state.i18n.translations.example, // all package translations
  }),
)(DisabledQueue);
