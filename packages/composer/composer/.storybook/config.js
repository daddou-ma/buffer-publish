import "core-js/stable";
import "regenerator-runtime/runtime";
import { configure } from '@storybook/react';

const req = require.context('../components', true, /story\.jsx$/);
const loadStories = () => req.keys().forEach(req);

configure(loadStories, module);
