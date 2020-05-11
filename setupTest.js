import 'jest-styled-components';
import 'jest-axe/extend-expect';
import '@testing-library/jest-dom/extend-expect';
import '@bufferapp/publish-web/components/i18n';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MutationObserver from '@sheerun/mutationobserver-shim';

window.MutationObserver = MutationObserver;
Enzyme.configure({ adapter: new Adapter() });
