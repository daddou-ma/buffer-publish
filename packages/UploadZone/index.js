// component vs. container https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
import { connect } from 'react-redux';
// load the presentational component
import UploadZone from './components/UploadZone';

// default export = container
export default connect(state => ({
  translations: state.i18n.translations['upload-zone'],
}))(UploadZone);
