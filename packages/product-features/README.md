# @bufferapp/product-features

This component Provides the logic for supported product plans and features

You can use it by importing the module and adding a `<FeatureLoader>` component surrounding the component you wish to
show based on usecase

This is how to import the component:

```
import FeatureLoader from '@bufferapp/product-features';
```

So if you have a feature named `'super_mega_feature'` and you want the `<Super>` component to display for those users,
you would wrap the component in

```<FeatureLoader supportedFeature={'super_mega_feature'}><Super /></FeatureLoader>```

If you want to fallback to something else when the `'super_mega_feature'` isn't available then you can provide the
`fallback={Component}` parameter.

This should allow you to be able to send through some value if this feature isn't available, maybe showing a message
saying, hey why not upgrade to enjoy this feature, or perhaps just some static text / element to hold its place in the UI

To see more of the usecases supported, check out the story.jsx file...

When we use this component we pass in `productFeatures: state.productFeatures` so you shouldn't pass those in as they
are being provided by the redux store but you can chose to send them in if you are using the component in isolation,
just like in the tests themselves

## Higher Order Component

There is also a higher order component available to you that exposes some useful functions to you if you want to handle
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
- isSupportedFeature(testFeature)
    - accepts a single feature to test for, or an array of features
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
