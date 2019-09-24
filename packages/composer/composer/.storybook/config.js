const babelConfig = require('../../../../babel.config.js');
require('@babel/register')(babelConfig);
require('core-js/stable');
require('regenerator-runtime/runtime');
const { configure } = require('@storybook/react');

const req = require.context('../components', true, /^((?![\\/]node_modules[\\/]).)*components\/.*\/*story\.jsx$/);
const loadStories = () => req.keys().forEach(req);

configure(loadStories, module);
