# @bufferapp/product-features

This component Provides the logic for supported product plans


## Higher Order Component

There is a higher order component available to you that exposes some useful functions to you if you want to handle
the displaying and hiding logic yourself.

This is available via

```
import { WithFeatureLoader } from '@bufferapp/product-features';
```

This component exposes a features property onto its child with a list of methods available, these are:

- isFreeUser
    - returns a boolean
- isProUser
    - returns a boolean
- isSupportedPlan(testPlan)
    - accepts a single plan to test for, or an array of plans
    - returns a boolean

You can use this in the following way:

```js
    import { WithFeatureLoader } from '@bufferapp/product-features';

    // The property features gets loaded automatically from the redux state
    const TextComponent = ({ features, ...other }) => {
      if (features.isFreeUser()) {
        return (<Text {...other}>Free User</Text>);
      }
      else if (features.isProUser()) {
        return (<Text {...other}>Pro User</Text>);
      }

      return null;
    };

    TextComponent.propTypes = {
      features: PropTypes.any.isRequired,
    };

    const TextComponentWithFeatureLoader = WithFeatureLoader(TextComponent);

    // Now when you want to use it, you can just use it like any other component
    return <TextComponentWithFeatureLoader size={'large'} />;

```

This gives you full control of how you show data, and how you control the flow of displaying particular content, such as
when you want to only display an icon for certain users, but its deeply nested inside your component, and creating a
whole new component with just a small alteration would cause too much code duplication.
