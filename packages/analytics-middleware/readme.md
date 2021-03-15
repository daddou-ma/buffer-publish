# @bufferapp/publish-analytics-middleware

This library helps integrate data tracking via segment.

## Segment tracking

Tracking is provided in the `publish-analytics-middleware` package. There are three actions you can call: `INIT, TRACK_EVENT, PAGE_CHANGE`. We are calling `INIT` on user fetch success and passing in the global account id, email and name.

We added a segment script in the `server/index.js` and imported it in the `server/index.html`.

[An engineering guide](https://www.notion.so/buffer/How-to-implement-tracking-with-Segment-An-Engineering-guide-da75fcd8a464456dba1cf80a529f9121)

## Plan the event and properties to track
You'll want to work with the data team when planning out a new event. You can do this by starting a PR with the [tracking-plan](https://github.com/bufferapp/tracking-plan) repo. Go through the steps of [this notion guide](https://www.notion.so/buffer/Editing-Tracking-Plan-definitions-and-updating-Segment-Protocols-29cd5c7c27824a1cba9285b2a11e761f).

[Here is a great example](https://paper.dropbox.com/doc/Writeup-Implementing-the-Churn-Survey-Completed-Event--AiFrc1XIQsFN4TiqjyVM4epkAg-K6hwGXHhGYIOmU5j5q7xk) of implementing a new event from an end-to-end perspective.

## Tracking in Publish
```js
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';

const metadata = {
  channel: channel.service || null,
  channelId: channel.id || null,
  ...
}

dispatch(analyticsActions.trackEvent('Draft Approved', metadata);

```
## Tracking in the Composer
The composer uses Flux which leads to the store working a bit differently than in publish. Because of this, we need to use the `AppActionCreators.triggerInteraction` method to track an event. In the composer-popover package, we have an `onInteraction` method that calls the `trackEvent` analytics action.

```js
// All you need to do is trigger the interaction in the composer

AppActionCreators.triggerInteraction({
  message: {
    action: 'SEGMENT_TRACKING',
    eventName: 'Post Created',
    metadata,
  },
});

// The composer-popover logic then calls the trackEvent action

onInteraction: ({ message }) => {
  switch (message.action) {
    ...
    case 'SEGMENT_TRACKING':
      dispatch(analyticsActions.trackEvent(message.eventName, message.metadata));
      break;
  }
},
```

Tip: We don't need to pass in the `product` or `clientName` property when calling `trackEvent`. The product & clientName is set as a window var and we're setting it in the [middleware](https://github.com/bufferapp/buffer-publish/blob/master/packages/analytics-middleware/middleware.js#L17)

## Test your changes

[Follow step 4 in this notion guide](https://www.notion.so/buffer/How-to-implement-tracking-with-Segment-An-Engineering-guide-da75fcd8a464456dba1cf80a529f9121) to test your local & production changes. It's important to check that there are no violations in the violation tab.

Work with Dan or Michael to get the changes integrated with Mixpanel.

## Notes
- You may need to add changes to this package to fit different cases that come up.

- With tracking, it's a good practice to monitor your changes during the first few days it's implemented to ensure everything
is appearing correctly. You can do this through segment and mixpanel.
