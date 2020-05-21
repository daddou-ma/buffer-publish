import initStoryshots from '@storybook/addon-storyshots';

const babelConfig = require('./babel.config.js');
require('@babel/register')(babelConfig);
require('core-js/stable');
require('regenerator-runtime/runtime');

initStoryshots({
  suit: 'Snapshots',
  configPath: '.storybookStoryshot/',
});
