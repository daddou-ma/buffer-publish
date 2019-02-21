import 'babel-polyfill';
import { configure } from '@storybook/react';

/**
 * `__PACKAGES__` below is dynamically pulled from the environment
 * via the custom webpack config, allowing us to run storybook on
 * a specific package in new publish.
 *
 * e.g.,
 *
 *   $ PACKAGE=shared-components yarn run storybook
 *
 */
function loadStories() {
  const req = require.context(__PACKAGES__, true, /story\.jsx$/);
  req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);
