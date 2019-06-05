# publish-composer
The composer has been moved into the publish repo and re-named `publish-composer`. Updates to the composer for Classic happen in the [buffer-composer package](https://github.com/bufferapp/buffer-composer/tree/classic)
## How the composer is consumed

The composer is the same across all projects. However each project has its own set of specificities,
so this package offers a tailored interface for each project the composer is currently being used in.

Here's how the composer is being used across our apps:

- `buffer-publish`: The Publish interface is nothing more than a `Composer` React component that you
  can drop anywhere in the app and pass props to. It's exported as `bufferPublishComposer` from `@bufferapp/publish-composer`. Publish will import those source files and build them; the JS is imported into Publish's larger JS bundle, the CSS is transformed and bundled in a separate CSS file.

- `buffer-extensions`: Down the road we're also hoping this package can pave the way to native browser extensions, instead of the iframe we're currently using, which would make our extensions much faster.

## Repo Structure

- `composer/`: the composer itself, exports a React component; should only be consumed in this package
- `interfaces/`: composer wrappers; use those wrappers to make use of the composer in a project; interfaces are named according to their target environment (e.g. `buffer-publish.jsx` for Publish)
  - `utils/`: wrapper utilities; for some projects, e.g. buffer-web with its iframe approach, an extra set of helpers is needed on the other side of the frame, for communication and whatnot: this is it
