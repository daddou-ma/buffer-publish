const babelConfig = require('../babel.config.js');
require('@babel/register')(babelConfig);
require('core-js/stable');
require('regenerator-runtime/runtime');
const { configure } = require('@storybook/react');

function loadStories() {
  // Add all story.jsx files inside components directories except for the ones in node_modules
  const req = require.context('../packages', true, /^((?![\\/]node_modules[\\/]).)*components\/.*\/*story\.jsx$/)
  req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);
