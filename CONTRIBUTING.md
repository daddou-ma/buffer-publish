# Contributing 🚀
🎉 Thank you for your contribution! 🎉
Here are some guidelines to make it as easy and clear as possible.

## Table of contents
- [Pull Requests ](#pull-requests)
- [Coding Styleguide 💻](#coding-styleguide-💻)
  - [Prettier 💁‍♀️](#prettier-💁‍♀️)
  - [Components Styleguide 📦](#components-styleguide-📦)
- [Styling Styleguide 💅](#styling-styleguide-💅)
- [Working on RPCs ](#working-on-rpcs)
- [Reporting bugs 🐛](#reporting-bugs-🐛)

## Pull Requests
Please follow the steps for your contribution:
1. Fork the repo and create your branch from `master`.
2. Follow the [coding styleguide](#coding-style)
2. If you've added code that should be tested, add tests.
3. Ensure the test suite passes.
4. After submitting your pull request, verify that all status checks are passing.

## Coding Styleguide 💻

### Prettier 💁‍♀️
We use Prettier for our code styling, and the easiest way to work with it is by installing Prettier as a plugin in the IDE of your choice, however, you can also make sure your format is in place with the following commands:

```bash
# To check the format
$ prettier --check "packages/your-package/**/*.+(jsx|js)"

# To run prettier in your package
$ prettier --write "packages/your-package/**/*.+(jsx|js)"
```

### Components Styleguide 📦

**Creating a Component**

For new components, use [Functional Components](https://reactjs.org/docs/components-and-props.html) over [Class Components](https://reactjs.org/docs/react-component.html)

```js
// Functional component
const Welcome = ({name}) => <h1>Hello, {name}</h1>

// Class component
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

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

## Styling Styleguide 💅
For our styling we use [styled-components](https://styled-components.com/).

## Working on RPCs
Refer to this [Notion](https://threads.com/34376693228) for more details on how to use the newest technique when working on RPCs.

## Reporting bugs 🐛
To report bugs, please feel free to add them in [JIRA](https://buffer.atlassian.net/secure/RapidBoard.jspa?projectKey=PUB)

