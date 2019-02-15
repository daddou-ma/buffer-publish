# @bufferapp/publish-data-tracking

This library helps integrate data tracking via our [`buffermetrics` library](https://github.com/bufferapp/buffer-js-buffermetrics).

## Automatic tracking

Automatic tracking is provided by the `bufferMetricsMiddleware` in this package. This middleware automatically tracks actions dispatched in redux, it's created by calling [createBufferMetricsMiddleware](https://github.com/bufferapp/buffer-js-buffermetrics#redux) from `@bufferapp/buffermetrics/redux`. See that page for more details on how it works and what actions are tracked automatically.

## Manual tracking with `trackAction`

In cases where the automatic tracking does not suffice (i.e., what you want to track is not connected to a dispatched action in redux) we can also manually track.

```js
import { trackAction } from '@bufferapp/publish-data-tracking';

// Track an action taken by the user
trackAction({
  location: 'tabs',
  action: 'click_my_button',
  // Pass any custom metadata, `userId` is will be added automatically
  metadata: { source },
});

// Track an action with callbacks
trackAction({
  location: 'sidebar',
  action: 'open_billing_page',
}, {
  success: () => goToBillingPage(),
  error: () => goToBillingPage(),
});
```

### Why can't I just use `buffermetrics.trackAction` directly when I need to track manually?

You _could_ do this, since `trackAction` from `@bufferapp/publish-data-tracking` is just a wrapper around `buffermetrics.trackAction` ([See the source code here](https://github.com/bufferapp/buffer-publish/blob/master/packages/data-tracking/track-action.js), it's quite small). But here are a few reasons that the former is better.

1. We'll automatically set the `application` to `'PUBLISH'`.
2. We'll automatically add the `userId` to your metadata.
3. We'll ensure the action is shown in the browser console when logging is enabled. (See below.) This doesn't work if you call `buffermetrics.trackAction` directly.

## Viewing logs of tracked actions

This package adds a `logTrackingMiddleware` which will put logs in the browser console about what's being tracked - when it's enabled. It is disabled by default. To turn it on, type `showTracking()` into the console and press enter.
