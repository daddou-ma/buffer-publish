# Contributing 🚀
🎉 Thank you for your contribution! 🎉
Here are some guidelines to make it as easy and clear as possible.

## Table of contents
- [Pull Requests ](#pull-requests)
- [Coding Styleguide 💻](#coding-styleguide-)
  - [Prettier 💁‍♀️](#prettier-)
  - [Components Styleguide](#components-styleguide)
  - [Buffer Design System](#buffer-design-system)
  - [Strings and i18n](#strings-and-i18n)
- [Adding New Dependencies](#adding-new-dependencies)
- [How Packages Communicate 📦](#how-packages-communicate-)
- [Styling Styleguide 💅](#styling-styleguide-)
- [Working on RPCs](#working-on-rpcs)
- [Testing 🧪](#testing-)
- [Storybook](#storybook)
- [Reporting bugs 🐛](#reporting-bugs-)

## Pull Requests
Please follow the steps for your contribution:
1. Fork the repo and create your branch from `master`.
2. Follow the [coding styleguide](#coding-style)
3. If you've added code that should be tested, add tests.
4. Ensure the test suite passes.
    <details>
    <summary>What if the status checks are failing?</summary>
    <p>

    If `continuous-integration/travis-ci/push` is failing, you can try updating the snapshots file by running the following command and committing the resulting snapshot file:
    ```bash
    # from buffer-publish
    $ yarn run test-update
    ```
    If it's still failing and you are unsure on how to fix it, please leave a comment on the pull request indicating it.
    </p>
    </details>
5. After submitting your pull request, verify that all status checks are passing.

## Coding Styleguide 💻

### Prettier 💁‍♀️
We use Prettier for our code styling, and the easiest way to work with it is by installing Prettier as a plugin in the IDE of your choice, however, you can also make sure your coding format is in place with the following commands:

```bash
# To check the format
$ prettier --check "packages/your-package/**/*.+(jsx|js)"

# To run prettier in your package
$ prettier --write "packages/your-package/**/*.+(jsx|js)"
```

### Components Styleguide

**Creating a Component**

For new components, for most cases default to [Functional Components](https://reactjs.org/docs/components-and-props.html) over [Class Components](https://reactjs.org/docs/react-component.html)

For most cases it makes sense to work with functional components, however there are situations in which makes sense to go with class components.

#### Some examples to take into account when building a component:
**1. Preferable way, with functional component**

```js
import React, { useState } from "react";

function getBinaryImageData(event) {
  return "foo";
}

function ImageUploader() {
  const [image, setImage] = useState(null);
  if (image) {
    return (
      <React.Fragment>
        <input type="file" onchange={e => setImage(getBinaryImageData(e))} />
        <img src={image} alt="Example" />
      </React.Fragment>
    );
  }
  return <input type="file" onchange={e => setImage(getBinaryImageData(e))} />;
}

export default ImageUploader;
```

**2. Accepted way, with class component**

```js
class ImageUploader extends React.Component {
  onChange(event) {
    this.state.image = this.getBinaryImageData(event);
  }
  render() {
    if (this.state.image) {
      return (
        <React.Fragment>
          <input type="file" onchange={this.onChange} />
          <img src={this.state.image} />
        </React.Fragment>
      );
    }
    return <input type="file" onchange={this.onChange} />;
  }
}
```

**3. Bad way / mistakes to avoid**
Avoid adding logic in the render method, in the example below all the function declarations and logic is hard coded into the body of the functional component, we are creating the getBinaryImageData function on every re-render of the component.

This adds the potential to add more complexity into the body of the functional component with every piece of additional logic we include, we want to avoid this kind of thing at all costs.

```js
import React, { useState } from "react";

function ImageUploader() {
  const [image, setImage] = useState(null);
  // PLEASE DON'T ADD A FUNCTION INLINE LIKE THIS
  const getBinaryImageData = function(event) {
    return "foo";
  };
  if (image) {
    return (
      <React.Fragment>
        <input type="file" onchange={e => setImage(getBinaryImageData(e))} />
        <img src={image} alt="Example" />
      </React.Fragment>
    );
  }
  return <input type="file" onchange={e => setImage(getBinaryImageData(e))} />;
}

export default ImageUploader;
```

---

**How to create a new component**

🎬 See this video http://hi.buffer.com/5be7a08fc7fc

**In a nutshell:**

1. **Copy the `packages/example` folder.**
```bash
# from buffer-publish
$ cp packages/example packages/your-new-package
```
The name of the folder is up to you, what's more important is the name of package (in it's `package.json`).

2. **Update `package.json`**
    * Change the name, author, version (always `2.0.0` for local packages), and description.
    * You can remove all the `"dependencies"` for now, and add them as you need them.

3. **Update `README.md`**
    * Delete all the text here and just have a heading with your package name and a short description. This is also a great place to document how your package works, and how it can be used/consumed.

4. **Cleanup:** 
    * Delete the `node_modules` and `coverage` folders that came from copying `/example`.

5. Not all packages have to export a component (see for example the `maintenance-redirect` package.)
    * This is where you'll start to make changes and add things based on the needs of your package.
    * Look at other packages for examples!

6. **Connect reducer and/or middleware**
    * If you have a reducer and/or middleware - don't forget to link those up in `packages/store/index.js` and `packages/store/reducers.js`.

7. **Run `yarn`**
    * Do this when you're customizing your package, and  whenever you change the dependencies in your package or another.

**Component PropTypes and DefaultProps**

Avoid using defaultProps for anything that's a required prop.

A good way to have default values in our components is via the spread operator in the definition instead, an example of this:

```js
const Welcome = ({ name = 'John Smith' }) =>
   <h1>Hello, {name}</h1>;
```

### Buffer Design System

- **Buffer has a common UI library** called `@bufferapp/ui`, hosting the components used by all Buffer applications. [Code](https://github.com/bufferapp/ui) [Styleguide](https://bufferapp.github.io/ui/)


- There are parts of the codebase using the old UI library, called `@bufferapp/buffer-components`. [Code](https://github.com/bufferapp/buffer-components)

**The goal is to completely move away from the old buffer-components library and only use the ui library.**

**Use cases:**

1. **Adding colors, fonts or borders:** 
  Whenever possible, import the variables from [bufferapp/ui](https://github.com/bufferapp/ui/tree/master/src/components/style). Do not import the variables from buffer-components.

2. **Adding a component:**
    Follow the decision diagram: [https://share.buffer.com/yAu2Jl98](https://share.buffer.com/yAu2Jl98).

3. **Updating code, changes in component from bufferapp/ui library:** Default to implement the changes in bufferapp/ui instead of overriding styles or functionality in Publish.  

4. **Updating code, changes in component from buffer-components library:** Ask yourself if it's worth the time. If there's already a similar bufferapp/ui component, default to replacing it.

In case of doubt, ask another engineer or the designer for feedback regarding the best approach. 

### Strings and i18n
For i18n, at the moment we have an internal package called `@bufferapp/publish-i18n`, however we are migrating all our String handling to `React.i18n`, so whenever you are working on a component, please defaut to [`React.i18n`](https://react.i18next.com/).

**Adding strings to the translations JSON files:**
- When working with strings in a component (new or modified), please make sure to always add them in the `translations/en-us.json`, we are trying to move all hard coded strings for a better structure.

**Note:**
If we start to adopt i18n more widely in the project, we should make the conscious decision to also add the translations to the `es-es.json` file, for the time being, we'll only be defaulting to the `en-us` file until we make a further decision on this.

**Some Examples on how to work with React.i18n**

- **Example with Hooks:** Since most of our components are functional components, the more often way to work with translations is with the Hook `useTranslation`:

```js
import React from 'react';
import { useTranslation } from 'react-i18next';

export function MyComponent() {
  const { t, i18n } = useTranslation();

  return <p>{t('common.pleaseWait')}</p>
}
```

- **Example with HOC:** We also have some class components, for which you'd want to go with the HOC approach:

```js
import React from 'react';
import { withTranslation } from 'react-i18next';

function MyComponent({ t, i18n }) {
  return <p>{t('common.pleaseWait')}</p>
}

export default withTranslation()(MyComponent);
```

- **Example with Trans:** For more complex translations, use Trans: While the Trans components gives you a lot of power by letting you interpolate or translate complex react elements - the truth is - in most cases you won't need it.

```js
import React from 'react';
import { Trans } from 'react-i18next';

export function MyComponent() {
  <Trans i18nKey="billing-upgrade-cta-banner.remainingTrial">
    You have <strong>{{ remaining: trial.trialTimeRemaining }}</strong> on your {{ plan }} plan trial.
  </Trans>
};
```

## Adding New Dependencies

Adding packages to a monorepo is slightly different than adding to a standard node package. Common `devDependencies` can be added to the top level `package.json` file.

### Adding A Common Dependencies

This is the most likely scenario you'll face.

in the root directory (`buffer-publish/`) run the following commands:

  ```bash
  $ yarn add -DE some-cool-package
  $ yarn
  ```
  Now `@bufferapp/publish-cool-package` is available to all packages.

### Creating A Dependency To Another Local Package

|⚠️  &nbsp;**Important**|
|--|
|Please use 2.0.0 for local package versions moving forward. Using a different version will not break anything (as long as the versions match), but it will be easier to spot local packages in dependencies.|

To create a dependency to the login package from the example package:

In the `example` package add the following entry in the `packages/example/package.json` file under the dependencies key:

```js
{
  //...other stuff...
  dependencies:{
    //...other dependencies...
    "@bufferapp/login": "2.0.0", // this version must be exact otherwise it fetches from npm!
  }
}
```
|⚠️  &nbsp;**Important**|
|--|
|The version number must be **exact** to link local packages, otherwise it will (try to) fetch the package from npm.|


### Add A Dependency That Runs A Binary

An example of this would be `eslint` or `jest`. These should be added to the individual package:

```sh
cd packages/example/
yarn add -DE jest
```

## How Packages Communicate 📦

At a high level each package communicates using the [Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern) through the Redux store. This means that each package receives all events and decides whether to modify their own state or ignore the event. An event (or action) flows from the originator to all other packages (including itself):

```
Package-A ---action--->Redux Store--->Package-B
  ^                             |
  |-----------------------------|---->Package-C
```

If you need to listen to another packages events, import the actionTypes into the package you're building:


```js
// handle app initialized
export default (state, action) => {
  switch (action.type) {
    case 'APP_INIT':
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};
```

## Styling Styleguide 💅
For our styling we use [styled-components](https://styled-components.com/), an example for a styled component:

```js
const Title = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-direction: row;
`;

<Title>Example</Title>
```

## Working with RPCs
Refer to this [Notion](https://threads.com/34376693228) for more details on how to use the newest technique when working on RPCs.

## Testing 🧪

### Testing in Publish

1. You can trigger a test in watch mode if you are working on a specific file or package:

```bash
$ yarn run test-package <path-to-package>

# testing a specific file in watch mode
$ yarn run test-package ./packages/modals/reducer.test.js
```

2. You can also test with `jest` directly:

```bash
$ yarn run jest <path-to-package>

# testing a specific file
$ yarn run jest ./packages/modals/reducer.test.js
```

### Debugging 🕵️‍♂️

To use the `yarn test:debug` script, follow these instructions:
1. Add a `debugger` statement near the failing line in your test.
2. Type `chrome://inspect` in your chrome browser address bar.
3. Click on "Open dedicated DevTools for Node".
4. In your terminal run `yarn test:debug <path to test>`
5. Visit the inspector you opened up, you should see that the debugger has been triggered and the app has paused near the line that is failing.

## Storybook
*Info coming soon*

## Reporting bugs 🐛
To report bugs, please feel free to add them in [JIRA](https://buffer.atlassian.net/secure/RapidBoard.jspa?projectKey=PUB)
