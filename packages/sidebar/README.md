# @bufferapp/publish-example

An example UI package that implements a [container](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0), [reducer](http://redux.js.org/docs/basics/Reducers.html) and [middleware](http://redux.js.org/docs/advanced/Middleware.html).

*NOTE:* This package should can be used as a template for new packages.

- [Quick Start](#quick-start)
- [Package Anatomy](#component-anatomy)

## Quick Start

### Start Storybook

If you're interested in working on or observing _how things look_, starting with [React Storybook](https://storybook.js.org/) is a great way to get going. It's setup to automatically reload as the code changes to make it easy to do rapid iteration on components.


```sh
npm start
```

After that copy and paste the host and port that is displayed on the console into a browser.

#### Developing Multiple Packages In Parallel

If you're running this for multiple packages at the same time, it's helpful to pass in the port number.

```sh
npm start -- --port 8003
```

### Run Tests

Tests are run using [Jest](https://facebook.github.io/jest/) and UIs are tested and locked down using [Jest Snapshots](https://facebook.github.io/jest/docs/snapshot-testing.html) and [React Storybook](https://storybook.js.org/).

#### Standard Tests

Runs linter, then unit and snapshot tests. These tests are run using CI and are currently running on TravisCI:

https://travis-ci.com/bufferapp/buffer-publish

```bash
npm test
```

#### Watch Mode

When writing unit tests for things like middleware and the main index file, it's useful to only run the test that change so you can rapidly iterate. Jest watch mode allows you do do this with a single command:

```sh
npm run test-watch
```

## Package Anatomy

A UI package should include all concerns related to a given feature.

```
example/ # root
+-- __snapshots__/
    `-- snapshot.test.js.snap # jest snapshots storage
+-- .storybook/ # React Storybook Configuration
    `-- addons.js # storybook action panel configuration
    `-- config.js # storybook main configuration
    `-- preview-head.html # configure <head> in storybook preview
+-- components/ # presentational components
    +-- LoggedIn # component that displays login state
        `-- index.jsx # implementation of the login display
        `-- story.jsx # description of all the possible configurations of the login display
`-- .babelrc # babel transpiler
`-- index.js # main package file, should export the container and top level  resources
`-- index.test.js # main package file tests
`-- middleware.js # all action side effects
`-- middleware.test.js # test action side effects
`-- package.json # npm package
`-- README.md # you are here
`-- reducer.js # describe how data changes when actions occur
`-- reducer.test.js # test the reducer!
`-- snapshot.test.js # configure jest snapshots
```

### index.js

This is the main package file, it's default export should be the container.

Imagine another package is trying to use the package you're building. The package API should look like this:

```js
import Example, { actions, actionTypes, middleware, reducer } from '@bufferapp/publish-example';
```

### components/

Presentational components ([pure ui](https://rauchg.com/2015/pure-ui)) are implemented with the followign structure:

```
+-- components/
    +-- LoggedIn/
        `-- index.jsx
        `-- story.jsx
```

#### components/LoggedIn/index.jsx

This should export a [functional and stateless](https://medium.com/@housecor/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc#.ukhlhrqlw) component. There are some special cases where handling things like `focus`, `hover` and active states that need to be tracked.

If you need `focus` and or `hover` take a look at PseudoClassComponent to wrap the component you're building:

https://github.com/bufferapp/buffer-components/blob/master/PseudoClassComponent/index.jsx

Here's an example of how to wrap a `Button`:

https://github.com/bufferapp/buffer-components/blob/master/Button/index.jsx

#### components/LoggedIn/story.jsx

This should set the context (properties) for every configuration of the component in `index.jsx`. The story is used for both `React Storybook` as well as `Jest Snapshots`.
