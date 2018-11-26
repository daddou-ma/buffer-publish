## Notifications Provider

This package exports a middleware to show a notification grabbing the global window._notification object set in the server. The message will be pulled from the notifications.json file.

This message can contain a variable that will be replaced for the placeholder ```{{__variable__}}```. See the ./utils/getNotificationMessage.test.js for examples.