import "core-js/stable";
import "regenerator-runtime/runtime";
import requireContext from 'require-context.macro';

import { configure, storiesOf } from '@storybook/react';

// Add all story.jsx files inside components directories except for the ones in node_modules
const req = requireContext('../packages', true, /^((?![\\/]node_modules[\\/]).)*components\/.*\/*story\.jsx$/)
const loadStories = () => req.keys().forEach(req)
configure(loadStories, module)
