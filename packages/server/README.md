## Server for Publish
This package is a express JS server to return the HTML for new Publish

### Show notifications
If you want to show notifications coming back from classic or other URLs, you can by passing these three GET parameters:
- "nt": Type of notification
- "nk": Key to search for that message.
- "nv": (Optional) If you want to replace a variable inside the message.

These three values are passed to the [notifications-provider package](https://github.com/bufferapp/buffer-publish/blob/master/packages/notifications-provider/README.md) so they need to be represented in the notifications.json file there. See [its readme](https://github.com/bufferapp/buffer-publish/blob/master/packages/notifications-provider/README.md) for more information.

Examples of valid URLs:
- Without variable: https://publish.buffer.com?nt=success&nk=connection
- With variable: https://publish.buffer.com?nt=success&nk=example-with-variable&nv=tree

These values will be removed later in the address bar when the Publish app starts.
