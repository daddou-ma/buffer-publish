const babelConfig = require('../../../../babel.config.js');
require('@babel/register')(babelConfig);
require('core-js/stable');
require('regenerator-runtime/runtime');
const { configure } = require('@storybook/react');

function loadStories() {
  const req = require.context('../components', true, /^((?![\\/]node_modules[\\/]).)*components\/.*\/*story\.jsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
