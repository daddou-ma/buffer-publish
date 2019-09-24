const babelConfig = require('../babel.config.js');
require('@babel/register')(babelConfig);
require('core-js/stable');
require('regenerator-runtime/runtime');
const { configure, storiesOf } = require('@storybook/react');

// Add all story.jsx files inside components directories except for the ones in node_modules
const req = require.context('../packages', true, /^((?![\\/]node_modules[\\/]).)*components\/.*\/*story\.jsx$/)
const loadStories = () => req.keys().forEach(req)
configure(loadStories, module)
