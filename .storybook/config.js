import 'babel-polyfill';
import { configure } from '@storybook/react';

// automatically import all story.js files
const req = require.context(__PACKAGES__, true, /components\/.*\/*story\.jsx$/)

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
