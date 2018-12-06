import 'babel-polyfill';
import { configure } from '@storybook/react';

// automatically import all story.js files
const req = require.context('../packages/', true, /components\/.*\/*story\.jsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
