import 'babel-polyfill';
import { configure } from '@storybook/react';

const req = require.context('../components', true, /story\.jsx$/);
const loadStories = () => req.keys().forEach(req);

configure(loadStories, module);
