const babelConfig = require('./babel.config.js');
require('@babel/register')(babelConfig);
require('core-js/stable');
require('regenerator-runtime/runtime');
const initStoryshots = require('@storybook/addon-storyshots').default;

initStoryshots({
  suit: 'Snapshots',
  configPath: '.storybookStoryshot/',
});
