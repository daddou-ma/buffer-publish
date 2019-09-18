import "core-js/stable";
import "regenerator-runtime/runtime";
import "@babel/register";
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
registerRequireContextHook();
import { configure, storiesOf } from '@storybook/react';

// Add all story.jsx files inside components directories except for the ones in node_modules
const req = require.context('../packages', true, /^((?![\\/]node_modules[\\/]).)*components\/.*\/*story\.jsx$/)
const loadStories = () => req.keys().forEach(req)
configure(loadStories, module)
